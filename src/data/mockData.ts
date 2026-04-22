import { GuestEntry, User } from '@/types/guestbook';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@guestbook.com',
    name: 'Administrator',
    role: 'admin',
  },
];

export const mockEntries: GuestEntry[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    message: 'Terima kasih atas pelayanan yang sangat baik! Semoga semakin sukses kedepannya.',
    organization: 'PT Maju Bersama',
    createdAt: new Date('2024-01-15T10:30:00'),
    isApproved: true,
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    email: 'siti.rahayu@email.com',
    message: 'Kunjungan yang sangat berkesan. Staf sangat ramah dan profesional.',
    organization: 'Universitas Indonesia',
    createdAt: new Date('2024-01-14T14:20:00'),
    isApproved: true,
  },
  {
    id: '3',
    name: 'Ahmad Wijaya',
    email: 'ahmad.w@company.co.id',
    message: 'Fasilitas sangat lengkap dan nyaman. Akan merekomendasikan kepada rekan-rekan.',
    createdAt: new Date('2024-01-13T09:15:00'),
    isApproved: true,
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    message: 'Pengalaman yang luar biasa! Terima kasih atas keramahan tim.',
    organization: 'Freelancer',
    createdAt: new Date('2024-01-12T16:45:00'),
    isApproved: true,
  },
  {
    id: '5',
    name: 'Rudi Hermawan',
    email: 'rudi.h@startup.id',
    message: 'Sangat terkesan dengan inovasi yang ditampilkan. Sukses terus!',
    organization: 'Tech Startup ID',
    createdAt: new Date('2024-01-11T11:00:00'),
    isApproved: false,
  },
];

// Dummy admin credentials
export const ADMIN_CREDENTIALS = {
  email: 'admin@guestbook.com',
  password: 'admin123',
};
