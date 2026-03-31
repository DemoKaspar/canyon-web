export const metadata = {
  title: "Canyon | Enterprise AI Production Platform",
  description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  openGraph: {
    title: "Canyon | Enterprise AI Production Platform",
    description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  },
};

export default function Page() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      background: '#0D0D0F',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>Canyon Web</h1>
      <p>Welcome to Canyon - Enterprise AI Production Platform</p>
      <p>Certified data. Governed access. Deployed to your infrastructure.</p>
      <div style={{ marginTop: '40px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>Status: Under Development</h2>
        <p>This site is not indexed by search engines.</p>
      </div>
      <p style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>
        Deployment test successful - {new Date().toISOString()}
      </p>
    </div>
  );
}
