import TokenBanner from '@/components/landing/TokenBanner';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import AppDownload from '@/components/landing/AppDownload';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Top spacer for fixed navbar (72px height) */}
      <div className="pt-[72px]">
        {/* Top scrolling ticker */}
        <TokenBanner direction="left" />

        {/* Hero */}
        <Hero />

        {/* Feature cards */}
        <Features />

        {/* App download CTA */}
        <AppDownload />

        {/* Bottom scrolling ticker */}
        <TokenBanner direction="right" />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
