export default function LocationsSection() {
  return (
    <section id="locations" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center">Serving Western Washington</h2>
        <p className="text-center text-slate mt-2">
          Starting with Edmonds, Chelan, Ashford (Mt. Rainier), and Brennan — expanding across the region.
        </p>
        <div className="grid gap-8 md:grid-cols-4 mt-10">
          <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold">Edmonds</h3>
            <p className="text-slate">Urban coastal stays with quick Seattle access.</p>
          </div>
          <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold">Chelan</h3>
            <p className="text-slate">Lake country specialists for seasonal demand.</p>
          </div>
          <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold">Ashford (Mt. Rainier)</h3>
            <p className="text-slate">Cabins at the gateway to Mt. Rainier.</p>
          </div>
          <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="font-semibold">Brennan</h3>
            <p className="text-slate">Boutique stays off the Hood Canal.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
