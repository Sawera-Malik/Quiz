import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import '../style/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
function Login() {
  const navigate = useNavigate();
const [usertype, setUsertype] = useState('');
  useEffect(()=>{
    const fetchData = async() => {
const res = await axios.get("http://localhost:1000/users");
setUsertype(res.data.userType);
    }
    fetchData();
  },[])

  const handleLogin = async (values) => {
    const { username, userType } = values;
    await axios.post("http://localhost:1000/users", { username, userType });
    if (userType === 'user') {
      alert(`${username} Start the Quiz`);
      navigate('/question', { state: { username } })
    } else if (userType === 'admin' && username==='Sawera') {
      navigate('/admin')
    }else{
      alert("User is not Admin")
    }
    console.log("Form values: ", username);
    console.log("Form type: ", userType);

  };
  return (
    <div>
      <h1 className='game' >Quiz Game</h1>
      <Form onFinish={handleLogin} className='form' >
        <h3>Start The Quiz</h3>
        <Form.Item label="UserType" name="userType" rules={[{ required: true, message: 'Please input your username!' }]}  >
          <Select placeholder="Select User Type">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>

        </Form.Item>
       {
        usertype==='admin' &&(
          <div>Secrete code</div>
        )
       }
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}  >

          <Input className='input' placeholder='name' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Start
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default Login
