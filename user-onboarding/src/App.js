import React, { useState } from "react";
import './App.css';
import Form from './Form.js'
import UserList from "./UserList";


function App() {
  const [users, setUsers] = useState([]);


  return (
    <div className="App">
      
       <Form users={users} setUsers ={setUsers}/>
       <UserList list={users}/>
    </div>
  );
}

export default App;
