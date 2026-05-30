import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import PhotosPage from '@/pages/PhotosPage';
import MusicPage from '@/pages/MusicPage';
import MoviesPage from '@/pages/MoviesPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f1ea]">
      <CustomCursor />
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
