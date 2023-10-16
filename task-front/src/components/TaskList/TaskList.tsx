import React from 'react';
import { Box } from '@mui/material';

import type { Task } from '../../App';
import { TaskItem } from './TaskItem/TaskItem';
// eslint-disable-next-line import/no-cycle
import { TaskPanel } from '../Panel/Panel';

interface TaskListProps {
  editTaskId: Task['uuid'] | null;
  taskList: Task[];
  onDeleteTask: (uuid: Task['uuid']) => void;
  onEdit: (uuid: Task['uuid']) => void;
  onChangeTask: ({ title, description }: Omit<Task, 'uuid' | 'checked'>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  taskList,
  editTaskId,
  onChangeTask,
  onDeleteTask,
  onEdit
}) => (
  <Box>
    {taskList.map((task) => {
      if (task.uuid === editTaskId)
        return <TaskPanel key={task.uuid} mode='edit' onChangeTask={onChangeTask} editTask={task} />;
      return (
        <TaskItem
          key={task.uuid}
          task={task}
          onDeleteTask={onDeleteTask}
          onEdit={onEdit}
        />
      );
    })}
  </Box>
);
