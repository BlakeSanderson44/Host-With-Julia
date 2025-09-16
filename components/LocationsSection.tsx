interface LocationItem {
  name: string;
  description: string;
}

interface LocationsSectionProps {
  locations: LocationItem[];
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  return (
    <section id="locations" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center">Serving Western Washington</h2>
        <p className="text-center text-slate mt-2">
          Starting with Edmonds, Chelan, Ashford (Mt. Rainier), and Brennan — expanding across the region.
        </p>
        <div className="grid gap-8 md:grid-cols-4 mt-10">
          {locations.map((location) => (
            <div key={location.name} className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-slate">{location.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
