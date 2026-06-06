"use client";

import { useState } from "react";
import { galleryItems } from "@/lib/site-config";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = galleryItems[activeIndex];

  return (
    <section id="hinh-anh" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="section-title mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Hình ảnh Trước - Sau Khách hàng
          </h2>
          <p className="text-muted">
            Kết quả thực tế từ các liệu trình tại Min Beauty
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {galleryItems.map((g, i) => (
            <button
              key={g.category}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeIndex === i
                  ? "bg-primary text-white"
                  : "bg-white text-foreground hover:bg-primary-light"
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div className="bg-primary px-4 py-2 text-center text-sm font-semibold text-white">
              TRƯỚC
            </div>
            <img
              src={item.before}
              alt={`Trước liệu trình ${item.category}`}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div className="bg-gold px-4 py-2 text-center text-sm font-semibold text-white">
              SAU
            </div>
            <img
              src={item.after}
              alt={`Sau liệu trình ${item.category}`}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
