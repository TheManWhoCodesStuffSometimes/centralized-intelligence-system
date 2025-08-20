
import { Role, User, QuickCommand } from './types';

export const USERS: User[] = [
  { id: 1, name: 'Jesse', role: Role.LEADERSHIP, avatarUrl: 'https://picsum.photos/seed/jesse/100/100', username: 'jesse', password: 'leadership' },
  { id: 2, name: 'Thayne', role: Role.LEADERSHIP, avatarUrl: 'https://picsum.photos/seed/ai/100/100', username: 'thayne', password: 'leadership' },
  { id: 3, name: 'Langston', role: Role.EMPLOYEE, avatarUrl: 'https://picsum.photos/seed/langston/100/100', username: 'langston', password: 'employee' },
  { id: 4, name: 'Vihan', role: Role.CONTRACTOR, avatarUrl: 'https://picsum.photos/seed/vihan/100/100', username: 'vihan', password: 'contractor' },
];

export const QUICK_COMMANDS: QuickCommand[] = [
  { 
    text: 'Employee Progress Report', 
    prompt: 'Generate a progress report for all active employees, summarizing their recent tasks, achievements, and any blockers.',
    roles: [Role.LEADERSHIP] 
  },
  { 
    text: 'Project Progress Report', 
    prompt: 'Provide a high-level summary of all active projects, including current status, key milestones achieved this week, and upcoming deadlines.',
    roles: [Role.LEADERSHIP, Role.EMPLOYEE] 
  },
  { 
    text: 'Financial Analysis', 
    prompt: 'Run a detailed financial analysis. I need revenue, expenses, runway projection, and a breakdown of subscription tiers for the last quarter.',
    roles: [Role.LEADERSHIP] 
  },
  { 
    text: 'Pipeline Status', 
    prompt: 'Summarize the current sales pipeline status. List new leads, prospects in discussion, and deals expected to close this month.',
    roles: [Role.LEADERSHIP] 
  },
  {
    text: 'My Current Tasks',
    prompt: 'What are my current assigned tasks and their deadlines based on the project management system?',
    roles: [Role.EMPLOYEE, Role.CONTRACTOR]
  },
  {
    text: 'Summarize Project "Phoenix"',
    prompt: 'Can you give me a summary of Project "Phoenix", including its goals, current team members, and the latest status update?',
    roles: [Role.EMPLOYEE, Role.CONTRACTOR]
  }
];