import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const BLANK_PIXEL_FALLBACK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export default function QRCodeImage({ text, qrData, className = "w-48 h-48 mx-auto", alt = "QR Code" }) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Use qrData if valid and not the 1x1 blank pixel mock
    if (qrData && qrData.length > 200 && qrData !== BLANK_PIXEL_FALLBACK) {
      setImgSrc(qrData);
      return;
    }

    const content = text || 'https://farmchain.ai/trace';

    QRCode.toDataURL(content, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) {
          setImgSrc(url);
        }
      })
      .catch((err) => {
        console.warn('QRCode library failed, using fallback API:', err);
        if (isMounted) {
          setImgSrc(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(content)}`);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [text, qrData]);

  if (!imgSrc) {
    return (
      <div className={`bg-slate-200 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs rounded-lg ${className}`}>
        Generating...
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        // Fallback to qrserver if local dataUrl image load fails
        const content = text || 'https://farmchain.ai/trace';
        e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(content)}`;
      }}
    />
  );
}
