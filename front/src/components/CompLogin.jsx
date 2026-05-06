import React from 'react'
import { useRef } from 'react'

export default function CompLogin() {
  const idRef=useRef(null);
  const passRef=useRef(null);
  
  const hadleLogin= async ()=>{
const id=idRef.current.value;
const pass=passRef.current.value;

const url ="http://localhost:9000/api/login";
const response=await fetch(url,{method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({"id":id,"pass":pass})
});
const jsonData=await response.json();
console.log(jsonData.result);
  }

  return (
    <div style={{width:"1000px",margin:"auto"}}>
      <h1>POST::로그인폼</h1>
      <div>
        <label htmlFor="id" >id</label>
      <input  type="text" 
                                id="id" 
                                name="id"
                                ref={idRef}
                               
                               
                                />
      </div>
      
      <div>
        <label htmlFor="pass">password</label>
      <input  type="password" 
                                id="pass" 
                                name="pass"
                                ref={passRef}
                                
                                
                                />
      </div>

      <button onClick={hadleLogin}>로그인</button>
      
    </div>
  )
}
