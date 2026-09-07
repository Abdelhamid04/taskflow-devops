function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? 'is-completed' : ''}`}>
      <button
        className="status-button"
        type="button"
        onClick={() => onToggle(task)}
        aria-label={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
      >
        {task.completed ? '✓' : ''}
      </button>
      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
            {task.completed ? 'Terminée' : 'À faire'}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}
        <small>
          Créée le {new Date(task.createdAt).toLocaleDateString('fr-FR')}
        </small>
      </div>
      <div className="task-actions">
        <button type="button" onClick={() => onEdit(task)}>Modifier</button>
        <button className="delete-button" type="button" onClick={() => onDelete(task._id)}>
          Supprimer
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
