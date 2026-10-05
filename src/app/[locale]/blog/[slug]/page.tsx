'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { FEATURES } from '@/config/features';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SiteLayout } from '@/components/layout/SiteLayout';

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

export default function BlogDetailPage() {
  // Blog kapalıysa sayfa 404 döner (src/config/features.ts)
  if (!FEATURES.blog) notFound();

  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      const q = query(
        collection(db, 'blog'),
        where('slug', '==', slug),
        where('published', '==', true)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setPost({
          id: docData.id,
          ...docData.data(),
        } as BlogPost);
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const backPath = locale === 'tr' ? '/tr/blog' : '/en/blog';

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#00629B]" />
        </div>
      </SiteLayout>
    );
  }

  if (!post) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'tr' ? 'Blog Yazısı Bulunamadı' : 'Blog Post Not Found'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'tr' 
              ? 'Aradığınız blog yazısı bulunamadı.' 
              : 'The blog post you are looking for could not be found.'}
          </p>
          <Link href={backPath} className="inline-flex items-center mt-4 text-[#00629B] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === 'tr' ? 'Bloga Dön' : 'Back to Blog'}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={backPath} className="inline-flex items-center text-sm text-muted-foreground hover:text-[#00629B] mb-6 md:mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === 'tr' ? 'Bloga Dön' : 'Back to Blog'}
          </Link>
          
          <article className="max-w-4xl mx-auto bg-white dark:bg-slate-950 rounded-2xl shadow-sm p-6 sm:p-8 md:p-12">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4">
                <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                {post.category && (
                  <>
                    <span>•</span>
                    <span>{post.category}</span>
                  </>
                )}
                {post.author && (
                  <>
                    <span>•</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.title[locale as 'tr' | 'en']}
              </h1>
              {post.excerpt[locale as 'tr' | 'en'] && (
                <p className="text-base md:text-xl text-muted-foreground">
                  {post.excerpt[locale as 'tr' | 'en']}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] mb-6 md:mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title[locale as 'tr' | 'en']}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-[#00629B] prose-img:rounded-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      className="rounded-lg w-full h-auto"
                      loading="lazy"
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00629B] hover:underline"
                    />
                  ),
                }}
              >
                {post.content[locale as 'tr' | 'en']}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
