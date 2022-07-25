import React from "react";

const Addproduct = ()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false)

    const addProduct= async()=>{

        console.warn(!name);
        if(!name || !price || !category || !company)
        {
            setError(true)
            return false;
        }



        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.warn(userId._id);
        let result = fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
        }
        });

        result = await result.json();
        console.warn(result)
    }

    return(
        <div className="product">

            <input type="text" placeholder="Enter Product name " className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} />
            { error && !name && <span className="invalid">Enter valid name </span>}

            <input type="text" placeholder="Enter Product price " className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            { error && !price && <span className="invalid">Enter valid price </span>}


            <input type="text" placeholder="Enter Product category " className="inputBox" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
            { error && !category && <span className="invalid">Enter valid category </span>}


            <input type="text" placeholder="Enter Product company " className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
            { error && !company && <span className="invalid">Enter valid company </span>}


            <button onClick={addProduct} className="btn">Add Product</button>
        </div>
    )
}

export default Addproduct;