import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axiosConfig";
import "../styles/employeeDashboard.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchTasksBasedOnUser();
  }, []);

  const fetchTasksBasedOnUser = async () => {
    const { data } = await API.get(`/tasks/user/${userId}`);
    setTasks(data);
  };

  const updateStatus = async (id: number, status: string) => {
    await API.put(`/tasks/status/${id}`, { status });
    fetchTasksBasedOnUser();
  };

  return (
    <>
      <Navbar />
      <div className="employee-container">
        <h2 className="employee-title">My Tasks</h2>

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ?
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </td>
                    <td>{task.status}</td>
                    <td>
                      <select
                        className="status-select"
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                      >
                        <option>Assigned</option>
                        <option>Started</option>
                        <option>Hold</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="no-data">
                      No tasks found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
