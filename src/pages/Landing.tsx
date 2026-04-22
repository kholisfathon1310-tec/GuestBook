import { Link } from 'react-router-dom';
import { FloatingThemeToggle } from '@/components/FloatingThemeToggle';
import { Button } from '@/components/ui/button';
import { BookOpen, UserCog, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingThemeToggle />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Selamat Datang</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
              Buku Tamu
              <span className="block text-gradient mt-2">Digital Modern</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Tinggalkan kesan dan pesan Anda. Setiap kunjungan berarti bagi kami.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/guestbook">
                <Button size="lg" className="gradient-warm text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lihat Buku Tamu
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="lg" className="border-2 px-8 py-6 text-lg hover:bg-secondary">
                  <UserCog className="w-5 h-5 mr-2" />
                  Login Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '✨',
              title: 'Mudah Digunakan',
              description: 'Antarmuka yang intuitif dan ramah pengguna untuk semua kalangan.',
            },
            {
              icon: '🔒',
              title: 'Aman & Terpercaya',
              description: 'Data tamu tersimpan dengan aman dan terkelola dengan baik.',
            },
            {
              icon: '📱',
              title: 'Responsif',
              description: 'Tampilan optimal di semua perangkat, desktop hingga mobile.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Buku Tamu Digital. Dibuat dengan ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
