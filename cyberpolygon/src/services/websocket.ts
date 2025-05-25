import { io, Socket } from 'socket.io-client';
import { Terminal } from 'xterm';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000';

class WebSocketService {
  private socket: Socket | null = null;
  private terminal: Terminal | null = null;

  connect(vmId: string, terminal: Terminal) {
    this.terminal = terminal;
    this.socket = io(`${WS_URL}/terminal/${vmId}`, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('terminal-output', (data: string) => {
      if (this.terminal) {
        this.terminal.write(data);
      }
    });

    this.socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  sendCommand(command: string) {
    if (this.socket) {
      this.socket.emit('terminal-input', command);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.terminal = null;
  }
}

export const ws = new WebSocketService(); 