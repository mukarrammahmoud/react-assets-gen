import { Assets } from '@/generated/assets';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src={Assets.images.logo} alt="Logo" className="logo" />
        <h1>React Assets Generator</h1>
        <p className="subtitle">Type-safe asset imports for React projects</p>
      </header>

      <main className="main">
        <section className="demo-section">
          <h2>✨ Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Type-Safe</h3>
              <p>Strongly-typed TypeScript definitions for all assets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Watch Mode</h3>
              <p>Automatically regenerate on file changes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Nested Structure</h3>
              <p>Maintains your folder hierarchy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>SVG Support</h3>
              <p>Optional React component exports</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>📦 Asset Examples</h2>
          <div className="assets-demo">
            <div className="asset-item">
              <h3>Images</h3>
              <div className="asset-preview">
                <img src={Assets.images.logo} alt="Logo" className="demo-image" />
              </div>
              <code>Assets.images.logo</code>
            </div>

            <div className="asset-item">
              <h3>SVG Icons (as paths)</h3>
              <div className="asset-preview icon-grid">
                <img src={Assets.icons.close} alt="Close" className="icon" />
                <img src={Assets.icons.menu} alt="Menu" className="icon" />
                <img src={Assets.icons.info} alt="Info" className="icon" />
              </div>
              <code>Assets.icons.close</code>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>🚀 Quick Start</h2>
          <div className="code-block">
            <pre><code>{`# Install dependencies
cd cli && npm install && npm run build

# Generate assets
node cli/dist/index.js

# Watch mode
node cli/dist/index.js --watch

# Use in your React app
import { Assets } from '@/generated/assets';

<img src={Assets.images.logo} alt="Logo" />`}</code></pre>
          </div>
        </section>

        <section className="demo-section">
          <h2>📖 Generated Assets</h2>
          <div className="code-block">
            <pre><code>{`export interface AssetsType {
  readonly icons: {
    readonly close: string;
    readonly info: string;
    readonly menu: string;
  };
  readonly images: {
    readonly logo: string;
  };
}

export const Assets: AssetsType = {
  icons: {
    close: '../../assets/icons/close.svg',
    info: '../../assets/icons/info.svg',
    menu: '../../assets/icons/menu.svg',
  },
  images: {
    logo: '../../assets/images/logo.png',
  },
} as const;`}</code></pre>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ for the React community</p>
      </footer>
    </div>
  );
}

export default App;
