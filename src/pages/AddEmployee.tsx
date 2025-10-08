import { useState } from "react";
import API from "../api/axiosConfig";
import "../styles/taskForm.css";
import { useAppContext } from "../context/AppContext";

const AddEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { fetchUsers } = useAppContext();

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };


    if (!/^[A-Za-z\s]{3,}$/.test(name)) {
      newErrors.name = "Name must be at least 3 letters (no numbers/symbols)";
      valid = false;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }


    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      newErrors.password =
        "Password must be 6+ chars with 1 uppercase, 1 number & 1 symbol";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post("/auth/register", {
        email,
        password,
        name,
        role: "Employee",
      });

      alert("Employee added successfully!");
      setEmail("");
      setPassword("");
      setName("");
      setErrors({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (e: any) {
      alert(e?.response?.data?.message || "Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={addEmployee}>
    
      <div className="form-group">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>


      <div className="form-group password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <button type="submit" className="btn-success" disabled={loading}>
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
};

export default AddEmployee;
