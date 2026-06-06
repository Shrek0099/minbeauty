import { stats } from "@/lib/site-config";

export function Stats() {
  return (
    <section className="border-y border-primary-light/50 bg-white py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="section-title text-3xl font-bold text-primary md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-muted md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
