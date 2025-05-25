import axiosInstance from './axiosInstance';
import { API } from '../config/env';

/**
 * Get terminal WebSocket URL for the specified task
 * @param {number} taskId - Task ID
 * @returns {Promise<string>} WebSocket URL
 */
export const getTerminalUrl = async (taskId) => {
  await axiosInstance.get(`/tasks/${taskId}/terminal/`);
  return `${API.WS_URL}/ws/ssh/`;
};

/**
 * Class for terminal WebSocket communication
 */
export class TerminalWebSocket {
  /**
   * @param {string} url - WebSocket URL
   * @param {Function} onMessage - Message handler
   * @param {Function} onError - Error handler
   * @param {Function} onClose - Close handler
   * @param {Function} onOpen - Open handler
   */
  constructor(url, onMessage, onError, onClose, onOpen) {
    this.url = url;
    this.onMessageCallback = onMessage;
    this.onErrorCallback = onError;
    this.onCloseCallback = onClose;
    this.onOpenCallback = onOpen;
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 3;
    this.reconnectTimeout = 2000; // 2 seconds initial timeout
  }

  /**
   * Connect to the WebSocket
   */
  connect() {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = (event) => {
      this.reconnectAttempts = 0;
      if (this.onOpenCallback) this.onOpenCallback(event);
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) this.onMessageCallback(event);
    };

    this.socket.onerror = (error) => {
      if (this.onErrorCallback) this.onErrorCallback(error);
    };

    this.socket.onclose = (event) => {
      if (this.onCloseCallback) this.onCloseCallback(event);
      
      // Don't reconnect if closed normally
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnect();
      }
    };
  }

  /**
   * Reconnect to the WebSocket
   */
  reconnect() {
    this.reconnectAttempts += 1;
    const timeout = this.reconnectTimeout * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      this.connect();
    }, timeout);
  }

  /**
   * Send data through the WebSocket
   * @param {*} data - Data to send
   */
  send(data) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      if (this.onErrorCallback) {
        this.onErrorCallback(new Error('WebSocket is not open'));
      }
      return;
    }

    this.socket.send(JSON.stringify(data));
  }

  /**
   * Close the WebSocket connection
   */
  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
} 