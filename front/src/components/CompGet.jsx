import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getFetchData } from '../util/fetchDatas';

export default function CompGet() {
    const [list,setList]=useState([]);

    useEffect(()=>{
        const fetchData= async ()=>{
            
            const jsonData= await getFetchData(`api/get`);
            setList(jsonData.fruits);
        }
        fetchData();
        
    },[])
    console.log(list)

  return (
    <div>
      <h1>GET :: FRUit LIST</h1>
      <table border="1" style={{width:"50%"}}>
        <thead>
          <tr>
            <th>name</th>
            <th>color</th>
            <th>emoji</th>
          </tr>
        </thead>
        <tbody>
            
                {list?.map((fruit)=>
                <tr>
                    <td>{fruit.name}</td>
                 <td>{fruit.color}</td>
                 <td>{fruit.emoji}</td>
                </tr>
                 
                )}
            
        </tbody>

      </table>
    </div>
  )
}
