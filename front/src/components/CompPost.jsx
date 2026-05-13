import React, { useRef, useState } from 'react';
import { postFetchData } from '../util/fetchDatas.js';

export default function CompPost() {
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const initForm = {name:'', address:''};
    const [form, setForm] = useState(initForm);

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();

        if(nameRef.current.value === '') {
            alert('이름을 입력해주세요');
            nameRef.current.focus();
        } else if(addressRef.current.value === '') {
            alert('주소를 입력해주세요');
            addressRef.current.focus();
        } else {            
            const jsonData = await postFetchData('/api/post', form);
            console.log('result ->', jsonData.result);
            jsonData.result? alert('등록 성공⭕!!') : alert('등록 실패❌!!');            
        }
    }

    return (
        <div style={{width:"1000px", margin:"auto"}}>
            <h1>Post :: 주소 등록 폼</h1>
            <form onSubmit={handleFormSubmit}>
                <ul>
                    <li>
                        <label htmlFor="name">이름</label>
                        <input  type="text" 
                                id="name" 
                                name="name"
                                ref={nameRef}
                                value={form.name}
                                onChange={handleFormChange}
                                />
                    </li>
                    <li>
                        <label htmlFor="address">주소</label>
                        <input  type="text" 
                                id="address" 
                                name="address"
                                ref={addressRef}
                                value={form.address}
                                onChange={handleFormChange}
                                />
                    </li>
                    <li>
                        <button type="submit">등록하기</button>
                        <button type="button"
                                onClick={()=>{setForm(initForm)}}>다시쓰기</button>                        
                    </li>                    
                </ul>
            </form>
        </div>
    );
}

