import { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
 const [users, setUsers] = useState([]);
 const [memberships, setMemberships] = useState([]);
 const [addForm, setAddForm] = useState({ userId: "", duration: 6 });
 const [updateForm, setUpdateForm] = useState({ membershipNumber: "", action: "extend", newDuration: 6 });

 useEffect(() => {
  loadUsers();
  loadMemberships();
 }, []);

 const loadUsers = () => api.get("/admin/users").then(r => setUsers(r.data));
 const loadMemberships = () => api.get("/admin/memberships").then(r => setMemberships(r.data));

 const addMembership = async () => {
  if (!addForm.userId) return alert("Select user");
  await api.post("/admin/add-membership", addForm);
  loadMemberships();
  setAddForm({ userId: "", duration: 6 });
 };

 const updateMembership = async () => {
  if (!updateForm.membershipNumber) return alert("Enter membership number");
  await api.put("/admin/update-membership", updateForm);
  loadMemberships();
  setUpdateForm({ membershipNumber: "", action: "extend", newDuration: 6 });
 };

 return (
  <div>
   <h2>Admin - Maintenance</h2>

   <h3>Add Membership</h3>
   <select value={addForm.userId} onChange={e => setAddForm({ ...addForm, userId: e.target.value })}>
    <option value="">Select User</option>
    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
   </select>
   <label>
    <input type="radio" name="duration" value={6} checked={addForm.duration === 6} onChange={e => setAddForm({ ...addForm, duration: +e.target.value })} /> 6 months
   </label>
   <label>
    <input type="radio" name="duration" value={12} checked={addForm.duration === 12} onChange={e => setAddForm({ ...addForm, duration: +e.target.value })} /> 1 year
   </label>
   <label>
    <input type="radio" name="duration" value={24} checked={addForm.duration === 24} onChange={e => setAddForm({ ...addForm, duration: +e.target.value })} /> 2 years
   </label>
   <button onClick={addMembership}>Add Membership</button>

   <h3>Update Membership</h3>
   <input placeholder="Membership Number" value={updateForm.membershipNumber} onChange={e => setUpdateForm({ ...updateForm, membershipNumber: e.target.value })} />
   <label>
    <input type="radio" name="action" value="extend" checked={updateForm.action === "extend"} onChange={e => setUpdateForm({ ...updateForm, action: e.target.value })} /> Extend
   </label>
   <label>
    <input type="radio" name="action" value="cancel" checked={updateForm.action === "cancel"} onChange={e => setUpdateForm({ ...updateForm, action: e.target.value })} /> Cancel
   </label>
   {updateForm.action === "extend" && (
    <select value={updateForm.newDuration} onChange={e => setUpdateForm({ ...updateForm, newDuration: +e.target.value })}>
     <option value={6}>6 months</option>
     <option value={12}>1 year</option>
     <option value={24}>2 years</option>
    </select>
   )}
   <button onClick={updateMembership}>Update Membership</button>

   <h3>Memberships</h3>
   {memberships.map(m => (
    <div key={m._id}>
     {m.membershipNumber} - {m.userId.name} - {m.status} - Ends: {new Date(m.endDate).toLocaleDateString()}
    </div>
   ))}
  </div>
 );
}
