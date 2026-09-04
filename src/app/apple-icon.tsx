import { ImageResponse } from 'next/og';
import { site } from '@/config/site';


export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #27272a, #09090b)',
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {site.initials}
          </span>
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '3px solid #000000',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
