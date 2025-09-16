import Image from 'next/image';

import Button from '@/components/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-14b4e5b4e4c3?auto=format&fit=crop&w=1920&q=80"
          alt="Pacific Northwest mountain landscape"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/80 via-forest/60 to-lake-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-lake/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-moss/30 rounded-full blur-lg animate-pulse delay-500" />

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium">Superhost • Under 1hr Response</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="block bg-gradient-to-r from-white via-cream to-accent-light bg-clip-text text-transparent">
            Boutique
          </span>
          <span className="block bg-gradient-to-r from-accent-light via-white to-lake-light bg-clip-text text-transparent">
            Airbnb Management
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-light mb-4 max-w-2xl mx-auto leading-relaxed">
          That feels <span className="text-accent font-semibold">hands-off</span> and pays off
        </p>
        <p className="text-lg text-slate-light/80 mb-12">Serving Western Washington</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            href="#contact"
            variant="primary"
            className="text-lg px-8 py-4 shadow-glow hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            Get a Free Property Review
          </Button>
          <Button
            href="#how"
            variant="secondary"
            className="text-lg px-8 py-4 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
          >
            See How It Works
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">⭐</div>
            <div className="font-semibold text-sm">Superhost Status</div>
            <div className="text-xs text-slate-light">Consistently maintained</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-sm">Under 1 Hour</div>
            <div className="text-xs text-slate-light">Average response time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">📍</div>
            <div className="font-semibold text-sm">Western WA</div>
            <div className="text-xs text-slate-light">Local expertise</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
