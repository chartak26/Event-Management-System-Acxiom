import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
 const [form, setForm] = useState({});
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const login = async () => {
  try {
   const res = await api.post("/auth/login", form);
   localStorage.setItem("token", res.data.token);
   localStorage.setItem("user", JSON.stringify(res.data.user));
   navigate("/" + res.data.user.role);
  } catch (err) {
   setError("Invalid credentials");
  }
 };

 return (
  <div>
   <h2>Login</h2>
   {error && <p style={{ color: "red" }}>{error}</p>}
   <input placeholder="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
   <input placeholder="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
   <button onClick={login}>Login</button>
  </div>
 );
}
