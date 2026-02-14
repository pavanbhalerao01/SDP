import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    
    // Transform data to match frontend expectations
    const formattedMembers = teamMembers.map((member: {
      id: number;
      name: string;
      role: string;
      bio: string;
      image: string | null;
      linkedinUrl: string | null;
      githubUrl: string | null;
      twitterUrl: string | null;
      email: string | null;
    }) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image || '/team/placeholder.jpg',
      social: {
        linkedin: member.linkedinUrl,
        github: member.githubUrl,
        twitter: member.twitterUrl,
        email: member.email,
      },
    }));
    
    return NextResponse.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    // Return fallback data if database is not set up
    return NextResponse.json([
      {
        id: 1,
        name: 'Alex Johnson',
        role: 'President',
        bio: 'Full-stack developer passionate about building scalable applications',
        image: '/team/placeholder.jpg',
        social: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          email: 'alex@sdp.com',
        },
      },
      {
        id: 2,
        name: 'Sarah Chen',
        role: 'Vice President',
        bio: 'UI/UX designer focused on creating beautiful user experiences',
        image: '/team/placeholder.jpg',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          email: 'sarah@sdp.com',
        },
      },
      {
        id: 3,
        name: 'Michael Brown',
        role: 'Technical Lead',
        bio: 'AI/ML enthusiast working on cutting-edge projects',
        image: '/team/placeholder.jpg',
        social: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          email: 'michael@sdp.com',
        },
      },
      {
        id: 4,
        name: 'Emily Davis',
        role: 'Events Coordinator',
        bio: 'Organizing amazing events and building community connections',
        image: '/team/placeholder.jpg',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          email: 'emily@sdp.com',
        },
      },
    ]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teamMember = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio,
        image: body.image,
        linkedinUrl: body.linkedinUrl,
        githubUrl: body.githubUrl,
        twitterUrl: body.twitterUrl,
        email: body.email,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
