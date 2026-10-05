export interface TeamMemberData {
  tr: {
    name: string;
    position: string;
    department: string;
  };
  en: {
    name: string;
    position: string;
    department: string;
  };
  // Fotoğraf yoksa kartta baş harfler gösterilir. Fotoğrafı public/images/ içine koyup yolunu yazın.
  image?: string;
  section: 'boardOfDirectors' | 'administrativeBoard' | 'auditBoard';
}

export const teamMembers: TeamMemberData[] = [
  // Yönetim Kurulumuz (5 kişi)
  {
    tr: {
      name: 'Efe Aral',
      position: 'Başkan',
      department: 'Uçak Mühendisliği',
    },
    en: {
      name: 'Efe Aral',
      position: 'Chair',
      department: 'Aircraft Engineering',
    },
    image: '/images/efe-aral.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Ahmet Kaan Can',
      position: 'Başkan Yardımcısı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Ahmet Kaan Can',
      position: 'Vice Chair',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ahmet-kaan-can.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Efe Yerli',
      position: 'Genel Sekreter',
      department: 'Kimya Mühendisliği',
    },
    en: {
      name: 'Efe Yerli',
      position: 'General Secretary',
      department: 'Chemical Engineering',
    },
    image: '/images/efe-yerli.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Ali Karasalih',
      position: 'Sponsorluk Sorumlusu',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Ali Karasalih',
      position: 'Sponsorship Officer',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ali-karasalih.jpg',
    section: 'boardOfDirectors',
  },
  {
    tr: {
      name: 'Damla Baran',
      position: 'Sayman',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Damla Baran',
      position: 'Treasurer',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/damla-baran.jpg',
    section: 'boardOfDirectors',
  },
  // İdari Kurulumuz (6 kişi - Komite Başkanları ve Koordinatörler)
  {
    tr: {
      name: 'Orman Emre Işıl',
      position: 'AESS Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Orman Emre Işıl',
      position: 'AESS President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/emre-isil.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Ayberk Arıcı',
      position: 'ComSoc Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Ayberk Arıcı',
      position: 'ComSoc President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ayberk-arici.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'İsmail Deniz Çamursoy',
      position: 'PES Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'İsmail Deniz Çamursoy',
      position: 'PES President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ismail-deniz-camursoy.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Derin Eker',
      position: 'WIE Başkanı',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Derin Eker',
      position: 'WIE President',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/derin-eker.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Emre Duman',
      position: 'KÖK Koordinatörü',
      department: 'Kimya',
    },
    en: {
      name: 'Emre Duman',
      position: 'KÖK Coordinator',
      department: 'Chemistry',
    },
    image: '/images/emre-duman.jpg',
    section: 'administrativeBoard',
  },
  {
    tr: {
      name: 'Ege Öksüm',
      position: 'PR Koordinatörü',
      department: 'Dijital Oyun Tasarımı',
    },
    en: {
      name: 'Ege Öksüm',
      position: 'PR Coordinator',
      department: 'Digital Game Design',
    },
    image: '/images/ege-oksum.jpg',
    section: 'administrativeBoard',
  },
  // Denetim Kurulumuz (2 kişi)
  {
    tr: {
      name: 'Hüseyin Özçınar',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Hüseyin Özçınar',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/ho.jpg',
    section: 'auditBoard',
  },
  {
    tr: {
      name: 'Sıla Alhan',
      position: 'Denetim Kurulu Üyesi',
      department: 'Elektrik & Elektronik Mühendisliği',
    },
    en: {
      name: 'Sıla Alhan',
      position: 'Audit Board Member',
      department: 'Electrical & Electronics Engineering',
    },
    image: '/images/sa.jpeg',
    section: 'auditBoard',
  },
];
