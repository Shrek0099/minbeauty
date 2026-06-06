import { processSteps } from "@/lib/site-config";

export function Process() {
  return (
    <section id="quy-trinh" className="site-section section-reveal process-section">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Quy trình</p>
          <h2 className="section-heading">Quy trình tư vấn đơn giản</h2>
          <div className="section-heading-accent" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step} className="process-card">
              <div className="boutique-card-inner">
                <div className="process-number mb-4">{step.step}</div>
                <h3 className="boutique-card-title-plain mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
