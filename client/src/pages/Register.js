import { Button, Form, Input } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom'

const Register = () => {
    const handleSubmit =(value) =>{
        console.log(value);
    }
  return (
   <>
   <div className='register'>
   
    
     <img src="assets/ResLogo.png" alt=""/>
     <h2>REGISTER</h2>
    <Form layout='vertical' 
        onFinish={handleSubmit} 
        style={{fontWeight:'bold'}}
    >

        <Form.Item name="name" label="Name">
          <Input/>
        </Form.Item>
        <Form.Item name="userId" label="User ID">
          <Input/>
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type='password'/>
        </Form.Item>
        <div className="d-flex justify-content-between">
            <p>
                Already Register Please
                <Link to="/login"> Login Here !</Link>
            
            </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
         </div>
       </Form>
   </div>
   </>
  )
}

export default Register;