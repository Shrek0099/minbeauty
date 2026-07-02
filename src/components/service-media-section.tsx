import Image from "next/image";
import type { CmsServiceMediaItem } from "@/lib/cms-types";
import { resolveStorageUrl } from "@/lib/image-url";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

type ServiceMediaSectionProps = {
  items: CmsServiceMediaItem[];
  serviceTitle: string;
};

export function ServiceMediaSection({ items, serviceTitle }: ServiceMediaSectionProps) {
  if (items.length === 0) return null;

  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="service-media-section">
      <h2>Hình ảnh / Video</h2>
      <div className="service-media-grid">
        {sorted.map((item) => {
          if (item.type === "youtube") {
            const embedUrl = getYoutubeEmbedUrl(item.url);
            if (!embedUrl) return null;

            return (
              <article key={item.id} className="service-media-item service-media-item--video">
                <div className="service-media-embed">
                  <iframe
                    src={embedUrl}
                    title={item.caption || `Video ${serviceTitle}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {item.caption ? <p className="service-media-caption">{item.caption}</p> : null}
              </article>
            );
          }

          return (
            <article key={item.id} className="service-media-item service-media-item--image before-after-card">
              <div className="relative overflow-hidden">
                <Image
                  src={resolveStorageUrl(item.url)}
                  alt={item.caption || `Hình ảnh ${serviceTitle}`}
                  width={720}
                  height={960}
                  className="boutique-card-image aspect-[3/4]"
                  loading="lazy"
                />
              </div>
              {item.caption ? <p className="service-media-caption">{item.caption}</p> : null}
            </article>
          );
        })}
      </div>
      <p className="service-media-note">Kết quả tùy thuộc tình trạng từng khách hàng.</p>
    </section>
  );
}
