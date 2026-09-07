import { useEffect, useMemo, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError('');
        setTasks(await getTasks());
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setError('');
      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, formData);
        setTasks((current) =>
          current.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
        );
        setEditingTask(null);
      } else {
        const newTask = await createTask(formData);
        setTasks((current) => [newTask, ...current]);
      }
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    }
  };

  const handleToggle = async (task) => {
    try {
      setError('');
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      setTasks((current) =>
        current.map((item) => (item._id === updatedTask._id ? updatedTask : item)),
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      if (editingTask?._id === id) {
        setEditingTask(null);
      }
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Organisation personnelle</p>
          <h1>TaskFlow</h1>
          <p className="hero-copy">Gardez une vue claire sur ce qui compte.</p>
        </div>
        <div className="summary-card">
          <strong>{completedCount}</strong>
          <span>sur {tasks.length} terminée(s)</span>
        </div>
      </header>

      <section className="dashboard">
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTask(null)}
        />

        <section className="tasks-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Votre espace</p>
              <h2>Mes tâches</h2>
            </div>
            <span className="task-count">{tasks.length} tâche(s)</span>
          </div>

          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <p className="empty-state">Chargement des tâches...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
