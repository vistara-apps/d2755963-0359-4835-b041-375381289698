import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateScript } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ideaId, idea } = body;

    if (!userId || !ideaId || !idea) {
      return NextResponse.json(
        { success: false, error: 'userId, ideaId, and idea are required' },
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

    // Generate script using AI
    const generatedScript = await generateScript(idea);

    // Create script
    const script = await db.createScript({
      userId,
      ideaId,
      platformFormat: idea.platform,
      ...generatedScript,
    });

    // Deduct credits
    await db.updateUserCredits(userId, user.credits - 1);

    return NextResponse.json({
      success: true,
      data: script
    });
  } catch (error) {
    console.error('Error creating script:', error);
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
    const scriptId = searchParams.get('scriptId');

    if (scriptId) {
      // Get specific script
      const script = await db.getScript(scriptId);
      if (!script) {
        return NextResponse.json(
          { success: false, error: 'Script not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: script
      });
    }

    if (userId) {
      // Get all scripts for user
      const scripts = await db.getScriptsByUser(userId);
      return NextResponse.json({
        success: true,
        data: scripts
      });
    }

    return NextResponse.json(
      { success: false, error: 'userId or scriptId parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

