import { ImageResponse } from 'next/og';
import { site } from '@/config/site';


export const alt = `${site.name} — ${site.headline.line1} ${site.headline.highlight}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          padding: '40px 60px',
        }}
      >
        {/* Subtle emerald radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Monogram Avatar with green status dot */}
        <div
          style={{
            position: 'relative',
            width: '92px',
            height: '92px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #27272a, #09090b)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: '0 0 35px rgba(255,255,255,0.08)',
          }}
        >
          <span
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
            }}
          >
            {site.initials}
          </span>
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '3px solid #000000',
            }}
          />
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}
        >
          {site.name}
        </div>

        {/* Developer Title */}
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.04em',
            marginBottom: '28px',
          }}
        >
          {site.title}
        </div>

        {/* Big Headline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '56px',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '14px',
          }}
        >
          <span style={{ color: '#ffffff', marginRight: '14px' }}>
            {site.headline.line1}
          </span>
          <span
            style={{
              background: 'linear-gradient(90deg, #34d399, #2dd4bf)',
              backgroundClip: 'text',
              color: '#34d399',
            }}
          >
            {site.headline.highlight}
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>

        {/* Domain branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          bio.karanrajkr.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
