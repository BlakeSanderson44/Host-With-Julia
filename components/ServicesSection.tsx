interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-sand py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-10">Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
              <div className="text-2xl">{service.icon}</div>
              <h3 className="font-semibold mt-4">{service.title}</h3>
              <p className="text-slate mt-2">{service.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-slate">
          I stay on top of Airbnb policy and algorithm changes so your listing stays compliant and competitive.
        </p>
      </div>
    </section>
  );
}
