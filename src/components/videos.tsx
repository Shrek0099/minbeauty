import Image from "next/image";
import { Play } from "lucide-react";
import { videos } from "@/lib/site-config";

export function Videos() {
  return (
    <section id="video" className="site-section section-reveal video-section">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Video</p>
          <h2 className="section-heading">Video khách hàng</h2>
          <div className="section-heading-accent" />
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="video-card group">
              <div className="relative overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={720}
                  height={960}
                  className="boutique-card-image video-card-thumb"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(47,32,34,0.14)] transition-colors group-hover:bg-[rgba(47,32,34,0.22)]">
                  <div className="video-play-btn">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </div>
                <span className="luxury-tag absolute top-4 left-4">{video.service}</span>
              </div>
              <h3 className="boutique-card-title">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
