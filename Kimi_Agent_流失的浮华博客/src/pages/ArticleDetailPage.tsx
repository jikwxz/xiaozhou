import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { articles } from '@/data/articles';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const article = articles.find((a) => a.id === id);
  const currentIndex = articles.findIndex((a) => a.id === id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [id]);

  if (!article) {
    return (
      <main className="w-full min-h-screen bg-[#0a0a0a] pt-32 md:pt-40">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
          <h1 className="font-serif text-3xl text-[#f4f1ea] mb-4">文章不存在</h1>
          <Link
            to="/articles"
            className="font-mono text-xs text-[#c8a265] tracking-widest border border-[#c8a265]/30 px-6 py-2 rounded-full hover:bg-[#c8a265]/10 transition-all"
          >
            返回归档
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-24 md:pt-32">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]" />
      </div>

      <div ref={contentRef} className="max-w-[800px] mx-auto px-6 md:px-12 pb-32 -mt-20 relative z-10">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#c8a265] tracking-widest uppercase">
              {article.category}
            </span>
            <span className="w-6 h-px bg-[#d5cfc1]/20" />
            <span className="font-mono text-xs text-[#d5cfc1]/50">
              {article.publishedAt}
            </span>
            <span className="w-6 h-px bg-[#d5cfc1]/20" />
            <span className="font-mono text-xs text-[#d5cfc1]/50">
              {article.readTime} min read
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-[#f4f1ea] tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-[#d5cfc1]/40"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-12" />

        {/* Content */}
        <div className="prose-custom">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
              return (
                <blockquote
                  key={index}
                  className="font-serif text-xl md:text-2xl text-[#c8a265] italic leading-relaxed my-8 pl-6 border-l-2 border-[#c8a265]/40"
                >
                  {paragraph}
                </blockquote>
              );
            }
            if (paragraph.startsWith('—')) {
              return (
                <p key={index} className="font-mono text-xs text-[#d5cfc1]/40 tracking-wider my-8">
                  {paragraph}
                </p>
              );
            }
            return (
              <p
                key={index}
                className="font-sans text-base text-[#d5cfc1]/90 leading-[1.9] mb-6"
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-12" />

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {prevArticle ? (
            <button
              onClick={() => navigate(`/articles/${prevArticle.id}`)}
              className="text-left group"
            >
              <span className="font-mono text-xs text-[#d5cfc1]/40 tracking-widest uppercase block mb-2">
                &larr; 上一篇
              </span>
              <span className="font-serif text-lg text-[#f4f1ea] group-hover:text-[#c8a265] transition-colors">
                {prevArticle.title}
              </span>
            </button>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <button
              onClick={() => navigate(`/articles/${nextArticle.id}`)}
              className="text-right group"
            >
              <span className="font-mono text-xs text-[#d5cfc1]/40 tracking-widest uppercase block mb-2">
                下一篇 &rarr;
              </span>
              <span className="font-serif text-lg text-[#f4f1ea] group-hover:text-[#c8a265] transition-colors">
                {nextArticle.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
