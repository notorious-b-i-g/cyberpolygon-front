import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { ws } from '@/services/websocket';
import { Box } from '@mui/material';

interface TerminalProps {
  vmId: string;
}

export const Terminal: React.FC<TerminalProps> = ({ vmId }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
      },
    });

    xterm.open(terminalRef.current);
    xtermRef.current = xterm;

    // Подключаем WebSocket
    ws.connect(vmId, xterm);

    // Обработка ввода
    xterm.onData((data) => {
      ws.sendCommand(data);
    });

    return () => {
      ws.disconnect();
      xterm.dispose();
    };
  }, [vmId]);

  return (
    <Box
      ref={terminalRef}
      sx={{
        width: '100%',
        height: '400px',
        backgroundColor: '#1e1e1e',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    />
  );
}; 