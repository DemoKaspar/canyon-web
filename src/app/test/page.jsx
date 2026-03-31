export default function TestPage() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      background: '#0D0D0F',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>Test Page</h1>
      <p>If you can see this, the Next.js app is working correctly.</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  );
}