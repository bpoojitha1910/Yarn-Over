import { useEffect, useState } from 'react';

export default function Home({ onNavigate, user, handleLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#FAF4EB';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const links = [
    ['Our Collections', 'collections'],
    ['Custom Orders', 'custom-orders'],
    ['Reviews', 'reviews'],
    ['🛒 Cart', 'cart'],
  ];

  return (
    <main className="home-page">
      <section className="home-content" aria-label="Yarn Over home">
        <div className="home-copy">
          <h1>Yarn Over</h1>
          <p>Where Every Stitch Tells a Story.</p>
        </div>

        <nav className="home-nav" aria-label="Main navigation">
          <div className="account-menu">
            {user ? (
              <>
                <button className="home-nav-button" onClick={() => setShowMenu((open) => !open)}>
                  👤 My Account <span aria-hidden="true">▾</span>
                </button>
                {showMenu && (
                  <div className="account-dropdown">
                    <button onClick={() => { setShowMenu(false); onNavigate('myorders'); }}>📦 My Orders</button>
                    <button onClick={() => { setShowMenu(false); handleLogout(); }}>🚪 Logout</button>
                  </div>
                )}
              </>
            ) : (
              <button className="home-nav-button" onClick={() => onNavigate('login')}>Login</button>
            )}
          </div>
          {links.map(([label, page]) => (
            <button className="home-nav-button" key={page} onClick={() => onNavigate(page)}>{label}</button>
          ))}
        </nav>
      </section>

      <a className="instagram-link" href="https://instagram.com" target="_blank" rel="noreferrer">
        our instagram handle: @__yarn_over__
      </a>

      <style>{`
        .home-page {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          background: #FAF4EB url('/YarnOver1.png') center / cover no-repeat;
          color: #1A1A1A;
          font-family: 'Playfair Display', Georgia, serif;
        }
        .home-content {
          width: min(76vw, 1080px);
          min-height: 100vh;
          min-height: 100dvh;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(10rem, 27vh, 18rem) 1.5rem 8rem;
        }
        .home-copy { text-align: center; color: #CB6565; }
        .home-copy h1 {
          margin: 0;
          font-size: clamp(2.75rem, 5vw, 4.6rem);
          line-height: 1.05;
          letter-spacing: .04em;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 800;
          text-transform: uppercase;
        }
        .home-copy p {
          margin: .6rem 0 0;
          font-size: clamp(1.4rem, 2.2vw, 2.1rem);
          font-weight: 500;
          font-style: normal;
          line-height: 1.45;
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
        }
        .home-nav {
          width: min(100%, 1000px);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: .75rem clamp(1rem, 2.5vw, 2.75rem);
          margin-top: clamp(2rem, 7vh, 4.5rem);
        }
        .home-nav-button {
          padding: .75rem 1.25rem;
          border: 1px solid rgba(203, 101, 101, 0.25);
          background: rgba(255, 255, 255, 0.82);
          color: #1A1A1A;
          font: 700 clamp(0.98rem, 1.4vw, 1.35rem) / 1.2 'Playfair Display', Georgia, serif;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: transform .2s ease, color .2s ease, background-color .2s ease;
        }
        .home-nav-button:hover, .home-nav-button:focus-visible { color: #CB6565; }
        .account-menu { position: relative; }
        .account-dropdown {
          position: absolute;
          top: calc(100% + .5rem);
          left: 50%;
          z-index: 2;
          width: 12rem;
          padding: .45rem;
          border-radius: .75rem;
          background: #fff;
          box-shadow: 0 .5rem 1.25rem rgba(0, 0, 0, .15);
          transform: translateX(-50%);
        }
        .account-dropdown button {
          width: 100%;
          padding: .55rem;
          border: 0;
          background: transparent;
          color: #CB6565;
          text-align: left;
          font: 600 1.1rem 'Playfair Display', Georgia, serif;
          cursor: pointer;
        }
        .account-dropdown button:hover, .account-dropdown button:focus-visible { background: #FAF4EB; }
        .instagram-link {
          position: absolute;
          right: clamp(1rem, 4vw, 4rem);
          bottom: clamp(1rem, 5vh, 3.5rem);
          color: #CB6565;
          font: 700 clamp(.9rem, 1.5vw, 1.35rem) 'Playfair Display', Georgia, serif;
          text-decoration: none;
        }
        .instagram-link:hover, .instagram-link:focus-visible { text-decoration: underline; }
        @media (max-width: 767px) {
          .home-page { overflow-y: auto; background-position: center; }
          .home-content { width: 100%; min-height: 100dvh; padding: 13rem 1.25rem 7rem; justify-content: flex-start; }
          .home-nav { flex-direction: column; margin-top: 2rem; gap: .6rem; }
          .instagram-link { left: 1rem; right: 1rem; text-align: center; }
        }
      `}</style>
    </main>
  );
}
