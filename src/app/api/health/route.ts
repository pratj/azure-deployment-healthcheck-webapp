import { NextResponse } from 'next/server';

export async function GET() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    deployment: 'hybrid',
    features: {
      serverSideRendering: true,
      apiRoutes: true,
      middleware: true,
      serverComponents: true
    }
  };

  return NextResponse.json(healthData);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'API route working!',
    receivedData: body,
    timestamp: new Date().toISOString()
  });
} 