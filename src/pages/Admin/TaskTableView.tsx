import React, { useState, useMemo } from "react";
import "../../styles/taskTableView.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedUserName: string;
}

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete : (id:number)=>void
}

const TaskTableView: React.FC<TaskTableProps> = ({ tasks, onEdit,onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [tasks, searchTerm]);

  return (
    <div className="task-table-container">

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by status / priority"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="task-table-scroll">
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </td>
                  <td>{task.status}</td>
                  <td>{task.assignedUserName}</td>
                  <td>
                    <button className="edit-btn" onClick={() => onEdit(task)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => onDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTableView;
