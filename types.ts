
export enum Role {
  LEADERSHIP = 'Leadership',
  EMPLOYEE = 'Employee',
  CONTRACTOR = 'Contractor'
}

export enum AIModel {
  GEMINI = 'Gemini',
  CHATGPT = 'ChatGPT',
  CLAUDE = 'Claude'
}

export interface User {
  id: number;
  name: string;
  role: Role;
  avatarUrl: string;
  username: string;
  password: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface QuickCommand {
  text: string;
  prompt: string;
  roles: Role[];
}