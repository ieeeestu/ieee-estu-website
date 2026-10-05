'use client';

export const dynamic = 'force-dynamic';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FEATURES } from '@/config/features';

export default function AdminDashboard() {
  const quickLinks = [
    {
      title: 'Etkinlikler',
      href: '/admin/events',
      icon: Calendar,
      description: 'Etkinlikleri yönetin',
      color: 'text-blue-600',
    },
    ...(FEATURES.blog
      ? [
          {
            title: 'Blog',
            href: '/admin/blog',
            icon: FileText,
            description: 'Blog yazılarını yönetin',
            color: 'text-green-600',
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Paneli</h1>
        <p className="text-muted-foreground">
          IEEE ESTU Web Sitesi Yönetim Paneline Hoş Geldiniz
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-8 w-8 ${link.color}`} />
                    <div>
                      <CardTitle>{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hızlı Bilgiler</CardTitle>
          <CardDescription>
            Admin paneli özellikleri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm">
              • Etkinlik ekleme, düzenleme ve silme
            </li>
            <li className="text-sm">
              • Blog yazısı oluşturma ve silme
            </li>
            <li className="text-sm">
              • Görseller GitHub repository&apos;ye otomatik yüklenir
            </li>
            <li className="text-sm">
              • Çift dil desteği (Türkçe/İngilizce)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
