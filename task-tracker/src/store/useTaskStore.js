// import create from 'zustand';
// import useMessageStore from './useMessageStore';

// const useTaskStore = create((set) => ({
//   tasks: [],
//   addTask: (task) => {
//     set((state) => ({ tasks: [...state.tasks, task] }));
//     useMessageStore.getState().setMessage('Task added successfully', 'success');
//   },
//   removeTask: (id) => {
//     set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) }));
//     useMessageStore.getState().setMessage('Task removed successfully', 'success');
//   },
//   toggleTask: (id) => {
//     set((state) => ({
//       tasks: state.tasks.map(task =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     }));
//   },
//   fetchTasks: async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//       const data = await response.json();
//       set({ tasks: data.slice(0, 5) });
//       useMessageStore.getState().setMessage('Tasks fetched successfully', 'success');
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       useMessageStore.getState().setMessage('Error fetching tasks', 'error');
//     }
//   },
// }));

// export default useTaskStore;


import create from 'zustand';
import useMessageStore from './useMessageStore';

const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // Initialize from localStorage
  addTask: (task) => {
    try {
      if (!task.title.trim()) {
        throw new Error('Task title cannot be empty');
      }
      set((state) => {
        const newTasks = [...state.tasks, task];
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return { tasks: newTasks };
      });
      useMessageStore.getState().setMessage('Task added successfully', 'success');
    } catch (error) {
      console.error('Error adding task:', error);
      useMessageStore.getState().setMessage(error.message, 'error');
    }
  },
  removeTask: (id) => {
    try {
      set((state) => {
        const newTasks = state.tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return { tasks: newTasks };
      });
      useMessageStore.getState().setMessage('Task removed successfully', 'success');
    } catch (error) {
      console.error('Error removing task:', error);
      useMessageStore.getState().setMessage('Error removing task', 'error');
    }
  },
  toggleTask: (id) => {
    try {
      set((state) => {
        const newTasks = state.tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return { tasks: newTasks };
      });
    } catch (error) {
      console.error('Error toggling task:', error);
      useMessageStore.getState().setMessage('Error toggling task', 'error');
    }
  },
  fetchTasks: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const initialTasks = data.slice(0, 5);
      set({ tasks: initialTasks });
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      useMessageStore.getState().setMessage('Tasks fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      useMessageStore.getState().setMessage('Error fetching tasks', 'error');
    }
  },
}));

export default useTaskStore;
