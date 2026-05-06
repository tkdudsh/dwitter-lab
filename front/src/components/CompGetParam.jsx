import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function CompGetParam() {
    const [list,setList]=useState([]);

    useEffect(()=>{

        const fetchData= async()=>{
            const url="http://localhost:9000/api/products";
            const response = await fetch(url,{method:"GET"});
            const jsonData=await response.json();
            setList(jsonData.products);
        }

        fetchData();
    },[])
console.log(list)
const handleProductDetail=(product)=>{
    const url=`http://localhost:9000/api/products/${product.pid}`;
            const response = await fetch(url,{method:"GET"});
            const jsonData=await response.json();
            console.log(jsonData);
}

  return (
    <div style={{width:"1000px", margin:"auto"}}>
            <h1>GET :: Product List</h1>
            <ul style={{display:"flex", gap:"10px", listStyle:"none"}}>
                {list?.map((product) => 
                    <li key={product.pid}>
                        <img src={product.img}
                            style={{width: "150px"}}
                            onClick={()=>{handleProductDetail(product)}}
                        />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </li>
                )}
            </ul>
        </div>
  )
}
