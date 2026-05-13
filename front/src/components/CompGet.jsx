import React, {useState, useEffect} from 'react';
import { getFetchData } from '../util/fetchDatas.js';

export default function CompGet() {
    const [list, setList] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
            const jsonData = await getFetchData(`/api/get`);
            setList(jsonData.fruits);
        }
        fetchData();
    }, []);

    return (
        <div style={{width:"1000px", margin:"auto"}}>
            <h1>GET :: Fruits List</h1>
            <table border="1" style={{width: "60%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Emoji</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((fruit, idx) => 
                        <tr key={idx} style={{textAlign: "center"}}>
                            <td>{fruit.name}</td>
                            <td>{fruit.color}</td>
                            <td>{fruit.emoji}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

