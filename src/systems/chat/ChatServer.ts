// ChatServer.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Browser-side simulation of the SPAGHETTI_RELAY C++ chat server.
//          Faithfully reproduces the Winsock2 TCP server's command protocol,
//          authentication flow, session management, and message routing —
//          all running client-side with simulated bot users for demo purposes.

import { EventBus } from '@/systems/EventBus';
import { EventType } from '@/types/events';

const MAX_LOGIN_ATTEMPTS = 3;
const MAX_MESSAGE_LOG = 50;
const MAX_MESSAGE_LENGTH = 500;
const COMMAND_CHAR = '~';

interface UserAccount {
  username: string;
  password: string;
  registrationTime: string;
  isLoggedIn: boolean;
  isOnline: boolean;
  loginAttempts: number;
  lastActivity: string;
}

interface ClientSession {
  username: string;
  joinTime: string;
  isAuthenticated: boolean;
  messageCount: number;
}

interface ChatMessage {
  timestamp: string;
  sender: string;
  content: string;
  type: 'system' | 'chat' | 'private' | 'error' | 'command' | 'info';
}

type MessageCallback = (message: ChatMessage) => void;

export class ChatServer {
  private registeredUsers: Map<string, UserAccount> = new Map();
  private session: ClientSession | null = null;
  private messageLog: ChatMessage[] = [];
  private onMessage: MessageCallback;
  private botTimers: ReturnType<typeof setTimeout>[] = [];

  constructor(onMessage: MessageCallback) {
    this.onMessage = onMessage;
    this.seedDemoData();
  }

  initialize(): void {
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: '══════════════════════════════════════════',
      type: 'system',
    });
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: '  SPAGHETTI_RELAY v2.0 — Chat Server',
      type: 'system',
    });
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: '  TCP Protocol • Session Authentication',
      type: 'system',
    });
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: '══════════════════════════════════════════',
      type: 'system',
    });
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: 'Welcome! Type ~help for available commands.',
      type: 'info',
    });
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: 'Demo accounts: guest/guest123, admin/admin123',
      type: 'info',
    });

    this.startBotActivity();
  }

  destroy(): void {
    this.botTimers.forEach(clearTimeout);
    this.botTimers = [];
  }

  processInput(input: string): void {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `Message exceeds maximum length (${MAX_MESSAGE_LENGTH} chars).`,
        type: 'error',
      });
      return;
    }

    if (trimmed.startsWith(COMMAND_CHAR)) {
      this.processCommand(trimmed);
    } else {
      this.processChatMessage(trimmed);
    }
  }

  private processCommand(input: string): void {
    const parts = input.substring(1).split(' ');
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        this.handleHelp();
        break;
      case 'register':
        this.handleRegister(args);
        break;
      case 'login':
        this.handleLogin(args);
        break;
      case 'logout':
        this.handleLogout();
        break;
      case 'getlist':
        this.handleGetList();
        break;
      case 'getlog':
        this.handleGetLog();
        break;
      case 'send':
        this.handlePrivateMessage(args);
        break;
      default:
        this.emit({
          timestamp: this.now(),
          sender: 'SERVER',
          content: `Unknown command: ${command}. Type ~help for available commands.`,
          type: 'error',
        });
    }
  }

  private handleHelp(): void {
    const preAuth = !this.session?.isAuthenticated;
    const lines = [
      '── Available Commands ──',
      `${COMMAND_CHAR}help              Show this help message`,
      ...(preAuth
        ? [
            `${COMMAND_CHAR}register <user> <pass>  Create account`,
            `${COMMAND_CHAR}login <user> <pass>     Authenticate`,
          ]
        : [
            `${COMMAND_CHAR}logout            End session`,
            `${COMMAND_CHAR}getlist           Online users`,
            `${COMMAND_CHAR}getlog            Message history`,
            `${COMMAND_CHAR}send <user> <msg>  Private message`,
            'Type any text to send a public message',
          ]),
      '────────────────────────',
    ];
    lines.forEach((line) =>
      this.emit({ timestamp: this.now(), sender: 'SERVER', content: line, type: 'info' })
    );
  }

  private handleRegister(args: string[]): void {
    if (args.length < 2) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Usage: ~register <username> <password>',
        type: 'error',
      });
      return;
    }

    const [username, password] = args;

    if (this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Already authenticated. Logout first.',
        type: 'error',
      });
      return;
    }

    if (this.registeredUsers.has(username.toLowerCase())) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `Username '${username}' already taken.`,
        type: 'error',
      });
      return;
    }

    this.registeredUsers.set(username.toLowerCase(), {
      username,
      password,
      registrationTime: this.now(),
      isLoggedIn: false,
      isOnline: false,
      loginAttempts: 0,
      lastActivity: this.now(),
    });

    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: `User '${username}' registered successfully!`,
      type: 'system',
    });
    this.broadcastSystem(`New user registered: ${username}`);
  }

  private handleLogin(args: string[]): void {
    if (args.length < 2) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Usage: ~login <username> <password>',
        type: 'error',
      });
      return;
    }

    const [username, password] = args;

    if (this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Already authenticated. Logout first.',
        type: 'error',
      });
      return;
    }

    const user = this.registeredUsers.get(username.toLowerCase());
    if (!user) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `User '${username}' not found.`,
        type: 'error',
      });
      return;
    }

    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `Account '${username}' is locked (max attempts exceeded).`,
        type: 'error',
      });
      return;
    }

    if (user.password !== password) {
      user.loginAttempts++;
      const remaining = MAX_LOGIN_ATTEMPTS - user.loginAttempts;
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `Invalid password. ${remaining} attempt(s) remaining.`,
        type: 'error',
      });
      return;
    }

    user.isLoggedIn = true;
    user.isOnline = true;
    user.loginAttempts = 0;
    user.lastActivity = this.now();

    this.session = {
      username: user.username,
      joinTime: this.now(),
      isAuthenticated: true,
      messageCount: 0,
    };

    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: `Authentication successful. Welcome, ${user.username}!`,
      type: 'system',
    });
    this.broadcastSystem(`${user.username} has joined the chat`);

    EventBus.emit(EventType.SYSTEM_INITIALIZED, { user: user.username }, 'ChatServer');
  }

  private handleLogout(): void {
    if (!this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Not authenticated.',
        type: 'error',
      });
      return;
    }

    const username = this.session.username;
    const user = this.registeredUsers.get(username.toLowerCase());
    if (user) {
      user.isLoggedIn = false;
      user.isOnline = false;
    }

    this.broadcastSystem(`${username} has left the chat`);
    this.session = null;

    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: 'Session terminated. Goodbye!',
      type: 'system',
    });
  }

  private handleGetList(): void {
    if (!this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Must be authenticated. Use ~login first.',
        type: 'error',
      });
      return;
    }

    const online = Array.from(this.registeredUsers.values()).filter((u) => u.isOnline);
    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: `── Online Users (${online.length}) ──`,
      type: 'info',
    });
    online.forEach((u) => {
      const isYou = u.username.toLowerCase() === this.session?.username.toLowerCase();
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `  [*] ${u.username}${isYou ? ' (you)' : ''}`,
        type: 'info',
      });
    });
  }

  private handleGetLog(): void {
    if (!this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Must be authenticated. Use ~login first.',
        type: 'error',
      });
      return;
    }

    const chatMessages = this.messageLog.filter((m) => m.type === 'chat');
    const recent = chatMessages.slice(-MAX_MESSAGE_LOG);

    this.emit({
      timestamp: this.now(),
      sender: 'SERVER',
      content: `── Message Log (${recent.length}) ──`,
      type: 'info',
    });

    if (recent.length === 0) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: '  No messages yet.',
        type: 'info',
      });
    } else {
      recent.forEach((m) => {
        this.emit({
          timestamp: m.timestamp,
          sender: m.sender,
          content: m.content,
          type: 'info',
        });
      });
    }
  }

  private handlePrivateMessage(args: string[]): void {
    if (!this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Must be authenticated. Use ~login first.',
        type: 'error',
      });
      return;
    }

    if (args.length < 2) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Usage: ~send <username> <message>',
        type: 'error',
      });
      return;
    }

    const recipient = args[0];
    const message = args.slice(1).join(' ');
    const recipientUser = this.registeredUsers.get(recipient.toLowerCase());

    if (!recipientUser || !recipientUser.isOnline) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: `User '${recipient}' is not online.`,
        type: 'error',
      });
      return;
    }

    this.emit({
      timestamp: this.now(),
      sender: this.session.username,
      content: `[PRIVATE → ${recipient}] ${message}`,
      type: 'private',
    });

    // Simulate bot reply after delay
    if (recipientUser.username.toLowerCase() !== this.session.username.toLowerCase()) {
      const delay = 1500 + Math.random() * 2000;
      const timer = setTimeout(() => {
        this.emit({
          timestamp: this.now(),
          sender: recipientUser.username,
          content: `[PRIVATE] ${this.getBotReply(message)}`,
          type: 'private',
        });
      }, delay);
      this.botTimers.push(timer);
    }
  }

  private processChatMessage(content: string): void {
    if (!this.session?.isAuthenticated) {
      this.emit({
        timestamp: this.now(),
        sender: 'SERVER',
        content: 'Must be authenticated to send messages. Use ~login first.',
        type: 'error',
      });
      return;
    }

    this.session.messageCount++;
    const msg: ChatMessage = {
      timestamp: this.now(),
      sender: this.session.username,
      content,
      type: 'chat',
    };

    this.messageLog.push(msg);
    if (this.messageLog.length > MAX_MESSAGE_LOG) {
      this.messageLog = this.messageLog.slice(-MAX_MESSAGE_LOG);
    }

    this.emit(msg);

    // Bot responses to public messages
    const delay = 2000 + Math.random() * 3000;
    const timer = setTimeout(() => {
      const botUser = this.getRandomOnlineBot();
      if (botUser) {
        const reply: ChatMessage = {
          timestamp: this.now(),
          sender: botUser,
          content: this.getBotReply(content),
          type: 'chat',
        };
        this.messageLog.push(reply);
        this.emit(reply);
      }
    }, delay);
    this.botTimers.push(timer);
  }

  // --- Demo Data & Bot System ---

  private seedDemoData(): void {
    const bots = [
      { username: 'guest', password: 'guest123' },
      { username: 'admin', password: 'admin123' },
      { username: 'NavyVet_Mike', password: crypto.randomUUID() },
      { username: 'PixelPusher', password: crypto.randomUUID() },
      { username: 'CodeWizard', password: crypto.randomUUID() },
    ];

    bots.forEach((bot) => {
      this.registeredUsers.set(bot.username.toLowerCase(), {
        username: bot.username,
        password: bot.password,
        registrationTime: this.now(),
        isLoggedIn: true,
        isOnline: true,
        loginAttempts: 0,
        lastActivity: this.now(),
      });
    });
  }

  private startBotActivity(): void {
    const botMessages = [
      { user: 'NavyVet_Mike', msg: 'Anyone else working on UE5 today?' },
      { user: 'PixelPusher', msg: 'Just got PBR materials working in my renderer!' },
      { user: 'CodeWizard', msg: 'The EventBus pattern is so clean for decoupling.' },
      { user: 'NavyVet_Mike', msg: 'Just finished debugging the behavior tree AI.' },
      { user: 'PixelPusher', msg: 'Vulkan validation layers are a lifesaver.' },
    ];

    let delay = 8000;
    botMessages.forEach((bm) => {
      const timer = setTimeout(() => {
        if (this.session?.isAuthenticated) {
          const msg: ChatMessage = {
            timestamp: this.now(),
            sender: bm.user,
            content: bm.msg,
            type: 'chat',
          };
          this.messageLog.push(msg);
          this.emit(msg);
        }
      }, delay);
      this.botTimers.push(timer);
      delay += 12000 + Math.random() * 8000;
    });
  }

  private getRandomOnlineBot(): string | null {
    const bots = Array.from(this.registeredUsers.values()).filter(
      (u) => u.isOnline && u.username.toLowerCase() !== this.session?.username.toLowerCase()
    );
    if (bots.length === 0) return null;
    return bots[Math.floor(Math.random() * bots.length)].username;
  }

  private getBotReply(message: string): string {
    const replies = [
      'Interesting approach! Have you tried the observer pattern?',
      'Nice! That reminds me of a similar system I built.',
      'Good point. Event-driven architecture makes that much cleaner.',
      'I was just working on something similar yesterday.',
      'Solid work. The separation of concerns is key.',
      'Have you tested that with multiple concurrent sessions?',
      'That command protocol is elegant. Simple but effective.',
      'Roger that. Working on it now.',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  private broadcastSystem(content: string): void {
    this.emit({ timestamp: this.now(), sender: 'SERVER', content, type: 'system' });
  }

  private emit(message: ChatMessage): void {
    this.onMessage(message);
  }

  private maskPassword(password: string): string {
    if (password.length <= 2) return '***';
    return password[0] + 'X'.repeat(password.length - 2) + password[password.length - 1];
  }

  private now(): string {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }
}
