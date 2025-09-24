import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateVideoIdeas(prompt: string): Promise<any[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a viral content strategist. Generate 5-7 specific, engaging video ideas based on the user's topic. Each idea should be optimized for short-form content (15-60 seconds) and include:
          - A catchy title
          - Brief description (2-3 sentences)
          - Target platform recommendation
          - Estimated duration
          - 3-5 relevant hashtags
          - Engagement potential (low/medium/high)
          
          Format as JSON array with objects containing: title, description, platform, estimatedDuration, tags, engagementPotential`
        },
        {
          role: 'user',
          content: `Generate video ideas for: ${prompt}`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    // Parse JSON response
    const ideas = JSON.parse(content);
    return ideas.map((idea: any, index: number) => ({
      id: `idea-${Date.now()}-${index}`,
      ...idea,
    }));
  } catch (error) {
    console.error('Error generating ideas:', error);
    throw new Error('Failed to generate video ideas');
  }
}

export async function generateScript(idea: any): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a script writer for viral short-form content. Create a detailed script based on the video idea provided. Include:
          - Hook (first 3 seconds)
          - Main talking points (structured for the platform)
          - Call to action
          - Timing notes
          - Visual suggestions
          
          Format as JSON with: content (full script), talkingPoints (array), hooks (array of 3 hook variations), callToAction, visualSuggestions (array)`
        },
        {
          role: 'user',
          content: `Create a script for this video idea: ${JSON.stringify(idea)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No script generated');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating script:', error);
    throw new Error('Failed to generate script');
  }
}
