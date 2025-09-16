export default function TestimonialsSection() {
  return (
    <section id="faqs" className="bg-sand py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-10">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <blockquote className="bg-white p-6 rounded shadow">
            <p className="text-slate mb-2">“Julia made hosting effortless and our reviews shot up.”</p>
            <div>⭐️⭐️⭐️⭐️⭐️</div>
          </blockquote>
          <blockquote className="bg-white p-6 rounded shadow">
            <p className="text-slate mb-2">“Professional, responsive, and worth every penny.”</p>
            <div>⭐️⭐️⭐️⭐️⭐️</div>
          </blockquote>
          <blockquote className="bg-white p-6 rounded shadow">
            <p className="text-slate mb-2">“Our cabin stays booked and stress-free.”</p>
            <div>⭐️⭐️⭐️⭐️⭐️</div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
