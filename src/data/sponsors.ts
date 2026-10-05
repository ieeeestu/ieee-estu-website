export interface SponsorData {
  key: string;
  name: { tr: string; en: string };
  // Logo yoksa kartta şirket adı gösterilir. Logoyu public/images/sponsors/ içine koyup yolunu yazın.
  logo?: string;
  // false olan sponsorlar sitede gösterilmez.
  active: boolean;
}

export const sponsors: SponsorData[] = [
  {
    key: 'cimsa',
    name: { tr: 'Çimsa', en: 'Çimsa' },
    logo: '/images/sponsors/cimsa.png',
    active: true,
  },
  {
    key: 'emo-eskisehir',
    name: {
      tr: 'EMO Eskişehir Şubesi',
      en: 'EMO Eskişehir Branch',
    },
    logo: '/images/sponsors/emo-eskisehir.png',
    active: true,
  },
];
