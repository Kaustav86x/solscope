'use client';

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.18 23.76c.3.17.65.21.99.11l12.01-6.95-2.54-2.54-10.46 9.38zm-1.46-20.8C1.27 3.4 1 3.93 1 4.58v14.84c0 .65.27 1.18.72 1.62l.09.09 8.31-8.31v-.2L1.81 3.87l-.09.09zm17.7 9.01l-2.37-1.37-2.83 2.83 2.83 2.83 2.4-1.38c.68-.4.68-1.04-.03-1.44v-.47zm-16.24 9.01l10.46-6.04-2.54-2.54-7.92 8.58z" />
    </svg>
  );
}

export default function AppDownload() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background:
              'linear-gradient(135deg, #00C8FF 0%, #0084FF 55%, #22C55E 100%)',
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
              Get the ChadWallet app
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-sm mx-auto">
              Available free on iOS and Android. No wallet setup. Trade in under
              60 seconds.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              {/* App Store */}
              <a
                href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-900 transition-colors"
              >
                <AppleLogo />
                <div className="text-left">
                  <div className="text-xs text-white/70">Download on the</div>
                  <div className="text-base font-black leading-tight">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-900 transition-colors"
              >
                <PlayLogo />
                <div className="text-left">
                  <div className="text-xs text-white/70">Get it on</div>
                  <div className="text-base font-black leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
