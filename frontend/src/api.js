const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Une erreur est survenue');
  }

  return response.status === 204 ? null : response.json();
};

export const getTasks = () => request('/tasks');

export const createTask = (task) =>
  request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: 'DELETE',
  });
