import { Heart, Shield, Sparkles, Stethoscope } from "lucide-react";
import { commitments } from "@/lib/site-config";

const iconMap = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  shield: Shield,
  heart: Heart,
};

export function Commitments() {
  return (
    <section id="cam-ket" className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="section-title text-3xl font-bold text-white md:text-4xl">
            Cam Kết Khách Hàng
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-light">
            Min Beauty cam kết mang đến trải nghiệm làm đẹp an toàn, chuyên
            nghiệp và tận tâm
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
