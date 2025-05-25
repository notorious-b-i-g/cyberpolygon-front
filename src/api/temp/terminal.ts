interface TerminalMessage {
  type?: string;
  command?: string;
  output?: string;
  error?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: number;
  task_id?: number;
}

class TerminalService {
  private ws: WebSocket | null = null;
  private token: string | null = null;
  private messageHandlers: ((message: TerminalMessage) => void)[] = [];
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: number = 3000;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;
  
  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  connect(onOpen?: () => void, onClose?: () => void): void {
    if (!this.token) {
      throw new Error('No authentication token found');
    }
    
    const wsUrl = `ws://localhost:8000/ws/ssh/?token=${this.token}`;
    this.ws = new WebSocket(wsUrl);
    
    this.ws.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      if (onOpen) onOpen();
    };
    
    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as TerminalMessage;
        this.messageHandlers.forEach(handler => handler(message));
      } catch (error) {
        throw new Error('Error parsing terminal message');
      }
    };
    
    this.ws.onclose = () => {
      this.isConnected = false;
      if (onClose) onClose();
      
      this.tryReconnect();
    };
    
    this.ws.onerror = () => {
      this.isConnected = false;
    };
  }
  
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
    
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
  }
  
  private tryReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }
    
    this.reconnectAttempts++;
    
    this.reconnectTimeoutId = setTimeout(() => {
      this.connect();
    }, this.reconnectTimeout);
  }
  
  sendCommand(command: string, username?: string, password?: string, hostname?: string, port?: number): void {
    if (!this.isConnected || !this.ws) {
      throw new Error('WebSocket not connected');
    }
    
    const message: TerminalMessage = {
      command,
      username: username || 'vagrant',
      password: password || 'vagrant123',
      hostname: hostname || '192.168.33.10',
      port: port || 2222
    };
    
    this.ws.send(JSON.stringify(message));
  }
  
  onMessage(handler: (message: TerminalMessage) => void): void {
    this.messageHandlers.push(handler);
  }
  
  removeMessageHandler(handler: (message: TerminalMessage) => void): void {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }
  
  isConnectedToTerminal(): boolean {
    return this.isConnected;
  }
}

export default new TerminalService(); 