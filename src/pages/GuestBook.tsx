import { useState } from 'react';
import { FloatingThemeToggle } from '@/components/FloatingThemeToggle';
import { Link } from 'react-router-dom';
import { useGuestBook } from '@/context/GuestBookContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus, User, Building2, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const GuestBook = () => {
  const { entries } = useGuestBook();
  const approvedEntries = entries.filter((e) => e.isApproved);

  return (
    <div className="min-h-screen bg-background">
      <FloatingThemeToggle />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
          <h1 className="font-display text-xl font-semibold">Buku Tamu</h1>
          <Link to="/guestbook/add">
            <Button className="gradient-warm text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Tulis Pesan
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {approvedEntries.length} Pesan Tamu
            </span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
            Pesan dari Para Tamu
          </h2>
        </div>

        {/* Entries Grid */}
        {approvedEntries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-display text-xl font-semibold mb-2">Belum Ada Pesan</h3>
            <p className="text-muted-foreground mb-6">Jadilah yang pertama meninggalkan pesan!</p>
            <Link to="/guestbook/add">
              <Button className="gradient-warm text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Tulis Pesan Pertama
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedEntries.map((entry, index) => (
              <Card
                key={entry.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Message */}
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{entry.message}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <User className="w-4 h-4 text-primary" />
                    {entry.name}
                  </div>
                  {entry.organization && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Building2 className="w-4 h-4" />
                      {entry.organization}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {format(entry.createdAt, 'd MMMM yyyy', { locale: id })}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GuestBook;
