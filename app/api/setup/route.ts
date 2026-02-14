import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Check if setup is already done
    const existingUser = await prisma.user.findFirst();
    if (existingUser) {
      return NextResponse.json({
        message: 'Database already initialized',
        status: 'already_setup'
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@sdp.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    });

    return NextResponse.json({
      message: 'Database initialized successfully!',
      status: 'success',
      admin: {
        email: admin.email,
        note: 'Default password: admin123 - Please change after first login!'
      }
    });
  } catch (error: any) {
    // If tables don't exist, run migrations
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      return NextResponse.json({
        message: 'Database tables not created. Run: npx prisma db push',
        status: 'needs_migration',
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Setup failed',
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
