import Section from './ui/Section';

interface Testimonial {
  id: string;
  quote: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  className?: string;
}

export default function TestimonialsSection({ testimonials, className }: TestimonialsSectionProps) {
  return (
    <Section id="faqs" className={`bg-sand py-20${className ? ` ${className}` : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-10">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="bg-white p-6 rounded shadow">
              <p className="text-slate mb-2">{testimonial.quote}</p>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
}
