import React from "react";
import "../../styles/taskForm.css";

interface TaskFormProps {
  form: {
    id: string;
    title: string;
    description: string;
    priority: string;
    assignedUserId: string;
    status: string;
  };
  users: any[];
  isEdit: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  setForm: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      description: string;
      priority: string;
      assignedUserId: string;
      status: string;
    }>
  >;
}

const TaskForm: React.FC<TaskFormProps> = ({
  form,
  users,
  isEdit,
  onSubmit,
  onCancel,
  setForm,
}) => {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      <select
        value={form.assignedUserId}
        onChange={(e) => setForm({ ...form, assignedUserId: e.target.value })}
        required
      >
        <option value="">Select Employee</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Assigned</option>
        <option>Started</option>
        <option>Hold</option>
        <option>Completed</option>
      </select>

      <button
        type="submit"
        className={`btn ${isEdit ? "btn-warning" : "btn-success"}`}
      >
        {isEdit ? "Update" : "Create"}
      </button>
      {isEdit && (
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
