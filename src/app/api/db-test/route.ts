import { NextRequest } from 'next/server';
import { testDbConnection } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await testDbConnection();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
