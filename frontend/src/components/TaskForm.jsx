import { useEffect, useState } from 'react';

const emptyForm = { title: '', description: '' };

function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(task ? { title: task.title, description: task.description } : emptyForm);
  }, [task]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
      });
      if (!task) setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{task ? 'Mise à jour' : 'Nouvelle tâche'}</p>
          <h2>{task ? 'Modifier la tâche' : 'Ajouter une tâche'}</h2>
        </div>
      </div>
      <label htmlFor="title">Titre</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ex. Préparer la présentation"
        maxLength="120"
        required
      />
      <label htmlFor="description">Description <span>(optionnelle)</span></label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Ajoutez quelques détails..."
        maxLength="1000"
        rows="4"
      />
      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Enregistrement...' : task ? 'Enregistrer' : 'Ajouter la tâche'}
        </button>
        {task && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
