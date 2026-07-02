"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { CmsData, CmsServiceMediaItem, CmsServiceMediaType } from "@/lib/cms-types";
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "@/lib/youtube";

type ServiceMediaEditorProps = {
  serviceId: string;
  serviceTitle: string;
  media: CmsServiceMediaItem[];
  cms: CmsData;
  canPersist: boolean;
  storageUploadEnabled: boolean;
  onSaved: (payload: { data: CmsData; canPersist: boolean; storageUploadEnabled: boolean }) => void;
  onMessage: (message: string) => void;
};

const emptyMediaItem = (): CmsServiceMediaItem => ({
  id: crypto.randomUUID(),
  type: "image",
  url: "",
  caption: "",
  sortOrder: 99,
  updatedAt: new Date().toISOString(),
});

async function saveCms(data: CmsData) {
  const response = await fetch("/api/cms", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Cannot save CMS");
  return response.json() as Promise<{
    data: CmsData;
    canPersist: boolean;
    storageUploadEnabled: boolean;
  }>;
}

export function ServiceMediaEditor({
  serviceId,
  serviceTitle,
  media,
  cms,
  canPersist,
  storageUploadEnabled,
  onSaved,
  onMessage,
}: ServiceMediaEditorProps) {
  const [draft, setDraft] = useState<CmsServiceMediaItem>(emptyMediaItem());
  const [saving, setSaving] = useState(false);

  const sortedMedia = [...media].sort((a, b) => a.sortOrder - b.sortOrder);
  const editingExisting = media.some((item) => item.id === draft.id);

  function updateDraft<K extends keyof CmsServiceMediaItem>(key: K, value: CmsServiceMediaItem[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function resetDraft() {
    setDraft(emptyMediaItem());
  }

  async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/cms/upload", { method: "POST", body: formData });
    const payload = (await response.json()) as {
      url?: string;
      persisted?: boolean;
      message?: string;
    };

    if (!response.ok || !payload.url) {
      throw new Error(payload.message || "Upload thất bại.");
    }

    updateDraft("type", "image");
    updateDraft("url", payload.url);
    if (!payload.persisted) {
      onMessage("Ảnh đã được nhúng tạm thời trên máy local.");
    }
  }

  async function persistMedia(nextItems: CmsServiceMediaItem[]) {
    const now = new Date().toISOString();
    const nextCms: CmsData = {
      ...cms,
      serviceMedia: {
        ...cms.serviceMedia,
        [serviceId]: nextItems.map((item) => ({ ...item, updatedAt: now })),
      },
      updatedAt: now,
    };

    const payload = await saveCms(nextCms);
    onSaved(payload);
  }

  async function saveMediaItem() {
    if (!draft.url.trim()) {
      onMessage("URL không được để trống.");
      return;
    }

    if (draft.type === "youtube" && !getYoutubeEmbedUrl(draft.url)) {
      onMessage("URL YouTube không hợp lệ.");
      return;
    }

    setSaving(true);
    onMessage("");

    const now = new Date().toISOString();
    const nextItem: CmsServiceMediaItem = {
      ...draft,
      url: draft.url.trim(),
      caption: draft.caption.trim(),
      updatedAt: now,
    };
    const nextItems = editingExisting
      ? media.map((item) => (item.id === draft.id ? nextItem : item))
      : [...media, nextItem];

    try {
      await persistMedia(nextItems);
      onMessage(editingExisting ? "Đã cập nhật media." : "Đã thêm media.");
      resetDraft();
    } catch {
      onMessage("Chưa lưu được media. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteMediaItem(id: string) {
    setSaving(true);
    onMessage("");

    try {
      await persistMedia(media.filter((item) => item.id !== id));
      if (draft.id === id) resetDraft();
      onMessage("Đã xóa media.");
    } catch {
      onMessage("Chưa xóa được media.");
    } finally {
      setSaving(false);
    }
  }

  const youtubePreview = draft.type === "youtube" ? getYoutubeThumbnailUrl(draft.url) : null;

  return (
    <section className="miju-admin-panel">
      <div className="miju-admin-panel-header">
        <div>
          <p className="miju-admin-eyebrow">Hình ảnh / Video</p>
          <h2>{serviceTitle}</h2>
        </div>
        <button type="button" className="miju-admin-plain-button" onClick={resetDraft}>
          Thêm mới
        </button>
      </div>

      {!canPersist ? (
        <p className="miju-admin-note miju-admin-note-warning">
          Media chỉ lưu được trên máy local. Commit file <code>.cms/cms-store.json</code> rồi deploy.
          {storageUploadEnabled ? " Upload ảnh qua Supabase vẫn hoạt động trên production." : ""}
        </p>
      ) : null}

      <div className="miju-admin-editor-grid">
        <div className="miju-admin-form-grid">
          <label className="miju-admin-field">
            <span>Loại</span>
            <select
              value={draft.type}
              onChange={(event) => updateDraft("type", event.target.value as CmsServiceMediaType)}
            >
              <option value="image">Hình ảnh</option>
              <option value="youtube">YouTube</option>
            </select>
          </label>
          <label className="miju-admin-field">
            <span>Thứ tự</span>
            <input
              type="number"
              value={draft.sortOrder}
              onChange={(event) => updateDraft("sortOrder", Number(event.target.value))}
            />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>{draft.type === "youtube" ? "URL YouTube" : "URL hình ảnh"}</span>
            <input
              value={draft.url}
              onChange={(event) => updateDraft("url", event.target.value)}
              placeholder={
                draft.type === "youtube"
                  ? "https://www.youtube.com/watch?v=..."
                  : "/images/services/moi-baby.jpg"
              }
            />
          </label>
          {draft.type === "image" ? (
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Đổi hình từ máy</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadPhoto(file).catch(() => onMessage("Upload ảnh chưa thành công."));
                }}
              />
            </label>
          ) : null}
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Chú thích (tuỳ chọn)</span>
            <input
              value={draft.caption}
              onChange={(event) => updateDraft("caption", event.target.value)}
              placeholder="Mô tả ngắn cho hình hoặc video"
            />
          </label>
        </div>

        <div className="miju-admin-preview-card">
          {draft.type === "image" && draft.url ? (
            <img src={draft.url} alt={draft.caption || "Xem trước hình ảnh"} />
          ) : null}
          {draft.type === "youtube" && youtubePreview ? (
            <img src={youtubePreview} alt={draft.caption || "Xem trước YouTube"} />
          ) : null}
          <h3>{draft.caption || (draft.type === "youtube" ? "Video YouTube" : "Hình ảnh")}</h3>
          <p>{draft.url || "Nhập URL để xem trước."}</p>
        </div>
      </div>

      <div className="miju-admin-actions">
        <button type="button" onClick={saveMediaItem} disabled={saving || !canPersist}>
          {saving ? "Đang lưu..." : editingExisting ? "Cập nhật media" : "Thêm media"}
        </button>
      </div>

      {sortedMedia.length > 0 ? (
        <div className="miju-admin-media-list">
          {sortedMedia.map((item) => (
            <article key={item.id} className="miju-admin-media-row">
              {item.type === "image" ? (
                <img src={item.url} alt={item.caption || serviceTitle} />
              ) : (
                <img
                  src={getYoutubeThumbnailUrl(item.url) || "/images/services/moi-baby.jpg"}
                  alt={item.caption || "YouTube"}
                />
              )}
              <div>
                <h3>{item.caption || (item.type === "youtube" ? "Video YouTube" : "Hình ảnh")}</h3>
                <p>{item.type === "youtube" ? "YouTube" : "Hình ảnh"} · Thứ tự {item.sortOrder}</p>
                <span className="miju-admin-media-url">{item.url}</span>
              </div>
              <div className="miju-admin-row-actions">
                <button type="button" onClick={() => setDraft(item)} disabled={!canPersist}>
                  Sửa
                </button>
                <button
                  type="button"
                  className="miju-admin-secondary-button"
                  onClick={() => deleteMediaItem(item.id)}
                  disabled={saving || !canPersist}
                >
                  Xóa
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="miju-admin-note">Chưa có hình ảnh hoặc video cho dịch vụ này.</p>
      )}
    </section>
  );
}
