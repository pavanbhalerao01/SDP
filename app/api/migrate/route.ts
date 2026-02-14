import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Run Prisma DB push to create tables
    const { stdout, stderr } = await execAsync('npx prisma db push --accept-data-loss');
    
    return NextResponse.json({
      message: 'Database migration completed successfully',
      status: 'success',
      output: stdout,
      errors: stderr
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Migration failed',
      status: 'error',
      error: error.message,
      stderr: error.stderr,
      stdout: error.stdout
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to run migration',
    instruction: 'Send POST request to /api/migrate'
  });
}
