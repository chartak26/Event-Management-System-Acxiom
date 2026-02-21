import {useState,useEffect} from "react";
import api from "../api";

export default function Vendor(){
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [products,setProducts]=useState([]);

 const user=JSON.parse(localStorage.getItem("user"));

 const load=()=>api.get("/vendor/"+user._id).then(r=>setProducts(r.data));
 useEffect(load,[]);

 const add=async()=>{
  await api.post("/vendor/add",{name,price,vendorId:user._id});
  load();
 };

 const del=async(id)=>{
  await api.delete("/vendor/"+id);
  load();
 };

 return(
  <div>
   <h2>Vendor</h2>
   <input placeholder="Name" onChange={e=>setName(e.target.value)}/>
   <input placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
   <button onClick={add}>Add</button>

   {products.map(p=>(
    <div key={p._id}>
     {p.name} ₹{p.price}
     <button onClick={()=>del(p._id)}>Delete</button>
    </div>
   ))}
  </div>
 );
}
