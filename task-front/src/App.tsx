import React from 'react';
import { Box } from '@mui/material';

import { Header, TaskPanel, TaskList } from './components';

export type Task = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
};

const DEFAULT_TASK_LIST = [
  { id: 1, title: 'task 1', description: 'description 1', checked: false },
  { id: 2, title: 'task 2', description: 'description 2', checked: false },
  {
    id: 3,
    title: 'task 3',
    description:
      'so long task description 3 so long task description so long task description so long task description so long task description',
    checked: true
  }
];

export const App = () => {
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);
  const [taskList, setTaskList] = React.useState(DEFAULT_TASK_LIST);

  const onEdit = (id: Task['id']) => {
    setEditTaskId(id);
  };

  const onDeleteTask = (id: Task['id']) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const onAddTask = ({ title, description }: Omit<Task, 'id' | 'checked'>) => {
    setTaskList([
      ...taskList,
      { id: taskList[taskList.length - 1].id + 1, description, title, checked: false }
    ]);
  };

  const onCheckTask = (id: Task['id']) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      })
    );
  };

  const onChangeTask = ({ title, description }: Omit<Task, 'id' | 'checked'>) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === editTaskId) {
          return { ...task, title, description };
        }
        return task;
      })
    );
    setEditTaskId(null);
  };

  return (
    <Box marginTop={5} height='100%' display='flex' justifyContent='center' alignContent='center'>
      <Box display='flex' flexDirection='column' width='500px'>
        <Header taskCount={taskList.length} />
        <TaskPanel mode='add' onAddTask={onAddTask} />
        <TaskList
          editTaskId={editTaskId}
          taskList={taskList}
          onDeleteTask={onDeleteTask}
          onCheckTask={onCheckTask}
          onEdit={onEdit}
          onChangeTask={onChangeTask}
        />
      </Box>
    </Box>
  );
};
