import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return fallback data if database is not set up
    return NextResponse.json([
      {
        id: 1,
        title: 'Web Development Workshop',
        description: 'Learn the fundamentals of modern web development with React and Next.js',
        date: '2026-03-15',
        time: '14:00',
        location: 'Room 301, Tech Building',
        category: 'Workshop',
      },
      {
        id: 2,
        title: 'AI & Machine Learning Seminar',
        description: 'Explore the latest trends in AI and machine learning with industry experts',
        date: '2026-03-22',
        time: '16:00',
        location: 'Auditorium Hall',
        category: 'Seminar',
      },
      {
        id: 3,
        title: 'Hackathon 2026',
        description: '48-hour coding marathon to build innovative solutions',
        date: '2026-04-05',
        time: '09:00',
        location: 'Innovation Lab',
        category: 'Hackathon',
      },
    ]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        time: body.time,
        location: body.location,
        category: body.category,
      },
    });
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
