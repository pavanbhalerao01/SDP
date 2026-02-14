import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    // Return fallback data if database error
    const fallbackFaqs = [
      {
        id: 1,
        question: 'What is SDP?',
        answer: 'SDP (Student Development Program) is a student-led initiative...',
        order: 1,
        isActive: true,
      },
    ];
    return NextResponse.json(fallbackFaqs);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        isActive: body.isActive !== false,
      },
    });
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
