import type { Meta, StoryObj } from '@storybook/react';
import VMCard from './VMCard';

const meta: Meta<typeof VMCard> = {
  title: 'Components/VMCard',
  component: VMCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VMCard>;

export const Running: Story = {
  args: {
    vm: {
      id: '1',
      name: 'Ubuntu Server',
      description: 'Linux server for testing',
      status: 'running',
      ip: '192.168.1.100',
      os: 'Ubuntu 22.04',
      resources: {
        cpu: 2,
        ram: 4,
        disk: 50
      },
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
};

export const Stopped: Story = {
  args: {
    vm: {
      id: '2',
      name: 'Windows Server',
      description: 'Windows server for development',
      status: 'stopped',
      os: 'Windows Server 2022',
      resources: {
        cpu: 4,
        ram: 8,
        disk: 100
      },
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
}; 