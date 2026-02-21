const router=require("express").Router();
const Product=require("../models/Product");

router.post("/add", async(req,res)=>{
 const p=new Product(req.body);
 await p.save();
 res.send("Added");
});

router.get("/:id", async(req,res)=>{
 res.send(await Product.find({vendorId:req.params.id}));
});

router.delete("/:id", async(req,res)=>{
 await Product.findByIdAndDelete(req.params.id);
 res.send("Deleted");
});

module.exports=router;
