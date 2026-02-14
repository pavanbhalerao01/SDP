import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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
    // If tables don't exist, run migrations automatically
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      try {
        // Run Prisma DB push to create tables
        await execAsync('npx prisma db push --accept-data-loss --skip-generate');
        
        // Now create the admin user
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
          message: 'Database migrated and initialized successfully!',
          status: 'success',
          admin: {
            email: admin.email,
            note: 'Default password: admin123 - Please change after first login!'
          }
        });
      } catch (migrationError: any) {
        return NextResponse.json({
          message: 'Migration failed',
          status: 'migration_error',
          error: migrationError.message
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: 'Setup failed',
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
