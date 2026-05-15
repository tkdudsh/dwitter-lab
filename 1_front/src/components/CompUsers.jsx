import React, { useState, useEffect } from 'react';
import { getFetchData } from '../util/fetchDatas.js';

export default function CompUsers() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
            const jsonData = await getFetchData("/users");
            setUsers(jsonData.users);
        }
        fetchData();
    }, []);

    return (
        <div style={{width:"1000px", margin:"auto"}}>
            <h1>Get :: Users</h1>
            <table border="1" style={{width: "60%"}}>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>ID</th>
                        <th>PASSWORD</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, idx) => 
                        <tr>
                            <td>{idx+1}</td>
                            <td>{user.id}</td>
                            <td>{user.pwd}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

