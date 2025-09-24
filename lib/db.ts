// Simple in-memory database for demo purposes
// In production, replace with a real database like PostgreSQL, MongoDB, etc.

import { User, IdeaSession, Script, Clip } from './types';

class Database {
  private users: Map<string, User> = new Map();
  private ideaSessions: Map<string, IdeaSession> = new Map();
  private scripts: Map<string, Script> = new Map();
  private clips: Map<string, Clip> = new Map();

  // User operations
  async createUser(userData: Omit<User, 'createdAt'>): Promise<User> {
    const user: User = {
      ...userData,
      createdAt: new Date(),
    };
    this.users.set(user.userId, user);
    return user;
  }

  async getUser(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async updateUserCredits(userId: string, credits: number): Promise<User | null> {
    const user = this.users.get(userId);
    if (!user) return null;

    user.credits = credits;
    this.users.set(userId, user);
    return user;
  }

  // Idea Session operations
  async createIdeaSession(sessionData: Omit<IdeaSession, 'sessionId' | 'createdAt'>): Promise<IdeaSession> {
    const session: IdeaSession = {
      ...sessionData,
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    this.ideaSessions.set(session.sessionId, session);
    return session;
  }

  async getIdeaSessionsByUser(userId: string): Promise<IdeaSession[]> {
    return Array.from(this.ideaSessions.values()).filter(session => session.userId === userId);
  }

  // Script operations
  async createScript(scriptData: Omit<Script, 'scriptId' | 'createdAt'>): Promise<Script> {
    const script: Script = {
      ...scriptData,
      scriptId: `script-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    this.scripts.set(script.scriptId, script);
    return script;
  }

  async getScriptsByUser(userId: string): Promise<Script[]> {
    return Array.from(this.scripts.values()).filter(script => script.userId === userId);
  }

  async getScript(scriptId: string): Promise<Script | null> {
    return this.scripts.get(scriptId) || null;
  }

  // Clip operations
  async createClip(clipData: Omit<Clip, 'clipId' | 'createdAt'>): Promise<Clip> {
    const clip: Clip = {
      ...clipData,
      clipId: `clip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    this.clips.set(clip.clipId, clip);
    return clip;
  }

  async getClipsByUser(userId: string): Promise<Clip[]> {
    return Array.from(this.clips.values()).filter(clip => clip.userId === userId);
  }
}

// Export singleton instance
export const db = new Database();

