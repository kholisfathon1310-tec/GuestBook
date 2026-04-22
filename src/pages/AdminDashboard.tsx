import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGuestBook } from '@/context/GuestBookContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  LogOut, Check, Trash2, Clock, CheckCircle, Users,
  MessageSquare, BookOpen, Home, Search, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const PAGE_SIZE = 5;

const AdminDashboard = () => {
  const { entries, auth, approveEntry, deleteEntry, logout } = useGuestBook();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/admin/login');
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const handleLogout = () => {
    logout();
    toast({ title: 'Logout Berhasil', description: 'Sampai jumpa kembali!' });
    navigate('/');
  };

  const handleApprove = (id: string, name: string) => {
    approveEntry(id);
    toast({ title: 'Pesan Disetujui', description: `Pesan dari ${name} telah dipublikasikan.` });
  };

  const handleDelete = (id: string, name: string) => {
    deleteEntry(id);
    toast({ title: 'Pesan Dihapus', description: `Pesan dari ${name} telah dihapus.`, variant: 'destructive' });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((e) => {
      if (statusFilter === 'approved' && !e.isApproved) return false;
      if (statusFilter === 'pending' && e.isApproved) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q) ||
        (e.organization?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [entries, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const approvedCount = entries.filter((e) => e.isApproved).length;
  const pendingCount = entries.filter((e) => !e.isApproved).length;

  if (!auth.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="font-display text-xl font-bold text-sidebar-foreground">Buku Tamu</h1>
          <p className="text-sm text-sidebar-foreground/60">Panel Admin</p>
        </div>
        <nav className="space-y-2">
          <div className="px-4 py-3 bg-sidebar-accent rounded-lg text-sidebar-accent-foreground flex items-center gap-3">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Kelola Pesan</span>
          </div>
        </nav>
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Home className="w-5 h-5 mr-3" />Beranda
            </Button>
          </Link>
          <Link to="/guestbook">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <BookOpen className="w-5 h-5 mr-3" />Lihat Buku Tamu
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />Logout
          </Button>
        </div>
      </aside>

      <main className="lg:ml-64">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Dashboard</h2>
              <p className="text-muted-foreground">Selamat datang, {auth.user?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" className="lg:hidden" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card><CardContent className="p-6"><div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-primary" /></div>
              <div><p className="text-sm text-muted-foreground">Total Pesan</p><p className="text-2xl font-bold">{entries.length}</p></div>
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center"><CheckCircle className="w-6 h-6 text-success" /></div>
              <div><p className="text-sm text-muted-foreground">Disetujui</p><p className="text-2xl font-bold">{approvedCount}</p></div>
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-accent" /></div>
              <div><p className="text-sm text-muted-foreground">Menunggu</p><p className="text-2xl font-bold">{pendingCount}</p></div>
            </div></CardContent></Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Daftar Pesan Tamu</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama, email, pesan, atau organisasi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                  <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="approved">Disetujui</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📭</div>
                  <p className="text-muted-foreground">
                    {entries.length === 0 ? 'Belum ada pesan masuk' : 'Tidak ada pesan yang cocok dengan filter'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead className="hidden md:table-cell">Email</TableHead>
                          <TableHead className="hidden lg:table-cell">Pesan</TableHead>
                          <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginated.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{entry.name}</p>
                                {entry.organization && (
                                  <p className="text-sm text-muted-foreground">{entry.organization}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">{entry.email}</TableCell>
                            <TableCell className="hidden lg:table-cell max-w-xs">
                              <p className="truncate text-muted-foreground">{entry.message}</p>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                              {format(entry.createdAt, 'd MMM yyyy', { locale: localeId })}
                            </TableCell>
                            <TableCell>
                              {entry.isApproved ? (
                                <Badge className="bg-success/10 text-success border-success/20">
                                  <CheckCircle className="w-3 h-3 mr-1" />Disetujui
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                                  <Clock className="w-3 h-3 mr-1" />Menunggu
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {!entry.isApproved && (
                                  <Button size="sm" variant="ghost" className="text-success hover:bg-success/10"
                                    onClick={() => handleApprove(entry.id, entry.name)}>
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(entry.id, entry.name)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                    <p className="text-sm text-muted-foreground">
                      Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} pesan
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium px-2">Halaman {currentPage} dari {totalPages}</span>
                      <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
