"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { defaultCmsData, serviceGroupLabels } from "@/lib/cms-defaults";
import type { AnalyticsSummary, CmsData, CmsSeoSettings, CmsService, CmsServiceGroup } from "@/lib/cms-types";

type CmsResponse = {
  data: CmsData;
  canPersist: boolean;
};

const emptyService = (group: CmsServiceGroup): CmsService => ({
  id: crypto.randomUUID(),
  title: "",
  group,
  image: "/images/services/moi-baby.jpg",
  description: "",
  visible: true,
  sortOrder: 99,
  updatedAt: new Date().toISOString(),
});

function StatusNote({ canPersist }: { canPersist: boolean }) {
  return (
    <p className={`miju-admin-note${canPersist ? "" : " miju-admin-note-warning"}`}>
      {canPersist
        ? "CMS đang lưu được dữ liệu trên server hiện tại."
        : "CMS đang ở chế độ demo trên production. Dùng database/Blob storage để lưu bền vững sau deploy."}
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

function sortServices(services: CmsService[]) {
  return [...services].sort((a, b) => a.group.localeCompare(b.group) || a.sortOrder - b.sortOrder);
}

export function AdminDashboard() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [canPersist, setCanPersist] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
      })
      .catch(() => setCms(defaultCmsData));

    fetch("/api/analytics", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { summary?: AnalyticsSummary }) => setAnalytics(payload.summary || null))
      .catch(() => setAnalytics(null));
  }, []);

  const visibleServices = cms.services.filter((service) => service.visible).length;

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} />
      <section className="miju-admin-grid">
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Dịch vụ</span>
          <h2>{visibleServices} đang hiển thị</h2>
          <p>Quản lý tên dịch vụ, nhóm menu, thứ tự và hình ảnh trên landing page.</p>
        </div>
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
      </section>
    </div>
  );
}

export function ServiceManager() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsService>(emptyService("cosmetic"));
  const [canPersist, setCanPersist] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
      })
      .catch(() => setMessage("Không tải được CMS, đang dùng dữ liệu mặc định."));
  }, []);

  const groupedServices = useMemo(
    () => ({
      cosmetic: sortServices(cms.services.filter((service) => service.group === "cosmetic")),
      spa: sortServices(cms.services.filter((service) => service.group === "spa")),
    }),
    [cms.services],
  );

  function updateDraft<K extends keyof CmsService>(key: K, value: CmsService[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function resetForm(group: CmsServiceGroup = "cosmetic") {
    setDraft(emptyService(group));
  }

  async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/cms/upload", { method: "POST", body: formData });
    const payload = await response.json();

    if (!response.ok || !payload.url) throw new Error("Upload failed");
    updateDraft("image", payload.url);
    if (!payload.persisted) setMessage("Ảnh đã được nhúng tạm thời. Nên dùng Blob/storage để lưu ảnh bền vững.");
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
      title: draft.title.trim(),
      description: draft.description.trim(),
      image: draft.image.trim(),
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
      setMessage("Đã lưu dịch vụ.");
      resetForm(draft.group);
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
      <StatusNote canPersist={canPersist} />
      {message ? <p className="miju-admin-note">{message}</p> : null}

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Service CMS</p>
            <h2>{cms.services.some((service) => service.id === draft.id) ? "Sửa dịch vụ" : "Tạo dịch vụ mới"}</h2>
          </div>
          <button type="button" className="miju-admin-plain-button" onClick={() => resetForm(draft.group)}>
            Tạo mới
          </button>
        </div>

        <div className="miju-admin-editor-grid">
          <div className="miju-admin-form-grid">
            <label className="miju-admin-field">
              <span>Tên dịch vụ</span>
              <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} />
            </label>
            <label className="miju-admin-field">
              <span>Nhóm menu</span>
              <select
                value={draft.group}
                onChange={(event) => updateDraft("group", event.target.value as CmsServiceGroup)}
              >
                <option value="cosmetic">{serviceGroupLabels.cosmetic}</option>
                <option value="spa">{serviceGroupLabels.spa}</option>
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
              <span>URL hình ảnh</span>
              <input value={draft.image} onChange={(event) => updateDraft("image", event.target.value)} />
            </label>
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Đổi hình từ máy</span>
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
            {draft.image ? <img src={draft.image} alt={draft.title || "Xem trước dịch vụ"} /> : null}
            <h3>{draft.title || "Tên dịch vụ"}</h3>
            <p>{draft.description || "Mô tả dịch vụ sẽ hiển thị tại đây."}</p>
          </div>
        </div>

        <div className="miju-admin-actions">
          <button type="button" onClick={saveService} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu dịch vụ"}
          </button>
        </div>
      </section>

      {(["cosmetic", "spa"] as CmsServiceGroup[]).map((group) => (
        <section key={group} className="miju-admin-panel">
          <div className="miju-admin-panel-header">
            <div>
              <p className="miju-admin-eyebrow">{serviceGroupLabels[group]}</p>
              <h2>{groupedServices[group].length} dịch vụ</h2>
            </div>
          </div>
          <div className="miju-admin-service-list">
            {groupedServices[group].map((service) => (
              <article key={service.id} className="miju-admin-service-row">
                <img src={service.image} alt={service.title} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>{service.visible ? "Đang hiển thị" : "Đang ẩn"}</span>
                </div>
                <div className="miju-admin-row-actions">
                  <button type="button" onClick={() => setDraft(service)}>
                    Sửa
                  </button>
                  <button type="button" className="miju-admin-secondary-button" onClick={() => deleteService(service.id)}>
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function SeoManager() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsSeoSettings>(defaultCmsData.seo);
  const [canPersist, setCanPersist] = useState(false);
  const [message, setMessage] = useState("");
  const titleOk = draft.title.length > 0 && draft.title.length <= 60;
  const descriptionOk = draft.description.length >= 120 && draft.description.length <= 160;

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setDraft(payload.data.seo);
        setCanPersist(payload.canPersist);
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
      <StatusNote canPersist={canPersist} />
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

  useEffect(() => {
    fetch("/api/analytics", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { summary?: AnalyticsSummary; canPersist?: boolean }) => {
        setSummary(payload.summary || null);
        setCanPersist(Boolean(payload.canPersist));
      })
      .catch(() => setSummary(null));
  }, []);

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} />
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
