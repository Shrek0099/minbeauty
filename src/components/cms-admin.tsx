"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { defaultCmsData } from "@/lib/cms-defaults";
import type { AnalyticsSummary, CmsData, CmsSeoSettings, CmsService } from "@/lib/cms-types";
import { ServiceMediaEditor } from "@/components/service-media-admin";

type CmsResponse = {
  data: CmsData;
  canPersist: boolean;
  storageUploadEnabled: boolean;
};

const emptyService = (): CmsService => ({
  id: crypto.randomUUID(),
  title: "",
  group: "cosmetic",
  homeImage: "/images/services/moi-baby.jpg",
  description: "",
  visible: true,
  sortOrder: 99,
  updatedAt: new Date().toISOString(),
});

function StatusNote({
  canPersist,
  storageUploadEnabled,
}: {
  canPersist: boolean;
  storageUploadEnabled: boolean;
}) {
  return (
    <p className={`miju-admin-note${canPersist || storageUploadEnabled ? "" : " miju-admin-note-warning"}`}>
      {canPersist
        ? "CMS đang lưu được trên máy local. Commit thay đổi rồi deploy lên Vercel."
        : storageUploadEnabled
          ? "Production: upload ảnh qua Supabase Storage đã bật. Dữ liệu CMS lưu trong .cms/cms-store.json — commit rồi deploy."
          : "Production: chỉ xem CMS. Cấu hình Supabase Storage để upload ảnh; commit .cms/cms-store.json sau khi chỉnh."}
    </p>
  );
}

async function loadCms(): Promise<CmsResponse> {
  const response = await fetch("/api/cms", { cache: "no-store" });
  if (!response.ok) throw new Error("Cannot load CMS");
  return response.json();
}

async function saveCms(data: CmsData): Promise<CmsResponse> {
  const response = await fetch("/api/cms", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Cannot save CMS");
  return response.json();
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type StorageUsageState =
  | { enabled: false }
  | {
      enabled: true;
      usedBytes: number;
      maxBytes: number;
      fileCount: number;
      maxFiles: number;
      percentUsed: number;
    };

function StorageUsageNote({ usage }: { usage: StorageUsageState | null }) {
  if (!usage?.enabled) return null;

  const warn = usage.percentUsed >= 80 || usage.fileCount >= usage.maxFiles * 0.8;

  return (
    <p className={`miju-admin-note${warn ? " miju-admin-note-warning" : ""}`}>
      Supabase Storage: {formatBytes(usage.usedBytes)} / {formatBytes(usage.maxBytes)} ({usage.percentUsed}%) ·{" "}
      {usage.fileCount}/{usage.maxFiles} ảnh.
    </p>
  );
}

function sortServices(services: CmsService[]) {
  return [...services].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function AdminDashboard() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [canPersist, setCanPersist] = useState(false);
  const [storageUploadEnabled, setStorageUploadEnabled] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
        setStorageUploadEnabled(payload.storageUploadEnabled);
      })
      .catch(() => setCms(defaultCmsData));

    fetch("/api/analytics", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { summary?: AnalyticsSummary }) => setAnalytics(payload.summary || null))
      .catch(() => setAnalytics(null));
  }, []);

  const visibleServices = cms.services.filter((service) => service.visible).length;
  const publishedPosts = cms.posts.filter((post) => post.status === "published").length;
  const draftPosts = cms.posts.filter((post) => post.status === "draft").length;

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} storageUploadEnabled={storageUploadEnabled} />

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Tổng quan</p>
            <h2>Thống kê nội dung</h2>
          </div>
        </div>
        <div className="miju-admin-grid">
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">Trang tĩnh</span>
            <h2>{cms.pages.length} trang</h2>
            <p>Chỉnh SEO, tiêu đề và nội dung các trang chính tại mục Trang tĩnh.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">Tin tức</span>
            <h2>
              {publishedPosts} xuất bản · {draftPosts} nháp
            </h2>
            <p>Quản lý bài viết tin tức, thêm/sửa/xóa và trạng thái xuất bản.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">Dịch vụ</span>
            <h2>{visibleServices} đang hiển thị</h2>
            <p>Quản lý tên dịch vụ, nhóm menu, thứ tự, hình ảnh và thêm hình ảnh/video YouTube cho từng trang dịch vụ.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">FAQ</span>
            <h2>{cms.faqs.filter((item) => item.isActive).length} câu hỏi</h2>
            <p>Chỉnh sửa FAQ tại trang FAQ trong mục Trang tĩnh.</p>
          </div>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">SEO & Phân tích</p>
            <h2>Tăng trưởng</h2>
          </div>
        </div>
        <div className="miju-admin-grid">
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">SEO</span>
            <h2>{cms.seo.title.length} ký tự title</h2>
            <p>{cms.seo.description.length} ký tự description. Nên giữ title dưới 60 và description 120-160 ký tự.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">Visitor</span>
            <h2>{analytics?.totalViews ?? 0} lượt xem</h2>
            <p>{analytics?.uniqueVisitors ?? 0} khách truy cập đã được ghi nhận bởi tracker nội bộ.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServiceManager({
  initialServiceId,
  showServiceList = true,
}: {
  initialServiceId?: string;
  showServiceList?: boolean;
} = {}) {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsService>(emptyService());
  const [canPersist, setCanPersist] = useState(false);
  const [storageUploadEnabled, setStorageUploadEnabled] = useState(false);
  const [storageUsage, setStorageUsage] = useState<StorageUsageState | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
        setStorageUploadEnabled(payload.storageUploadEnabled);

        if (initialServiceId) {
          const service = payload.data.services.find((item) => item.id === initialServiceId);
          if (service) setDraft(service);
        }
      })
      .catch(() => setMessage("Không tải được CMS, đang dùng dữ liệu mặc định."));

    fetch("/api/cms/storage-usage", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { usage?: StorageUsageState }) => {
        if (payload.usage) setStorageUsage(payload.usage);
      })
      .catch(() => setStorageUsage(null));
  }, [initialServiceId]);

  const sortedServices = useMemo(() => sortServices(cms.services), [cms.services]);
  const editingExistingService = cms.services.some((service) => service.id === draft.id);

  function updateDraft<K extends keyof CmsService>(key: K, value: CmsService[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setDraft(emptyService());
  }

  async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/cms/upload", { method: "POST", body: formData });
    const payload = (await response.json()) as {
      url?: string;
      persisted?: boolean;
      error?: string;
      message?: string;
    };

    if (!response.ok || !payload.url) {
      throw new Error(payload.message || "Upload thất bại.");
    }
    updateDraft("homeImage", payload.url);
    if (!payload.persisted) {
      setMessage("Ảnh đã được nhúng tạm thời trên máy local.");
      return;
    }
    if (storageUploadEnabled) {
      fetch("/api/cms/storage-usage", { cache: "no-store" })
        .then((res) => res.json())
        .then((data: { usage?: StorageUsageState }) => {
          if (data.usage) setStorageUsage(data.usage);
        })
        .catch(() => undefined);
    }
  }

  async function saveService() {
    if (!draft.title.trim()) {
      setMessage("Tên dịch vụ không được để trống.");
      return;
    }

    setSaving(true);
    setMessage("");

    const now = new Date().toISOString();
    const nextService = {
      ...draft,
      group: "cosmetic" as const,
      title: draft.title.trim(),
      description: draft.description.trim(),
      homeImage: draft.homeImage.trim(),
      updatedAt: now,
    };
    const exists = cms.services.some((service) => service.id === draft.id);
    const nextCms = {
      ...cms,
      services: exists
        ? cms.services.map((service) => (service.id === draft.id ? nextService : service))
        : [...cms.services, nextService],
      updatedAt: now,
    };

    try {
      const payload = await saveCms(nextCms);
      setCms(payload.data);
      setCanPersist(payload.canPersist);
      setStorageUploadEnabled(payload.storageUploadEnabled);
      setMessage("Đã lưu dịch vụ.");
      if (!initialServiceId) {
        resetForm();
      }
    } catch {
      setMessage("Chưa lưu được dịch vụ. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: string) {
    const nextCms = {
      ...cms,
      services: cms.services.filter((service) => service.id !== id),
      updatedAt: new Date().toISOString(),
    };
    const payload = await saveCms(nextCms);
    setCms(payload.data);
    setCanPersist(payload.canPersist);
    setMessage("Đã xóa dịch vụ.");
  }

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} storageUploadEnabled={storageUploadEnabled} />
      <StorageUsageNote usage={storageUsage} />
      {message ? <p className="miju-admin-note">{message}</p> : null}

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Service CMS</p>
            <h2>{cms.services.some((service) => service.id === draft.id) ? "Sửa dịch vụ" : "Tạo dịch vụ mới"}</h2>
          </div>
          {initialServiceId ? (
            <Link href="/admin/services" className="miju-admin-plain-button">
              Tất cả dịch vụ
            </Link>
          ) : (
            <button type="button" className="miju-admin-plain-button" onClick={resetForm}>
              Tạo mới
            </button>
          )}
        </div>

        <div className="miju-admin-editor-grid">
          <div className="miju-admin-form-grid">
            <label className="miju-admin-field">
              <span>Tên dịch vụ</span>
              <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} />
            </label>
            <label className="miju-admin-field">
              <span>Thứ tự</span>
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(event) => updateDraft("sortOrder", Number(event.target.value))}
              />
            </label>
            <label className="miju-admin-field">
              <span>Hiển thị</span>
              <select
                value={draft.visible ? "true" : "false"}
                onChange={(event) => updateDraft("visible", event.target.value === "true")}
              >
                <option value="true">Đang hiển thị</option>
                <option value="false">Ẩn khỏi landing page</option>
              </select>
            </label>
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Mô tả ngắn</span>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(event) => updateDraft("description", event.target.value)}
              />
            </label>
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Ảnh đại diện trang chủ (Supabase)</span>
              <input
                value={draft.homeImage}
                onChange={(event) => updateDraft("homeImage", event.target.value)}
                placeholder="https://...supabase.co/storage/v1/object/public/images/services/moi-baby.jpg"
              />
            </label>
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Upload ảnh đại diện</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadPhoto(file).catch(() => setMessage("Upload ảnh chưa thành công."));
                }}
              />
            </label>
          </div>
          <div className="miju-admin-preview-card">
            {draft.homeImage ? (
              <img src={draft.homeImage} alt={draft.title || "Xem trước ảnh đại diện"} />
            ) : null}
            <h3>{draft.title || "Tên dịch vụ"}</h3>
            <p>{draft.description || "Ảnh này hiển thị trên thẻ dịch vụ ở trang chủ."}</p>
          </div>
        </div>

        <div className="miju-admin-actions">
          <button type="button" onClick={saveService} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu dịch vụ"}
          </button>
        </div>
      </section>

      {editingExistingService ? (
        <ServiceMediaEditor
          serviceId={draft.id}
          serviceTitle={draft.title}
          media={cms.serviceMedia[draft.id] || []}
          cms={cms}
          canPersist={canPersist}
          storageUploadEnabled={storageUploadEnabled}
          onSaved={(payload) => {
            setCms(payload.data);
            setCanPersist(payload.canPersist);
            setStorageUploadEnabled(payload.storageUploadEnabled);
          }}
          onMessage={setMessage}
        />
      ) : null}

      {showServiceList ? (
        <section className="miju-admin-panel">
          <div className="miju-admin-panel-header">
            <div>
              <p className="miju-admin-eyebrow">Dịch vụ thẩm mỹ</p>
              <h2>{sortedServices.length} dịch vụ</h2>
            </div>
          </div>
          <div className="miju-admin-service-list">
            {sortedServices.map((service) => (
              <article key={service.id} className="miju-admin-service-row">
                <img src={service.homeImage} alt={service.title} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>{service.visible ? "Đang hiển thị" : "Đang ẩn"}</span>
                </div>
                <div className="miju-admin-row-actions">
                  <Link href={`/admin/services/${service.id}`} className="miju-admin-inline-button">
                    Sửa
                  </Link>
                  <button
                    type="button"
                    className="miju-admin-secondary-button"
                    onClick={() => deleteService(service.id)}
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function SeoManager() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsSeoSettings>(defaultCmsData.seo);
  const [canPersist, setCanPersist] = useState(false);
  const [storageUploadEnabled, setStorageUploadEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const titleOk = draft.title.length > 0 && draft.title.length <= 60;
  const descriptionOk = draft.description.length >= 120 && draft.description.length <= 160;

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setDraft(payload.data.seo);
        setCanPersist(payload.canPersist);
        setStorageUploadEnabled(payload.storageUploadEnabled);
      })
      .catch(() => setMessage("Không tải được SEO CMS, đang dùng dữ liệu mặc định."));
  }, []);

  function updateDraft<K extends keyof CmsSeoSettings>(key: K, value: CmsSeoSettings[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function saveSeo() {
    const now = new Date().toISOString();
    const nextCms = {
      ...cms,
      seo: {
        ...draft,
        updatedAt: now,
      },
      updatedAt: now,
    };

    try {
      const payload = await saveCms(nextCms);
      setCms(payload.data);
      setDraft(payload.data.seo);
      setCanPersist(payload.canPersist);
      setMessage("Đã lưu SEO settings.");
    } catch {
      setMessage("Chưa lưu được SEO settings.");
    }
  }

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} storageUploadEnabled={storageUploadEnabled} />
      {message ? <p className="miju-admin-note">{message}</p> : null}

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">SEO CMS</p>
            <h2>Quản lý metadata chính</h2>
          </div>
          <span className="miju-admin-status">robots: index, follow</span>
        </div>

        <div className="miju-admin-form-grid">
          <label className="miju-admin-field miju-admin-field-wide">
            <span>SEO title ({draft.title.length}/60)</span>
            <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Meta description ({draft.description.length}/160)</span>
            <textarea
              rows={4}
              value={draft.description}
              onChange={(event) => updateDraft("description", event.target.value)}
            />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Keywords</span>
            <textarea
              rows={3}
              value={draft.keywords}
              onChange={(event) => updateDraft("keywords", event.target.value)}
            />
          </label>
          <label className="miju-admin-field">
            <span>Canonical URL</span>
            <input value={draft.canonicalUrl} onChange={(event) => updateDraft("canonicalUrl", event.target.value)} />
          </label>
          <label className="miju-admin-field">
            <span>Open Graph image</span>
            <input value={draft.ogImage} onChange={(event) => updateDraft("ogImage", event.target.value)} />
          </label>
        </div>

        <div className="miju-admin-grid mt-5">
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">{titleOk ? "OK" : "Cần sửa"}</span>
            <h2>Title</h2>
            <p>Nên dưới 60 ký tự để không bị cắt trên Google.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">{descriptionOk ? "OK" : "Cần tối ưu"}</span>
            <h2>Description</h2>
            <p>Nên khoảng 120-160 ký tự, có dịch vụ chính và khu vực Tây Ninh.</p>
          </div>
          <div className="miju-admin-card">
            <span className="miju-admin-card-kicker">Indexing</span>
            <h2>Sitemap</h2>
            <p>
              Kiểm tra <a className="miju-admin-inline-link" href="/sitemap.xml">sitemap.xml</a> và{" "}
              <a className="miju-admin-inline-link" href="/robots.txt">robots.txt</a>.
            </p>
          </div>
        </div>

        <div className="miju-admin-actions">
          <button type="button" onClick={saveSeo}>
            Lưu SEO
          </button>
        </div>
      </section>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [canPersist, setCanPersist] = useState(false);
  const [storageUploadEnabled, setStorageUploadEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/analytics", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: {
        summary?: AnalyticsSummary;
        canPersist?: boolean;
        storageUploadEnabled?: boolean;
      }) => {
        setSummary(payload.summary || null);
        setCanPersist(Boolean(payload.canPersist));
        setStorageUploadEnabled(Boolean(payload.storageUploadEnabled));
      })
      .catch(() => setSummary(null));
  }, []);

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} storageUploadEnabled={storageUploadEnabled} />
      <section className="miju-admin-grid">
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Total</span>
          <h2>{summary?.totalViews ?? 0}</h2>
          <p>Tổng số page view đã được tracker nội bộ ghi nhận.</p>
        </div>
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Visitor</span>
          <h2>{summary?.uniqueVisitors ?? 0}</h2>
          <p>Số khách truy cập duy nhất theo cookie first-party.</p>
        </div>
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Today</span>
          <h2>{summary?.todayViews ?? 0}</h2>
          <p>Lượt xem được ghi nhận trong ngày hôm nay.</p>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Top pages</p>
            <h2>Trang được xem nhiều</h2>
          </div>
        </div>
        <div className="miju-admin-table-wrap">
          <table className="miju-admin-table">
            <thead>
              <tr>
                <th>Trang</th>
                <th>Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              {(summary?.topPages || []).map((page) => (
                <tr key={page.path}>
                  <td>{page.path}</td>
                  <td>{page.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Recent</p>
            <h2>Lượt truy cập gần đây</h2>
          </div>
        </div>
        <div className="miju-admin-table-wrap">
          <table className="miju-admin-table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Trang</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {(summary?.recentViews || []).map((view) => (
                <tr key={view.id}>
                  <td>{new Date(view.createdAt).toLocaleString("vi-VN")}</td>
                  <td>{view.path}</td>
                  <td>{view.referrer || "Direct"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
