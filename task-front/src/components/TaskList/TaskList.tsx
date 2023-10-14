import React from 'react';
import { Box } from '@mui/material';

import type { Task } from '../../App';
import { TaskItem } from './TaskItem/TaskItem';
import { TaskPanel } from '../Panel/Panel';

interface TaskListProps {
  editTaskId: Task['id'] | null;
  taskList: Task[];
  onDeleteTask: (id: Task['id']) => void;
  onCheckTask: (id: Task['id']) => void;
  onEdit: (id: Task['id']) => void;
  onChangeTask: ({ name, description }: Omit<Task, 'id' | 'checked'>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  taskList,
  editTaskId,
  onChangeTask,
  onDeleteTask,
  onCheckTask,
  onEdit
}) => (
  <Box>
    {taskList.map((task) => {
      if (task.id === editTaskId)
        return <TaskPanel mode='edit' onChangeTask={onChangeTask} editTask={task} />;
      return (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onCheckTask={onCheckTask}
          onEdit={onEdit}
        />
      );
    })}
  </Box>
);
