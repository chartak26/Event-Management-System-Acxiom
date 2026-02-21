import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
 const [form, setForm] = useState({ role: "user" });
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const register = async () => {
  try {
   if (!form.name || !form.email || !form.password || !form.role) {
    setError("All fields required");
    return;
   }
   await api.post("/auth/register", form);
   alert("User registered, please login");
   navigate("/");
  } catch (err) {
   setError("Registration failed");
  }
 };

 return (
  <div>
   <h2>Register</h2>
   {error && <p style={{ color: "red" }}>{error}</p>}
   <input placeholder="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
   <input placeholder="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
   <input placeholder="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
   <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
    <option value="user">User</option>
    <option value="vendor">Vendor</option>
    <option value="admin">Admin</option>
   </select>
   <button onClick={register}>Register</button>
   <button onClick={() => navigate("/")}>Back to Login</button>
  </div>
 );
}