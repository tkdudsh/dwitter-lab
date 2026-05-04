import React from 'react'
import { useEffect,useRef } from 'react';
import { useState } from 'react'

export default function CompPost() {
    const nameRef=useRef(null);
    const [data,setData]=useState('');//서버 넘어가는 데이터
    const [name,setName]=useState('');//폼 입력

    const handlePost= async ()=>{
        const url='http://localhost:9000/api/post';
                const response=await fetch(url,{
                    method :'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({name:name})
                });
                const jsonData=await response.json();
                setData(jsonData.result);
    }
    
    const handleChange=()=>{
        setName(nameRef.current.value);
    }
    console.log(name)
   /* useEffect(()=>{
            const fetchData=async ()=>{
                const url='http://localhost:9000/api/post';
                const response=await fetch(url,{
                    method :'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({"name":"홍길동"})
                });
                const jsonData=await response.json();
                setData(jsonData.result);
            }
            fetchData();
        },[])*/
        

  return (
    <div><input type="text" name="name" value={name} ref={nameRef} onChange={handleChange}/>
        <button onClick={handlePost}>전송</button>
        <h2>Post 방식으로 전송된 데이터:{data}</h2>
        

    </div>
  )
}
