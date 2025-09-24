import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, originalVideoUrl, clipUrl, platform } = body;

    if (!userId || !originalVideoUrl || !clipUrl || !platform) {
      return NextResponse.json(
        { success: false, error: 'userId, originalVideoUrl, clipUrl, and platform are required' },
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

    // Create clip
    const clip = await db.createClip({
      userId,
      originalVideoUrl,
      clipUrl,
      platform,
    });

    // Deduct credits
    await db.updateUserCredits(userId, user.credits - 1);

    return NextResponse.json({
      success: true,
      data: clip
    });
  } catch (error) {
    console.error('Error creating clip:', error);
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

    const clips = await db.getClipsByUser(userId);

    return NextResponse.json({
      success: true,
      data: clips
    });
  } catch (error) {
    console.error('Error fetching clips:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

