import Image from "next/image";
import styles from "./page.module.css";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

// Helper to get NEXT_PUBLIC_ env vars (only available at build time)
const getPublicEnvVars = () => {
  const env: Record<string, string> = {};
  for (const key in process.env) {
    if (key.startsWith("NEXT_PUBLIC_")) {
      env[key] = process.env[key] as string;
    }
  }
  return env;
};

export default async function Home() {
  // Get request headers (works in server components)
  const hdrs = await headers();
  const host = hdrs.get("host") || "Unknown";
  const forwardedFor = hdrs.get("x-forwarded-for") || "Unknown";
  const forwardedProto = hdrs.get("x-forwarded-proto") || "Unknown";
  const realIp = hdrs.get("x-real-ip") || "Unknown";

  // Azure App Service env vars (will be undefined locally)
  const appServiceName = process.env.WEBSITE_SITE_NAME || "N/A (Local)";
  const instanceId = process.env.WEBSITE_INSTANCE_ID || "N/A (Local)";
  const buildTime = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const env = process.env.NODE_ENV || "development";
  const publicEnv = getPublicEnvVars();

  return (
    <div className={styles.page}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32
      }}>
        <Image src="/globe.svg" alt="Azure Logo" width={40} height={40} />
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>Azure Deployment Health Check</h1>
      </header>
      <section style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <span style={{
            background: '#e3f2fd', color: '#1976d2', borderRadius: 8, padding: '4px 12px', fontWeight: 600, fontSize: 14
          }}>Environment: Development</span>
          <span style={{
            background: '#e8f5e9', color: '#388e3c', borderRadius: 8, padding: '4px 12px', fontWeight: 600, fontSize: 14
          }}>Status:  [32m [1m [0m🟢 Running</span>
          <span style={{
            background: '#f3e5f5', color: '#7b1fa2', borderRadius: 8, padding: '4px 12px', fontWeight: 600, fontSize: 14
          }}>Build: {buildTime} UTC</span>
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ minWidth: 200 }}>
            <b>App Service Name:</b> {appServiceName}
          </div>
          <div style={{ minWidth: 200 }}>
            <b>Instance ID:</b> {instanceId}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ minWidth: 200 }}>
            <b>Host:</b> {host}
          </div>
          <div style={{ minWidth: 200 }}>
            <b>X-Forwarded-For (Client IP):</b> {forwardedFor}
          </div>
          <div style={{ minWidth: 200 }}>
            <b>X-Real-IP:</b> {realIp}
          </div>
          <div style={{ minWidth: 200 }}>
            <b>X-Forwarded-Proto (Protocol):</b> {forwardedProto}
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
          (If running locally, Azure-specific info will show as N/A. On Azure, these will reflect your App Service details.)
        </p>
      </section>
      <section style={{
        background: '#fafafa',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Environment Variables (NEXT_PUBLIC_*)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Variable</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(publicEnv).length === 0 ? (
              <tr><td colSpan={2} style={{ color: '#aaa', padding: 8 }}>No NEXT_PUBLIC_ variables set</td></tr>
            ) : (
              Object.entries(publicEnv).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0', fontFamily: 'monospace' }}>{key}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0', fontFamily: 'monospace' }}>{value}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
          Only variables prefixed with <b>NEXT_PUBLIC_</b> are exposed to the browser. See <a href="https://nextjs.org/docs/pages/guides/environment-variables" target="_blank" rel="noopener noreferrer">Next.js docs</a>.
        </p>
      </section>
      <section style={{
        background: '#f5f5f5',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 24,
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Helpful Azure Links</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: 15 }}>
          <li style={{ marginBottom: 8 }}>
            <a href="https://portal.azure.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 500 }}>Azure Portal</a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="https://learn.microsoft.com/en-us/azure/app-service/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 500 }}>Azure App Service Docs</a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 500 }}>Project Repository</a>
          </li>
        </ul>
      </section>
      <footer className={styles.footer}>
        <span style={{ color: '#888', fontSize: 13 }}>Testing Azure App Service</span>
      </footer>
    </div>
  );
}
