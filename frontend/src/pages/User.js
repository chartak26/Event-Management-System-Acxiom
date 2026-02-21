import { useState, useEffect } from "react";
import api from "../api";

export default function User() {
 const [products, setProducts] = useState([]);
 const [cart, setCart] = useState([]);
 const [membership, setMembership] = useState(null);
 const [updateForm, setUpdateForm] = useState({ action: "extend", newDuration: 6 });
 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  api.get("/user/products").then(r => setProducts(r.data));
  api.get(`/user/membership/${user._id}`).then(r => setMembership(r.data));
 }, []);

 const total = cart.reduce((a, b) => a + b.price, 0);

 const order = async () => {
  await api.post("/user/order", { userId: user._id, items: cart, total });
  alert("Order placed");
  setCart([]);
 };

 const updateMembership = async () => {
  if (!membership) return;
  await api.put(`/user/update-membership/${membership._id}`, updateForm);
  api.get(`/user/membership/${user._id}`).then(r => setMembership(r.data));
 };

 return (
  <div>
   <h2>User</h2>

   <h3>Membership</h3>
   {membership ? (
    <div>
     Number: {membership.membershipNumber} | Status: {membership.status} | Ends: {new Date(membership.endDate).toLocaleDateString()}
     <br />
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
    </div>
   ) : <p>No membership</p>}

   <h3>Products</h3>
   {products.map(p => (
    <div key={p._id}>
     {p.name} ₹{p.price}
     <button onClick={() => setCart([...cart, p])}>Add</button>
    </div>
   ))}

   <h3>Cart Total: ₹{total}</h3>
   <button onClick={order}>Checkout</button>
  </div>
 );
}
