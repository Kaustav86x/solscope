'use client';

const FEATURES = [
  {
    icon: '⚡',
    tag: 'Powered by Jupiter',
    title: 'Instant swaps',
    description:
      'Buy and sell any Solana token in under 3 seconds. Jupiter routing finds you the best price across every DEX — automatically.',
  },
  {
    icon: '👁',
    tag: 'Live tracking',
    title: 'Follow KOL traders',
    description:
      'Track the wallets of the sharpest memecoin traders in real time. See every move they make — and act on it before the crowd.',
  },
  {
    icon: '🐦',
    tag: 'Exclusive to ChadWallet',
    title: 'Launch from a tweet',
    description:
      'Spot a hot tweet about a new token? Trade it directly from the ChadWallet app. No copy-pasting, no tab switching.',
  },
  {
    icon: '🔐',
    tag: 'Privy-secured',
    title: 'Your keys. Always.',
    description:
      'Sign in with Google or Apple — ChadWallet creates a non-custodial embedded wallet automatically. We never hold your funds.',
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
            Built different
          </h2>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--color-muted)' }}>
            Professional-grade tools. Mobile-first speed. No crypto experience needed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 border transition-all group"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(34,197,94,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'var(--color-border)';
              }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>

              <div
                className="inline-block text-xs px-2.5 py-0.5 rounded-full mb-3 font-medium"
                style={{
                  color: 'var(--color-green)',
                  backgroundColor: 'rgba(34,197,94,0.1)',
                }}
              >
                {f.tag}
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
