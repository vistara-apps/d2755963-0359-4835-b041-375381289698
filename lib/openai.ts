import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateVideoIdeas(prompt: string): Promise<any[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock data for demonstration
  const mockIdeas = [
    {
      title: "5 Productivity Hacks That Actually Work",
      description: "Quick-fire tips that busy professionals can implement immediately. Focus on the most impactful changes with minimal effort required.",
      platform: "tiktok" as const,
      estimatedDuration: "30-45 seconds",
      tags: ["productivity", "busyprofessionals", "lifehacks", "worksmarter", "efficiency"],
      engagementPotential: "high" as const
    },
    {
      title: "Morning Routine That Changed Everything",
      description: "Before and after transformation showing the power of a structured morning. Dramatic results that viewers will want to replicate.",
      platform: "instagram" as const,
      estimatedDuration: "45-60 seconds",
      tags: ["morningroutine", "transformation", "selfimprovement", "productivity", "success"],
      engagementPotential: "high" as const
    },
    {
      title: "The 2-Minute Rule Explained",
      description: "Simple time management technique that eliminates procrastination. Perfect for busy people who need immediate results.",
      platform: "youtube" as const,
      estimatedDuration: "60 seconds",
      tags: ["timemanagement", "2minuterule", "productivity", "procrastination", "lifehacks"],
      engagementPotential: "medium" as const
    },
    {
      title: "Desk Setup for Maximum Focus",
      description: "Transform your workspace into a productivity powerhouse. Quick changes that make a huge difference in concentration levels.",
      platform: "tiktok" as const,
      estimatedDuration: "30 seconds",
      tags: ["desksetup", "workspace", "focus", "productivity", "homeoffice"],
      engagementPotential: "medium" as const
    },
    {
      title: "Email Zero in 15 Minutes",
      description: "Revolutionary email management system that professionals swear by. Turn email chaos into organized efficiency.",
      platform: "instagram" as const,
      estimatedDuration: "45 seconds",
      tags: ["emailmanagement", "productivity", "organization", "worklife", "efficiency"],
      engagementPotential: "high" as const
    }
  ];
  
  return mockIdeas.map((idea, index) => ({
    id: `idea-${Date.now()}-${index}`,
    ...idea,
  }));
}

export async function generateScript(idea: any): Promise<any> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock script data
  const mockScript = {
    content: `[HOOK - 0-3 seconds]
"If you're always feeling overwhelmed at work, this changes everything..."

[MAIN CONTENT - 3-25 seconds]
Here are 5 productivity hacks that actually work:

1. The 2-minute rule: If it takes less than 2 minutes, do it now
2. Time blocking: Schedule your day in focused chunks
3. Single-tasking: One thing at a time, full attention
4. Email batching: Check emails only 2-3 times per day
5. The 80/20 rule: Focus on tasks that drive 80% of results

[PAYOFF - 25-30 seconds]
I used these techniques to cut my work hours by 30% while increasing my output.

[CALL TO ACTION - 30-35 seconds]
Which hack will you try first? Comment below and follow for more productivity tips!`,

    talkingPoints: [
      "Start with a relatable problem that hooks viewers immediately",
      "Present 5 clear, actionable productivity techniques",
      "Share personal transformation story for credibility",
      "End with engagement question to boost comments",
      "Use visual text overlays for each numbered point"
    ],

    hooks: [
      "If you're always feeling overwhelmed at work, this changes everything...",
      "Want to work 30% fewer hours but get more done? Here's how...",
      "These 5 productivity hacks saved me 2 hours every single day..."
    ],

    callToAction: "Which productivity hack will you implement first? Drop a comment below and follow @contentsparkAI for more game-changing tips!",

    visualSuggestions: [
      "Start with split screen: chaotic desk vs organized workspace",
      "Use bold text overlays for each numbered point",
      "Include before/after productivity statistics",
      "Show hands demonstrating each technique briefly",
      "End with follow call-to-action with profile highlight"
    ]
  };
  
  return mockScript;
}
