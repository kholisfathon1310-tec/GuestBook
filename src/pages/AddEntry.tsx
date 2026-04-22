import { useState } from 'react';
import { FloatingThemeToggle } from '@/components/FloatingThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useGuestBook } from '@/context/GuestBookContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddEntry = () => {
  const { addEntry } = useGuestBook();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: 'Data tidak lengkap',
        description: 'Mohon lengkapi semua field yang wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    addEntry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      organization: formData.organization.trim() || undefined,
      message: formData.message.trim(),
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <FloatingThemeToggle />
        <Card className="max-w-md w-full text-center animate-scale-in">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Terima Kasih!</h2>
            <p className="text-muted-foreground mb-8">
              Pesan Anda telah berhasil dikirim dan sedang menunggu persetujuan admin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/guestbook">
                <Button variant="outline" className="w-full sm:w-auto">
                  Lihat Buku Tamu
                </Button>
              </Link>
              <Link to="/">
                <Button className="gradient-warm text-primary-foreground w-full sm:w-auto">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/guestbook" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Buku Tamu</span>
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <Card className="animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="font-display text-2xl lg:text-3xl">Tulis Pesan Anda</CardTitle>
              <CardDescription>
                Bagikan kesan dan pesan Anda. Kami sangat menghargai setiap masukan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organisasi / Instansi (opsional)</Label>
                  <Input
                    id="organization"
                    placeholder="Nama perusahaan atau instansi"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan atau kesan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] resize-none"
                  />
                </div>

                <Button type="submit" className="w-full gradient-warm text-primary-foreground h-12 text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddEntry;
