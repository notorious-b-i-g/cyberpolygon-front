export interface VirtualMachine {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'error';
  ip?: string;
  os: string;
  resources: {
    cpu: number;
    ram: number;
    disk: number;
  };
  created_at: string;
  updated_at: string;
} 