import FluidDistortion from '@/components/FluidDistortion';
import ArchiveGrid from '@/components/ArchiveGrid';
import PaperMaskWipe from '@/components/PaperMaskWipe';
import GalleryGrid from '@/components/GalleryGrid';
import HomePreview from '@/components/HomePreview';

export default function HomePage() {
  return (
    <main className="w-full">
      <FluidDistortion />
      <ArchiveGrid />
      <PaperMaskWipe />
      <GalleryGrid />
      <HomePreview />
    </main>
  );
}
