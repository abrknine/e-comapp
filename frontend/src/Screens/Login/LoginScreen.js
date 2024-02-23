  import React, { useEffect } from 'react'
  import MainScreen from '../../components/MainScreen'
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/Button';
  import './LoginScreen.css'
  import { Link } from 'react-router-dom';
  import { Col, Row } from 'react-bootstrap';
import { useState } from 'react'
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';


  const LoginScreen = () => {
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
   

  
   

  const  submitHandler= async(e)=>{
    e.preventDefault();
      try{ 
  const config   ={
    headers:{
      "Content-type":"application/json"
    }
  }
  
  setLoading(true);
  const {data} = await axios.post('http://localhost:7000/api/user/login ',{email,password},config);
      console.log(data);
      localStorage.setItem('userInfo',JSON.stringify(data));

   setLoading(false);
    }  
    catch (error){
      setError(error.response?.data?.error || 'An unexpected error occurred');
        setLoading(false);
      } finally{
        setLoading(false);
      
      }

  }

    return (
      
      <MainScreen title="LOGIN">
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
          {loading && <Loading/>}   
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail" className='formBasicEmail'>
          <Form.Label className='px-0 '>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />


          
        </Form.Group>

        <Form.Group  controlId="formBasicPassword" className="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder=" Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>

        
        <Button variant="primary" type="submit" className='my-3 mx-0'>
          Submit
        </Button>

      </Form>

    
        </div>
        <Row className='py-3'>
            <Col>
            New Customer?<Link to='/register'>Register Here</Link>
            </Col>
          </Row>

      </MainScreen>
    )
  }

  export default LoginScreen
