'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type DbPlacement = 'top-banner' | 'sidebar' | 'inline' | 'homepage-featured';

interface AdBannerProps {
  placement: DbPlacement;
  className?: string;
}

interface Ad {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  placement: DbPlacement;
}

const heightClass: Record<DbPlacement, string> = {
  'top-banner': 'h-24 md:h-28',
  'sidebar': 'h-64',
  'inline': 'h-20 md:h-24',
  'homepage-featured': 'h-24 md:h-32',
};

async function trackImpression(id: string) {
  try { await fetch(`/api/ads/${id}/impression`, { method: 'POST' }); } catch {}
}

async function trackClick(id: string) {
  try { await fetch(`/api/ads/${id}/click`, { method: 'POST' }); } catch {}
}

export default function AdBanner({ placement, className = '' }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ads?placement=${placement}`)
      .then(r => r.json())
      .then(d => {
        const ads: Ad[] = d.ads || [];
        if (ads.length > 0) {
          const picked = ads[Math.floor(Math.random() * ads.length)];
          setAd(picked);
          trackImpression(picked._id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [placement]);

  if (loading) {
    return (
      <div className={`w-full my-4 ${className}`}>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
        <div className={`${heightClass[placement]} w-full bg-gray-100 animate-pulse`} />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className={`w-full my-4 ${className}`}>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
        <div className={`${heightClass[placement]} bg-gradient-to-r from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 group`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#dd0000] flex items-center justify-center rounded-sm">
              <span className="text-white text-xs font-black">AD</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Your Advertisement Here</p>
              <p className="text-xs text-gray-400 capitalize">{placement.replace('-', ' ')}</p>
            </div>
          </div>
          <Link href="/advertise" className="text-xs text-[#dd0000] font-semibold hover:underline hidden md:block">
            Advertise with Insight 24 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full my-4 ${className}`}>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => trackClick(ad._id)}
        className={`block relative ${heightClass[placement]} w-full overflow-hidden group`}
        title={ad.title}
      >
        <Image
          src={ad.imageUrl}
          alt={ad.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />
      </a>
    </div>
  );
}
