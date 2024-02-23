import React,{useState} from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

   const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pic,setPic]=useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
  const [password,setPassword]=useState('')
  const [confirmPass,setConfirmPass]=useState('')
  const [message,setMessage]=useState(null)
  const [picMessage,setPicMessage]=useState(null)
  const [error,setError]=useState(false)  
  const [loading,setLoading]=useState(false)


  const submitHandler = async(e)=>{
    e.preventDefault();

       if(password!==confirmPass){
        setMessage('Passwords do not match')
    
       }
       else{
              setMessage(null)
              try {
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                };
              
                setLoading(true);
                const response = await axios.post('http://localhost:7000/api/user', { name, email, password, pic }, config);
              
                if (response.data) {
                  console.log(response.data);
                  localStorage.setItem('userInfo', JSON.stringify(response.data));
                   navigate('/mynotes');
                } else {
                  console.error('Response does not have a data property:', response);
                  setError('Unexpected response from the server');
                }
              } catch (error) {
                setError(error.response?.data?.error || 'An unexpected error occurred');
              } finally {
                setLoading(false);
              }
              
       }
           
  };


  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage('Please select an image');
    }
    setPicMessage(null);
  
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'noteapp');
      data.append('cloud_name', 'drz2uk3vm');
  
      fetch('https://api.cloudinary.com/v1_1/drz2uk3vm/image/upload', {
        method: 'post',
        body: data, 
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.url) {
            setPic(result.url.toString());
          } else {
            console.error('Error uploading image to Cloudinary:', result);
            setPicMessage('Error uploading image to Cloudinary');
          }
        })
        .catch((err) => {
          console.log(err);
          setPicMessage('Error uploading image to Cloudinary');
        });
    } else {
      return setPicMessage('Please select an image');
    }
  };
  
  return (

    <MainScreen title='REGISTER'>
    <div className='loginContainer'>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
     {loading &&  <Loading/>}
      <Form onSubmit={submitHandler} >
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
       
          placeholder='Enter Name'/>
      </Form.Group>

      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
         value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter Email'/>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}      
          onChange={(e)=>setPassword(e.target.value)}
          
          placeholder='Enter Password'/>
      </Form.Group>

      <Form.Group controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
         value={confirmPass}
          onChange={(e)=>setConfirmPass(e.target.value)}
          placeholder='Confirm Password'/>
      </Form.Group>
{picMessage &&( <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>)}
<Form.Group controlId="pic">
  <Form.Label>Profile picture</Form.Label>
  <Form.Control
    onChange={(e) => postDetails(e.target.files[0])}
    type="file"
    Label="upload profile picture"
    custom
    placeholder="Select a profile picture"
  />
</Form.Group>
    <Button variant='primary' type='submit' className='mt-3'>Submit</Button>
      </Form>
  </div>
  </MainScreen>
  )
}

export default RegisterScreen
