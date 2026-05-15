import React, { useState, useRef } from 'react';
import { postFetchData } from '../util/fetchDatas.js';

export default function CompLogin() {
    const idRef = useRef(null);
    const pwdRef = useRef(null);
    const [formData, setFormData] = useState({id:'', pwd:''});

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if(idRef.current.value === '') {
            alert("아이디를 입력해주세요");
            idRef.current.focus();
        } else if(pwdRef.current.value === '') {
            alert("패스워드를 입력해주세요");
            pwdRef.current.focus();
        } else {
            console.log(formData);  
            const jsonData = await postFetchData("/users/login", formData); 
            jsonData.result ? alert("⭕로그인 성공!!") : alert("❌로그인 실패!!");
        }
    }

    return (
        <div style={{width:"1000px", margin:"auto"}}>
            <h1>Post :: 로그인 폼</h1>
            <form onSubmit={handleFormSubmit}>
                <ul>
                    <li>
                        <label htmlFor="id">아이디</label>
                        <input  type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                ref={idRef}
                                onChange={handleFormChange}
                        />
                    </li>
                    <li>
                        <label htmlFor="pwd">패스워드</label>
                        <input  type="password"
                                id="pwd"
                                name="pwd"
                                value={formData.pwd}
                                ref={pwdRef}
                                onChange={handleFormChange}
                        />
                    </li>
                    <li>
                        <button>로그인</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

