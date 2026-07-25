import { useState, useEffect } from 'react';

export default function Home({ onNavigate }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    document.body.style.backgroundColor = '#FAF4EB';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    const root = document.getElementById('root');
    if (root) {
      root.style.maxWidth = '100%';
      root.style.width = '100vw';
      root.style.margin = '0';
      root.style.padding = '0';
    }

    function handleResize() {
      const scaleX = window.innerWidth / 1440;
      const scaleY = window.innerHeight / 1024;
      setScale(Math.min(scaleX, scaleY));
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        backgroundColor: '#FAF4EB',
      }}
    >
      <img
        src="/YarnOver1.png"
        alt="Yarn Over Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '1440px',
            height: '1024px',
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            flexShrink: 0,
            fontFamily: "'Playfair Display', serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '1000px',
              marginTop: '180px',
            }}
          >
            <h1
              style={{
                fontSize: '90px',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: '#CB6565',
                margin: '10px 0 10px 70px',
                lineHeight: 1.4,
                letterSpacing: '4px',
                position: 'relative',
              }}
            >
              Yarn Over
            </h1>

            <p
              style={{
                fontSize: '45px',
                fontWeight: 600,
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                color: '#CB6565',
                margin: '0 0 60px 80px',
              }}
            >
              Where Every Stitch Tells a Story.
            </p>

            <div
              style={{
                width: '100%',
                maxWidth: '700px',
                display: 'flex',
                gap: '100px',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: '20px',
                paddingRight: '80px',
              }}
            >
              {[
                ['login', 'login'],
                ['our collections', 'collections'],
                ['custom orders', 'custom-orders'],
                ['reviews', 'reviews'],
                ['🛒 cart', 'cart'],
                ['my orders', 'myorders'],
              ].map(([label, page]) => (
                <button
                  key={page}
                  onClick={() => onNavigate?.(page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1A1A1A',
                    fontSize: '29px',
                    fontWeight: 650,
                    fontFamily: "'Playfair Display', serif",
                    cursor: 'pointer',
                    padding: '8px 12px',
                    transition: 'color 0.2s ease',
                    marginRight: '-100px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#CB6565')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#1A1A1A')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{
              position: 'absolute',
              right:'-29px',
              bottom: '90px',
              top: 'auto',
              fontSize: '26px',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: '#CB6565',
              textDecoration: 'none',
              cursor: 'pointer',
            
            }}
          >
            our instagram handle:@__yarn_over__
          </a>
        </div>
      </div>
    </div>
  );
}