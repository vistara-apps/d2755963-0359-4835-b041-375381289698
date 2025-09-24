import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateVideoIdeas } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, prompt } = body;

    if (!userId || !prompt) {
      return NextResponse.json(
        { success: false, error: 'userId and prompt are required' },
        { status: 400 }
      );
    }

    // Check if user has enough credits
    const user = await db.getUser(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.credits < 1) {
      return NextResponse.json(
        { success: false, error: 'Insufficient credits' },
        { status: 402 }
      );
    }

    // Generate ideas using AI
    const generatedIdeas = await generateVideoIdeas(prompt);

    // Create idea session
    const session = await db.createIdeaSession({
      userId,
      prompt,
      generatedIdeas,
    });

    // Deduct credits
    await db.updateUserCredits(userId, user.credits - 1);

    return NextResponse.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error creating idea session:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    const sessions = await db.getIdeaSessionsByUser(userId);

    return NextResponse.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching idea sessions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

