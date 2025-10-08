import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../api/axiosConfig";

import "../../styles/admin.css";
import TaskForm from "./TaskForm";
import TaskTableView from "./TaskTableView";
import Modal from "../../components/Modal";
import AddEmployee from "../AddEmployee";
import { useAppContext } from "../../context/AppContext";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedUserName: string;
  assignedUserId: number;
}

const AdminDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { users } = useAppContext();

  const [isEdit, setIsEdit] = useState(false);
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    priority: "Low",
    assignedUserId: "",
    status: "Assigned",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks/getAll");
    setTasks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await API.put(`/tasks/update/${form.id}`, form);
    } else {
      await API.post("/tasks/create", form);
    }
    resetForm();
    fetchTasks();
    setTaskModalOpen(false);
  };

  const editTask = (task: Task) => {
    setForm({
      id: String(task.id),
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignedUserId: String(task.assignedUserId || ""),
      status: task.status,
    });
    setIsEdit(true);
    setTaskModalOpen(true);
  };

  const resetForm = () => {
    setIsEdit(false);
    setForm({
      id: "",
      title: "",
      description: "",
      priority: "Low",
      assignedUserId: "",
      status: "Assigned",
    });
  };

  
  const confirmDelete = (id: number) => {
    setTaskToDelete(id);
    setConfirmDeleteModal(true);
  };

 
  const handleDeleteConfirmed = async () => {
    if (taskToDelete !== null) {
      await API.delete(`/tasks/delete/${taskToDelete}`);
      fetchTasks();
      setTaskToDelete(null);
      setConfirmDeleteModal(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3>Admin Dashboard</h3>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => setEmployeeModalOpen(true)}>
            ➕ Add Employee
          </button>
          <button className="btn btn-success" onClick={() => setTaskModalOpen(true)}>
            📝 Create Task
          </button>
        </div>

       
        <Modal
          isOpen={isEmployeeModalOpen}
          onClose={() => setEmployeeModalOpen(false)}
          title="Add Employee"
        >
          <AddEmployee />
        </Modal>

     
        <Modal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setTaskModalOpen(false);
            resetForm();
          }}
          title={isEdit ? "Edit Task" : "Create Task"}
        >
          <TaskForm
            form={form}
            users={users}
            isEdit={isEdit}
            onSubmit={handleSubmit}
            onCancel={() => {
              resetForm();
              setTaskModalOpen(false);
            }}
            setForm={setForm}
          />
        </Modal>

  
        <TaskTableView tasks={tasks} onEdit={editTask} onDelete={confirmDelete} />

        {confirmDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this task?</p>
              <div className="delete-actions">
                <button className="cancel-btn" onClick={() => setConfirmDeleteModal(false)}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={handleDeleteConfirmed}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
