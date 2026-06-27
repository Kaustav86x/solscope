'use client';

import Link from 'next/link';

const STATS = [
  { value: '12K+',  label: 'Active Traders' },
  { value: '$420M+', label: 'Total Volume' },
  { value: '1,000+', label: 'Tokens Listed' },
];

const MOCK_PHONE_TOKENS = [
  { symbol: 'BONK',    mcap: '$2.87M',  change: '+26.68%', emoji: '🐶' },
  { symbol: 'WIF',     mcap: '$228.39K', change: '+754.70%', emoji: '🎩' },
  { symbol: 'POPCAT',  mcap: '$7.80M',  change: '+22.90%', emoji: '🐱' },
  { symbol: 'MOODENG', mcap: '$75.05K', change: '+406.33%', emoji: '🦛' },
  { symbol: 'GOAT',    mcap: '$5.70M',  change: '+0.71%',  emoji: '🐐' },
];

// Inline SVG for Apple logo
function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// Inline SVG for Google Play logo
function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" style={{ color: '#22C55E' }} xmlns="http://www.w3.org/2000/svg">
      <path d="M3.18 23.76c.3.17.65.21.99.11l12.01-6.95-2.54-2.54-10.46 9.38zm-1.46-20.8C1.27 3.4 1 3.93 1 4.58v14.84c0 .65.27 1.18.72 1.62l.09.09 8.31-8.31v-.2L1.81 3.87l-.09.09zm17.7 9.01l-2.37-1.37-2.83 2.83 2.83 2.83 2.4-1.38c.68-.4.68-1.04-.03-1.44v-.47zm-16.24 9.01l10.46-6.04-2.54-2.54-7.92 8.58z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        {/* ── Left: Copy ── */}
        <div>
          {/* Live badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs mb-7"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full pulse-green"
              style={{ backgroundColor: 'var(--color-green)' }}
            />
            Live on Solana
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Trade memecoins.{' '}
            <br />
            <span style={{ color: 'var(--color-green)' }}>Like a chad.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: 'var(--color-muted)' }}
          >
            Buy, sell, and discover the hottest Solana tokens — instantly, from
            your phone or the web. Sign in with Google or Apple. No wallet setup
            needed.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              <AppleLogo />
              App Store
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm border text-white transition-colors"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-green)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <PlayLogo />
              Google Play
            </a>

            <Link
              href="/trade"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black transition-colors"
              style={{ backgroundColor: 'var(--color-green)' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-green-dim)')
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-green)')
              }
            >
              Open Web App →
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 items-center">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {stat.label}
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-8" style={{ backgroundColor: 'var(--color-border)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Phone mockup ── */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative w-[270px] h-[548px] rounded-[44px] border-4 shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: '#2A3347',
              boxShadow: '0 0 80px rgba(34,197,94,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full z-10"
              style={{ backgroundColor: '#0D0F14' }}
            />

            {/* Screen content */}
            <div className="flex flex-col h-full pt-10">
              {/* Status bar */}
              <div
                className="flex justify-between px-5 py-1 text-xs"
                style={{ color: 'var(--color-muted)' }}
              >
                <span>9:41</span>
                <span className="font-medium">●●●</span>
              </div>

              {/* Search bar mock */}
              <div className="px-4 py-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{
                    backgroundColor: 'var(--color-elevated)',
                    color: 'var(--color-dim)',
                  }}
                >
                  <span>🔍</span>
                  <span>Tokens, wallets, #tweets</span>
                </div>
              </div>

              {/* Filter tabs */}
              <div
                className="flex gap-3 px-4 py-2 text-xs"
                style={{ color: 'var(--color-muted)' }}
              >
                <span>⚡ Live</span>
                <span>👥 KOLs</span>
                <span># Memecoin</span>
                <span
                  className="font-semibold"
                  style={{ color: 'var(--color-green)' }}
                >
                  ↑ Trending
                </span>
              </div>

              {/* Token list */}
              <div className="flex-1 overflow-hidden px-4">
                {MOCK_PHONE_TOKENS.map((t) => (
                  <div
                    key={t.symbol}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}
                      >
                        {t.emoji}
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">{t.symbol}</div>
                        <div className="text-xs" style={{ color: 'var(--color-dim)' }}>
                          {t.mcap}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-xs font-semibold"
                        style={{ color: 'var(--color-green)' }}
                      >
                        {t.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div
                className="flex justify-around py-3 border-t mt-auto"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {[
                  { icon: '🏠', label: 'Home', active: true },
                  { icon: '✨', label: 'Memes', active: false },
                  { icon: '🔍', label: 'Discover', active: false },
                  { icon: '👤', label: 'Account', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-0.5"
                    style={{ color: item.active ? 'var(--color-green)' : 'var(--color-dim)' }}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-[9px]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
