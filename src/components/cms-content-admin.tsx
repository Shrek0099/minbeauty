"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { blogCategories } from "@/lib/blog";
import { defaultCmsData } from "@/lib/cms-defaults";
import { slugify } from "@/lib/slugify";
import type {
  CmsData,
  CmsFaqItem,
  CmsPage,
  CmsPageKey,
  CmsPost,
  CmsPostSection,
} from "@/lib/cms-types";

type CmsResponse = {
  data: CmsData;
  canPersist: boolean;
};

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

function StatusNote({ canPersist }: { canPersist: boolean }) {
  return (
    <p className={`miju-admin-note${canPersist ? "" : " miju-admin-note-warning"}`}>
      {canPersist
        ? "CMS đang lưu được dữ liệu trên server hiện tại."
        : "CMS đang ở chế độ demo trên production. Dùng database/Blob storage để lưu bền vững sau deploy."}
    </p>
  );
}

const emptyPost = (): CmsPost => ({
  id: crypto.randomUUID(),
  slug: "",
  title: "",
  excerpt: "",
  category: blogCategories[0]?.slug ?? "lam-dep",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 phút",
  tags: [],
  image: "/images/news/moi-baby-la-gi.jpg",
  sections: [{ heading: "Nội dung chính", body: [""] }],
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  updatedAt: new Date().toISOString(),
});

const emptyFaq = (): CmsFaqItem => ({
  id: crypto.randomUUID(),
  question: "",
  answer: "",
  order: 99,
  isActive: true,
  updatedAt: new Date().toISOString(),
});

export function PostManager() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsPost>(emptyPost());
  const [canPersist, setCanPersist] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
      })
      .catch(() => setMessage("Không tải được CMS, đang dùng dữ liệu mặc định."));
  }, []);

  const filteredPosts = useMemo(() => {
    const posts = [...cms.posts].sort((a, b) => b.date.localeCompare(a.date));
    if (filter === "all") return posts;
    return posts.filter((post) => post.status === filter);
  }, [cms.posts, filter]);

  function updateDraft<K extends keyof CmsPost>(key: K, value: CmsPost[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateSection(index: number, section: CmsPostSection) {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((item, itemIndex) => (itemIndex === index ? section : item)),
    }));
  }

  function resetForm() {
    setDraft(emptyPost());
  }

  async function savePost() {
    if (!draft.title.trim()) {
      setMessage("Tiêu đề bài viết không được để trống.");
      return;
    }

    const slug = draft.slug.trim() || slugify(draft.title);
    const duplicate = cms.posts.some((post) => post.slug === slug && post.id !== draft.id);
    if (duplicate) {
      setMessage("Slug đã tồn tại. Vui lòng chọn slug khác.");
      return;
    }

    setSaving(true);
    setMessage("");

    const now = new Date().toISOString();
    const nextPost: CmsPost = {
      ...draft,
      slug,
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim(),
      seoTitle: draft.seoTitle.trim() || draft.title.trim(),
      seoDescription: draft.seoDescription.trim() || draft.excerpt.trim(),
      updatedAt: now,
    };
    const exists = cms.posts.some((post) => post.id === draft.id);
    const nextCms = {
      ...cms,
      posts: exists
        ? cms.posts.map((post) => (post.id === draft.id ? nextPost : post))
        : [...cms.posts, nextPost],
      updatedAt: now,
    };

    try {
      const payload = await saveCms(nextCms);
      setCms(payload.data);
      setCanPersist(payload.canPersist);
      setMessage("Đã lưu bài viết.");
      resetForm();
    } catch {
      setMessage("Chưa lưu được bài viết. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(id: string) {
    const nextCms = {
      ...cms,
      posts: cms.posts.filter((post) => post.id !== id),
      updatedAt: new Date().toISOString(),
    };
    const payload = await saveCms(nextCms);
    setCms(payload.data);
    setCanPersist(payload.canPersist);
    if (draft.id === id) resetForm();
    setMessage("Đã xóa bài viết.");
  }

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} />
      {message ? <p className="miju-admin-note">{message}</p> : null}

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Tin tức</p>
            <h2>{cms.posts.some((post) => post.id === draft.id) ? "Sửa bài viết" : "Tạo bài viết mới"}</h2>
          </div>
          <button type="button" className="miju-admin-plain-button" onClick={resetForm}>
            Tạo mới
          </button>
        </div>

        <div className="miju-admin-form-grid">
          <label className="miju-admin-field">
            <span>Tiêu đề</span>
            <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} />
          </label>
          <label className="miju-admin-field">
            <span>Slug URL</span>
            <input
              value={draft.slug}
              placeholder={draft.title ? slugify(draft.title) : "tu-dong-tao-tu-tieu-de"}
              onChange={(event) => updateDraft("slug", event.target.value)}
            />
          </label>
          <label className="miju-admin-field">
            <span>Chuyên mục</span>
            <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>
              {blogCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label className="miju-admin-field">
            <span>Trạng thái</span>
            <select
              value={draft.status}
              onChange={(event) => updateDraft("status", event.target.value as CmsPost["status"])}
            >
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </label>
          <label className="miju-admin-field">
            <span>Ngày đăng</span>
            <input type="date" value={draft.date} onChange={(event) => updateDraft("date", event.target.value)} />
          </label>
          <label className="miju-admin-field">
            <span>Thời gian đọc</span>
            <input value={draft.readTime} onChange={(event) => updateDraft("readTime", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Mô tả ngắn</span>
            <textarea rows={3} value={draft.excerpt} onChange={(event) => updateDraft("excerpt", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Tags (phân cách bằng dấu phẩy)</span>
            <input
              value={draft.tags.join(", ")}
              onChange={(event) =>
                updateDraft(
                  "tags",
                  event.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                )
              }
            />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>URL hình ảnh</span>
            <input value={draft.image} onChange={(event) => updateDraft("image", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>SEO title</span>
            <input value={draft.seoTitle} onChange={(event) => updateDraft("seoTitle", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>SEO description</span>
            <textarea
              rows={3}
              value={draft.seoDescription}
              onChange={(event) => updateDraft("seoDescription", event.target.value)}
            />
          </label>
        </div>

        <div className="miju-admin-stack mt-5">
          <div className="miju-admin-panel-header">
            <div>
              <p className="miju-admin-eyebrow">Nội dung</p>
              <h3>Các mục trong bài</h3>
            </div>
            <button
              type="button"
              className="miju-admin-plain-button"
              onClick={() =>
                updateDraft("sections", [...draft.sections, { heading: "Mục mới", body: [""] }])
              }
            >
              Thêm mục
            </button>
          </div>
          {draft.sections.map((section, index) => (
            <div key={`${draft.id}-section-${index}`} className="miju-admin-panel miju-admin-panel-nested">
              <label className="miju-admin-field miju-admin-field-wide">
                <span>Tiêu đề mục {index + 1}</span>
                <input
                  value={section.heading}
                  onChange={(event) => updateSection(index, { ...section, heading: event.target.value })}
                />
              </label>
              <label className="miju-admin-field miju-admin-field-wide">
                <span>Đoạn văn (mỗi dòng một đoạn)</span>
                <textarea
                  rows={4}
                  value={section.body.join("\n")}
                  onChange={(event) =>
                    updateSection(index, {
                      ...section,
                      body: event.target.value.split("\n"),
                    })
                  }
                />
              </label>
              <button
                type="button"
                className="miju-admin-secondary-button"
                onClick={() =>
                  updateDraft(
                    "sections",
                    draft.sections.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                Xóa mục
              </button>
            </div>
          ))}
        </div>

        <div className="miju-admin-actions">
          <button type="button" onClick={savePost} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu bài viết"}
          </button>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Danh sách</p>
            <h2>{filteredPosts.length} bài viết</h2>
          </div>
          <div className="miju-admin-row-actions">
            <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}>
              <option value="all">Tất cả</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>
        <div className="miju-admin-service-list">
          {filteredPosts.map((post) => (
            <article key={post.id} className="miju-admin-service-row">
              {post.image ? <img src={post.image} alt={post.title} /> : <div className="miju-admin-thumb-placeholder" />}
              <div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span>
                  {post.status === "published" ? "Đã xuất bản" : "Bản nháp"} · /news/{post.slug}
                </span>
              </div>
              <div className="miju-admin-row-actions">
                <Link href={`/news/${post.slug}`} className="miju-admin-inline-link" target="_blank">
                  Xem
                </Link>
                <button type="button" onClick={() => setDraft(post)}>
                  Sửa
                </button>
                <button type="button" className="miju-admin-secondary-button" onClick={() => deletePost(post.id)}>
                  Xóa
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PageListManager() {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [canPersist, setCanPersist] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} />
      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Trang tĩnh</p>
            <h2>{cms.pages.length} trang có thể chỉnh sửa</h2>
          </div>
        </div>
        <div className="miju-admin-service-list">
          {cms.pages.map((page) => (
            <article key={page.key} className="miju-admin-service-row">
              <div>
                <h3>{page.label}</h3>
                <p>{page.seoDescription}</p>
                <span>{page.path}</span>
              </div>
              <div className="miju-admin-row-actions">
                <Link href={page.path} className="miju-admin-inline-link" target="_blank">
                  Xem
                </Link>
                <Link href={`/admin/pages/${page.key}`}>Chỉnh sửa</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PageEditor({ pageKey }: { pageKey: CmsPageKey }) {
  const [cms, setCms] = useState<CmsData>(defaultCmsData);
  const [draft, setDraft] = useState<CmsPage | null>(null);
  const [faqDraft, setFaqDraft] = useState<CmsFaqItem>(emptyFaq());
  const [canPersist, setCanPersist] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCms()
      .then((payload) => {
        setCms(payload.data);
        setCanPersist(payload.canPersist);
        const page = payload.data.pages.find((item) => item.key === pageKey);
        setDraft(page || null);
      })
      .catch(() => setMessage("Không tải được CMS."));
  }, [pageKey]);

  if (!draft) {
    return <p className="miju-admin-note">Không tìm thấy trang này trong CMS.</p>;
  }

  function updatePage<K extends keyof CmsPage>(key: K, value: CmsPage[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  async function savePage() {
    if (!draft) return;
    setSaving(true);
    setMessage("");

    const now = new Date().toISOString();
    const nextCms = {
      ...cms,
      pages: cms.pages.map((page) => (page.key === draft.key ? { ...draft, updatedAt: now } : page)),
      updatedAt: now,
    };

    try {
      const payload = await saveCms(nextCms);
      setCms(payload.data);
      setDraft(payload.data.pages.find((page) => page.key === pageKey) || null);
      setCanPersist(payload.canPersist);
      setMessage("Đã lưu trang.");
    } catch {
      setMessage("Chưa lưu được trang.");
    } finally {
      setSaving(false);
    }
  }

  async function saveFaq() {
    if (!faqDraft.question.trim()) {
      setMessage("Câu hỏi FAQ không được để trống.");
      return;
    }

    const now = new Date().toISOString();
    const nextItem: CmsFaqItem = {
      ...faqDraft,
      question: faqDraft.question.trim(),
      answer: faqDraft.answer.trim(),
      updatedAt: now,
    };
    const exists = cms.faqs.some((item) => item.id === faqDraft.id);
    const nextCms = {
      ...cms,
      faqs: exists
        ? cms.faqs.map((item) => (item.id === faqDraft.id ? nextItem : item))
        : [...cms.faqs, nextItem],
      updatedAt: now,
    };

    const payload = await saveCms(nextCms);
    setCms(payload.data);
    setCanPersist(payload.canPersist);
    setFaqDraft(emptyFaq());
    setMessage("Đã lưu FAQ.");
  }

  async function deleteFaq(id: string) {
    const nextCms = {
      ...cms,
      faqs: cms.faqs.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    };
    const payload = await saveCms(nextCms);
    setCms(payload.data);
    setCanPersist(payload.canPersist);
    setMessage("Đã xóa FAQ.");
  }

  return (
    <div className="miju-admin-stack">
      <StatusNote canPersist={canPersist} />
      {message ? <p className="miju-admin-note">{message}</p> : null}

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Trang tĩnh</p>
            <h2>{draft.label}</h2>
          </div>
          <Link href={draft.path} className="miju-admin-inline-link" target="_blank">
            Xem trang →
          </Link>
        </div>

        <div className="miju-admin-form-grid">
          <label className="miju-admin-field miju-admin-field-wide">
            <span>SEO title</span>
            <input value={draft.seoTitle} onChange={(event) => updatePage("seoTitle", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>SEO description</span>
            <textarea
              rows={3}
              value={draft.seoDescription}
              onChange={(event) => updatePage("seoDescription", event.target.value)}
            />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Tiêu đề H1</span>
            <input value={draft.h1} onChange={(event) => updatePage("h1", event.target.value)} />
          </label>
          <label className="miju-admin-field miju-admin-field-wide">
            <span>Đoạn mở đầu</span>
            <textarea rows={3} value={draft.intro} onChange={(event) => updatePage("intro", event.target.value)} />
          </label>
        </div>

        {draft.sections.length > 0 ? (
          <div className="miju-admin-stack mt-5">
            <div className="miju-admin-panel-header">
              <div>
                <p className="miju-admin-eyebrow">Nội dung</p>
                <h3>Các mục trên trang</h3>
              </div>
              <button
                type="button"
                className="miju-admin-plain-button"
                onClick={() =>
                  updatePage("sections", [...draft.sections, { heading: "Mục mới", paragraphs: [""] }])
                }
              >
                Thêm mục
              </button>
            </div>
            {draft.sections.map((section, index) => (
              <div key={`${draft.key}-section-${index}`} className="miju-admin-panel miju-admin-panel-nested">
                <label className="miju-admin-field miju-admin-field-wide">
                  <span>Tiêu đề mục {index + 1}</span>
                  <input
                    value={section.heading}
                    onChange={(event) =>
                      updatePage(
                        "sections",
                        draft.sections.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, heading: event.target.value } : item,
                        ),
                      )
                    }
                  />
                </label>
                <label className="miju-admin-field miju-admin-field-wide">
                  <span>Đoạn văn (mỗi dòng một đoạn)</span>
                  <textarea
                    rows={4}
                    value={section.paragraphs.join("\n")}
                    onChange={(event) =>
                      updatePage(
                        "sections",
                        draft.sections.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, paragraphs: event.target.value.split("\n") }
                            : item,
                        ),
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        ) : null}

        <div className="miju-admin-actions">
          <button type="button" onClick={savePage} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu trang"}
          </button>
        </div>
      </section>

      {pageKey === "faq" ? (
        <section className="miju-admin-panel">
          <div className="miju-admin-panel-header">
            <div>
              <p className="miju-admin-eyebrow">FAQ</p>
              <h2>Quản lý câu hỏi thường gặp</h2>
            </div>
            <button type="button" className="miju-admin-plain-button" onClick={() => setFaqDraft(emptyFaq())}>
              Thêm câu hỏi
            </button>
          </div>

          <div className="miju-admin-form-grid">
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Câu hỏi</span>
              <input
                value={faqDraft.question}
                onChange={(event) => setFaqDraft((current) => ({ ...current, question: event.target.value }))}
              />
            </label>
            <label className="miju-admin-field miju-admin-field-wide">
              <span>Trả lời</span>
              <textarea
                rows={3}
                value={faqDraft.answer}
                onChange={(event) => setFaqDraft((current) => ({ ...current, answer: event.target.value }))}
              />
            </label>
            <label className="miju-admin-field">
              <span>Thứ tự</span>
              <input
                type="number"
                value={faqDraft.order}
                onChange={(event) =>
                  setFaqDraft((current) => ({ ...current, order: Number(event.target.value) }))
                }
              />
            </label>
            <label className="miju-admin-field">
              <span>Hiển thị</span>
              <select
                value={faqDraft.isActive ? "true" : "false"}
                onChange={(event) =>
                  setFaqDraft((current) => ({ ...current, isActive: event.target.value === "true" }))
                }
              >
                <option value="true">Đang hiển thị</option>
                <option value="false">Ẩn</option>
              </select>
            </label>
          </div>

          <div className="miju-admin-actions">
            <button type="button" onClick={saveFaq}>
              Lưu FAQ
            </button>
          </div>

          <div className="miju-admin-service-list mt-5">
            {cms.faqs.map((item) => (
              <article key={item.id} className="miju-admin-service-row">
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                  <span>
                    Thứ tự {item.order} · {item.isActive ? "Hiển thị" : "Ẩn"}
                  </span>
                </div>
                <div className="miju-admin-row-actions">
                  <button type="button" onClick={() => setFaqDraft(item)}>
                    Sửa
                  </button>
                  <button type="button" className="miju-admin-secondary-button" onClick={() => deleteFaq(item.id)}>
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
