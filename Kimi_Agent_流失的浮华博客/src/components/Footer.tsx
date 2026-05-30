import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-2xl text-[#f4f1ea] tracking-tight">
              流失的浮华
            </Link>
            <p className="font-sans text-sm text-[#d5cfc1] mt-4 leading-relaxed max-w-xs">
              一个面向深度阅读与静谧思考的独立个人博客。在喧嚣的世界里，为你留一盏灯。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-[#c8a265] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">首页</Link>
              <Link to="/articles" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">归档</Link>
              <Link to="/photos" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">影像</Link>
              <Link to="/music" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">音乐</Link>
              <Link to="/movies" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">影视</Link>
              <Link to="/about" className="font-sans text-sm text-[#d5cfc1] hover:text-[#f4f1ea] transition-colors">关于</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-[#c8a265] uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <span className="font-sans text-sm text-[#d5cfc1]">jikwxz@outlook.com</span>
              <span className="font-sans text-sm text-[#d5cfc1]">微博 @流失的浮华</span>
              <span className="font-sans text-sm text-[#d5cfc1]">jikwang@126.com</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#d5cfc1]/50">
            &copy; 2024 流失的浮华. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#d5cfc1]/50">
            Designed with silence &amp; light.
          </p>
        </div>
      </div>
    </footer>
  );
}
