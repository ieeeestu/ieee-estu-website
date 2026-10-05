'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { FEATURES } from '@/config/features';
import { useTranslations } from 'next-intl';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
  author: string;
  category: string;
  image: string;
  date: string;
  slug: string;
  published: boolean;
}

export default function BlogPage() {
  // Blog kapalıysa sayfa 404 döner (src/config/features.ts)
  if (!FEATURES.blog) notFound();

  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const q = query(
        collection(db, 'blog'),
        where('published', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const blogPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      // Sort by date on client side
      blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setPosts(blogPosts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#00629B]" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {locale === 'tr' ? 'Henüz blog yazısı yok' : 'No blog posts yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="block">
                  <Card
                    className="group hover:shadow-xl transition-all duration-300 rounded-2xl border-0 hover:-translate-y-1 cursor-pointer overflow-hidden h-full"
                  >
                    <div className="relative h-56 w-full">
                      <Image
                        src={post.image || '/placeholder-blog.jpg'}
                        alt={post.title[locale as 'tr' | 'en']}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#00629B]">
                            {post.category}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#00629B] transition-colors">
                        {post.title[locale as 'tr' | 'en']}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt[locale as 'tr' | 'en']}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(post.date)}
                        </div>
                        {post.author && (
                          <span className="text-xs">{post.author}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
