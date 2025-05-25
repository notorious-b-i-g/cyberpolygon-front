import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { VirtualMachine } from '../../types/vm';

interface VMCardProps {
  vm: VirtualMachine;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onReset: (id: string) => void;
}

const MotionCard = motion(Card);

export default function VMCard({ vm, onStart, onStop, onReset }: VMCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ minWidth: 275 }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="div">
            {vm.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: vm.status === 'running' ? 'success.main' : 'error.main',
              fontWeight: 'bold',
            }}
          >
            {vm.status === 'running' ? 'Запущена' : 'Остановлена'}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {vm.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          IP: {vm.ip || 'Не назначен'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ОС: {vm.os}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Ресурсы:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CPU: {vm.resources.cpu} ядер
          </Typography>
          <Typography variant="body2" color="text.secondary">
            RAM: {vm.resources.ram} GB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Диск: {vm.resources.disk} GB
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onStart(vm.id)}
          disabled={vm.status === 'running'}
          variant="contained"
          color="primary"
          aria-label={`Запустить виртуальную машину ${vm.name}`}
        >
          Запустить
        </Button>
        <Button
          onClick={() => onStop(vm.id)}
          disabled={vm.status === 'stopped'}
          variant="contained"
          color="error"
          aria-label={`Остановить виртуальную машину ${vm.name}`}
        >
          Остановить
        </Button>
        <Button
          onClick={() => onReset(vm.id)}
          variant="outlined"
          color="primary"
          aria-label={`Сбросить виртуальную машину ${vm.name}`}
        >
          Сбросить
        </Button>
      </CardActions>
    </MotionCard>
  );
} 