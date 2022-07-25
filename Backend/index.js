const express = require('express');
const mongoose = require('mongoose');
const  userModel = require('./db/User');
const productModel = require('./db/product')
const cors = require('cors')

const User = require("./db/User");
const Product = require("./db/product")


const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://vaibhavi:vaibhavi@learnmongodb.eluyb.mongodb.net/?retryWrites=true&w=majority', ()=>{
    console.log('connected to mongodb');
});

//  app.post("/register",async (req,resp)=>{
//     let user = new User(req.body);
//     let result = await user.save();
//     resp.send(result);
//  })

app.get('/health', (req, res) => {
    res.json({
      success: true,
    });
})

 app.post('/register',async(req,res) => {

    const {name, email, password} = req.body
  
    const newUser = new userModel({
        name : name,
        email: email,
        password: password
    })
  
    const savedUser= await  newUser.save();
    // savedUser = savedUser.toObject();
    // delete savedUser.password
  
    res.json({savedUser});
  })

  app.post('/login',async(req,resp)=>{
  
    if(req.body.password && req.body.email)
    {
      let user = await User.findOne(req.body).select("-password");
      if(user)
      {
        resp.send(user)
      }
      else
      {
        resp.send({result:'No user found'})
      }
    }
    else
    {
      resp.send({result:'No user found'})
    }
  })


  app.post('/add-product',async(req,res) => {

    const {name, price, category,userId,company} = req.body
  
    const newProduct = new productModel({
        name : name,
        price: price,
        category: category,
        userId:userId,
        company:company
    })
  
    const savedProduct = await  newProduct.save();
    // savedUser = savedUser.toObject();
    // delete savedUser.password
  
    res.json({savedProduct});
  })

  app.get("/products",async(req,resp)=>{
    let products = await Product.find();
    if(products.length>0)
    {
      resp.send(products)
    }else{
      resp.send({result:"No products found"})
    }
  })

  app.delete("/product/:id",async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
  })
  

// const connectDB = async ()=>{
//     mongoose.connect('mongodb://localhost:27017/e-comm')
//     const ProductSchema = new mongoose.Schema({});
//     const Product = mongoose.model('product',ProductSchema);
//     const data = await Product.find();
//     console.warn(data);
// }

app.get("/product/:id", async (req,res)=>{
  let result = await Product.findOne({_id:req.params.id})
  if(result){
    res.send(result)
  }
  else{
    res.send({result:"No Record Found....."})
  }
})

app.put("/product/:id",async (req,res)=>{
  let result = await Product.updateOne(
    { _id :req.params.id },
  {
    $set : req.body
  }

  )

  res.send(result)
   
})

app.get("/search/:key",async (req,res)=>{
   let result = await Product.find({
    "$or" : [
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
    ]
   });
   res.send(result)
})

app.listen(PORT , () => {
    console.log(`Server is listening on port ${PORT}`);
    })

