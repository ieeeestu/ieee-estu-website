'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Handshake, Mail } from 'lucide-react';
import { sponsors } from '@/data/sponsors';

export default function SponsorsPage() {
  const t = useTranslations('sponsors');
  const locale = useLocale() as 'tr' | 'en';
  const activeSponsors = sponsors.filter((sponsor) => sponsor.active);

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {activeSponsors.length > 0 ? (
            /* Sponsors */
            <div className="mb-16">
              <h3
                className="text-2xl md:text-3xl font-bold text-center mb-10"
                style={{ color: '#00629B' }}
              >
                {t('ourSponsors')}
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {activeSponsors.map((sponsor) => (
                  <Card
                    key={sponsor.key}
                    className="w-full sm:w-80 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:shadow-xl dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                      {/* Logo alanı karanlık modda da beyaz: koyu renkli logolar kaybolmasın */}
                      <div className="h-32 w-full rounded-xl bg-white flex items-center justify-center p-5 mb-4">
                        {sponsor.logo ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name[locale]}
                              fill
                              sizes="320px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          // Logo yoksa şirket adı
                          <span
                            className="text-2xl font-bold"
                            style={{ color: '#00629B' }}
                          >
                            {sponsor.name[locale]}
                          </span>
                        )}
                      </div>
                      {sponsor.logo && (
                        <p className="font-semibold text-primary">
                          {sponsor.name[locale]}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            /* Coming Soon Placeholder */
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-950">
                <CardContent className="p-12">
                  <div className="w-20 h-20 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6">
                    <Building2 className="h-10 w-10 text-[#00629B] dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {t('comingSoon')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('comingSoonDescription')}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Partnership CTA */}
          <Card
            className="rounded-2xl border-0 overflow-hidden max-w-3xl mx-auto"
            style={{
              background:
                'linear-gradient(135deg, #00629B 0%, #004f7c 100%)',
            }}
          >
            <CardContent className="p-12 text-center relative">
              {/* Decorative circles */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Handshake className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('partnershipTitle')}
                </h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  {t('partnershipDescription')}
                </p>

                <a
                  href="mailto:ieee.estu@gmail.com"
                  className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-[#00629B] rounded-xl font-medium shadow-lg transition-all duration-200"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t('contactUs')}
                </a>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {t('benefits.count1')}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {t('benefits.label1')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {t('benefits.count2')}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {t('benefits.label2')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {t('benefits.count3')}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {t('benefits.label3')}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
