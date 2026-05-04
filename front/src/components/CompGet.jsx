import React from 'react'
import { useState,useEffect } from 'react'


export default function CompGet() {

    const [list,setList]=useState([]);

    useEffect(()=>{
        const fetchData=async ()=>{
            const url='http://localhost:9000/api/get';
            const response=await fetch(url,{
                method :'GET'
            });
            const jsonData=await response.json();
            setList(jsonData.list);
        }
        fetchData();
    },[])
    console.log('list==>',list)
  return (
    <div>
        <h1>Fruits List</h1>
        <table border='1'>
            <tr>
                <th>name</th>
                <th>color</th>
                <th>emoji</th>
            </tr>
            {list?.map((fruit)=>
                <tr>
                    <td>{fruit.name}</td>
                    <td>{fruit.color}</td>
                    <td>{fruit.emoji}</td>
                </tr>
        )}

        </table>
        
    </div>
  )
}
