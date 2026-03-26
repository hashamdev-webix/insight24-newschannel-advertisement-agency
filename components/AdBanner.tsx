interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'halfpage' | 'inline';
  label?: string;
}

export default function AdBanner({ size = 'leaderboard', label = 'Advertisement' }: AdBannerProps) {
  const sizeClasses: Record<string, string> = {
    leaderboard: 'w-full h-24 md:h-28',
    rectangle: 'w-full h-64',
    halfpage: 'w-full h-96',
    inline: 'w-full h-20',
  };

  const sizeLabel: Record<string, string> = {
    leaderboard: '970×90 — Leaderboard Banner',
    rectangle: '300×250 — Rectangle Ad',
    halfpage: '300×600 — Half Page Ad',
    inline: '728×90 — Inline Banner',
  };

  return (
    <div className="w-full my-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">{label}</p>
      <div
        className={`${sizeClasses[size]} bg-gradient-to-r from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#dd0000] flex items-center justify-center rounded-sm">
            <span className="text-white text-xs font-black">AD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600 group-hover:text-[#dd0000] transition">
              Your Advertisement Here
            </p>
            <p className="text-xs text-gray-400">{sizeLabel[size]}</p>
          </div>
        </div>
        <p className="text-xs text-[#dd0000] font-semibold hidden md:block">
          Reach 100,000+ daily readers — Advertise with Insight 24
        </p>
      </div>
    </div>
  );
}
