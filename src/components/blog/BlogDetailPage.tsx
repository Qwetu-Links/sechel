import React from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { language, blogPosts, selectedArticleId, setCurrentPage, navigateToArticle } = useApp();

  const post = blogPosts.find((p) => p.id === selectedArticleId) || blogPosts[0];

  if (!post) return null;

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-28 pb-20 bg-slate-50">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Article Header Card (WordPress Single Post Header) */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {post.title[language]}
          </h1>

          <div className="wp-divider" />

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic border-l-4 border-blue-600 pl-4 py-1">
            {post.excerpt[language]}
          </p>

          {/* Author info */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">{post.author.name}</strong>
                <span className="text-[11px] text-slate-500">{post.author.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-200 shadow-md bg-slate-950">
          <img
            src={post.coverImage}
            alt={post.title[language]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content (WordPress Gutenberg Content Typography) */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-12 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
          {post.content[language].split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={pIdx} className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 pt-6 border-b border-slate-100 pb-2">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={pIdx} className="space-y-2 list-disc list-inside text-xs sm:text-sm text-slate-700 pl-2">
                  {items.map((it, iIdx) => (
                    <li key={iIdx}>{it.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            );
          })}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Tags :</span>
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-serif-display text-xl font-bold text-slate-900">
              {language === 'fr' ? 'À Lire Également' : 'Recommended Insights'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  onClick={() => navigateToArticle(rPost.id)}
                  className="cursor-pointer p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <img
                    src={rPost.coverImage}
                    alt={rPost.title[language]}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-blue-600 uppercase block mb-0.5">
                      {rPost.category}
                    </span>
                    <h4 className="font-serif-display font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {rPost.title[language]}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
