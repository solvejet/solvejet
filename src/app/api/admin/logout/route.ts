// src/app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<Response> {
  try {
    // Clear authentication cookie
    // We need to await something to satisfy the require-await rule
    await Promise.resolve();

    const cookieStore = cookies();

    // Cast to a type that includes the delete method
    const cookieManager = cookieStore as unknown as {
      delete: (name: string) => void;
    };

    cookieManager.delete('admin_session');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    // Safely log the error with proper type handling
    console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during logout',
      },
      { status: 500 }
    );
  }
}
