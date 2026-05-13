import React from 'react';
import CompGet from './components/CompGet.jsx';
import CompGetParam from './components/CompGetParam.jsx';
import CompPost from './components/CompPost.jsx';
import CompLogin from './components/CompLogin.jsx';
import CompUsers from './components/CompUsers.jsx';

export default function App() {
  return (
    <div>
      <CompUsers />
      <hr />
      <CompLogin />
      <hr />
      <CompPost />
      <hr />
      <CompGet />
      <hr/>
      <CompGetParam />      
    </div>
  );
}

