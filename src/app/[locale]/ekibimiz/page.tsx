'use client';

import { useTranslations, useLocale } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { teamMembers } from '@/data/teamMembers';
import { MEMBERSHIP_FORM_URL } from '@/config/links';
import Image from 'next/image';
import Link from 'next/link';
import { buildLocalizedPath, ENGLISH_ROUTES } from '@/i18n/paths';

export default function TeamPage() {
  const t = useTranslations('team');
  const locale = useLocale() as 'tr' | 'en';

  const getBadgeColor = (sectionKey: string) => {
    switch (sectionKey) {
      case 'boardOfDirectors':
        return { backgroundColor: '#00629B', color: 'white' }; // Mavi
      case 'administrativeBoard':
        return { backgroundColor: '#1E3A8A', color: 'white' }; // Koyu Mavi
      case 'auditBoard':
        return { backgroundColor: '#38BDF8', color: 'white' }; // Açık Mavi
      default:
        return { backgroundColor: '#6B7280', color: 'white' };
    }
  };

  // "Orman Emre Işıl" -> "OI"
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toLocaleUpperCase('tr-TR');
  };

  const renderSection = (
    sectionKey: 'boardOfDirectors' | 'administrativeBoard' | 'auditBoard',
    title: string
  ) => {
    const members = teamMembers.filter(
      (member) => member.section === sectionKey
    );

    // Yönetim Kurulu masaüstünde satırda 3 kart (3 + 2). Kapsayıcı daraltılarak
    // kart genişliği diğer kurullardaki (satırda 4) kartlarla aynı tutulur.
    const threePerRow = sectionKey === 'boardOfDirectors';
    const rowClass = threePerRow ? 'lg:w-[calc(75%-0.5rem)] lg:mx-auto' : '';
    const cardWidthClass = threePerRow
      ? 'lg:w-[calc(33.333%-1.334rem)]'
      : 'lg:w-[calc(25%-1.5rem)]';

    return (
      <div key={sectionKey} className="mb-20">
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-12"
          style={{ color: '#00629B' }}
        >
          {title}
        </h3>
        {/* flex + justify-center: yarım kalan satırlar ortalanır */}
        <div className={`flex flex-wrap justify-center gap-8 ${rowClass}`}>
          {members.map((member, index) => {
            const memberData = member[locale];

            return (
              <Card
                key={index}
                className={`w-full md:w-[calc(50%-1rem)] ${cardWidthClass} group hover:shadow-xl dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-all duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:-translate-y-1`}
              >
                <CardContent className="p-6">
                  {/* Profile Image with Professional Frame */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-linear-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 p-1">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={memberData.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        ) : (
                          // Fotoğraf yoksa baş harfler
                          <div
                            className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                            style={{ backgroundColor: '#00629B' }}
                            aria-label={memberData.name}
                          >
                            {getInitials(memberData.name)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {memberData.name}
                    </h3>

                    <Badge
                      className="mb-3 px-3 py-1 rounded-full text-xs font-medium"
                      style={getBadgeColor(sectionKey)}
                    >
                      {memberData.position}
                    </Badge>

                    <p
                      className="text-sm font-medium mb-3"
                      style={{ color: '#00629B' }}
                    >
                      {memberData.department}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

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

          {/* Yönetim Kurulumuz / Board of Directors */}
          {renderSection('boardOfDirectors', t('sections.boardOfDirectors'))}

          {/* İdari Kurulumuz / Administrative Board */}
          {renderSection(
            'administrativeBoard',
            t('sections.administrativeBoard')
          )}

          {/* Denetim Kurulumuz / Audit Board */}
          {renderSection('auditBoard', t('sections.auditBoard'))}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-linear-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t('join')}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('joinDescription')}
              </p>
              <button 
                className="bg-[#00629B] hover:bg-[#004f7c] text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg dark:shadow-[#00629B]/30 dark:hover:shadow-[#00629B]/50 dark:hover:ring-2 dark:hover:ring-[#00629B]/50"
                onClick={() => window.open(MEMBERSHIP_FORM_URL, '_blank')}
              >
                {t('joinButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
