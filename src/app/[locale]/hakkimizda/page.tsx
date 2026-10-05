'use client';

import { useTranslations } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, Target, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('about');

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: t('features.innovation.title'),
      description: t('features.innovation.description'),
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('features.community.title'),
      description: t('features.community.description'),
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('features.goalOriented.title'),
      description: t('features.goalOriented.description'),
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: t('features.growth.title'),
      description: t('features.growth.description'),
    },
  ];

  // Parse intro paragraphs from translation
  const introParagraphs = t.raw('intro') as string[];

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {introParagraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl p-6 mt-8">
                <p className="text-primary font-medium mb-2">{t('callout')}</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">{t('president')}:</span> Efe
                    ARAL
                  </p>
                  <p>
                    <span className="font-medium">{t('advisor')}:</span> Prof.
                    Dr. Nuray AT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-shadow duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-970"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4 text-[#00629B] dark:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('mission')}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('missionText')}
              </p>
              <div className="space-y-4">
                {(t.raw('missionPoints') as string[]).map(
                  (point: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: '#00629B' }}
                      />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/20251129_163533.JPEG"
                alt="IEEE ESTU Team"
                width={1080}
                height={720}
                className="rounded-2xl shadow-lg w-full h-auto scale-150"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
