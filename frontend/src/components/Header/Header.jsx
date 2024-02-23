import React from 'react'
import {Container ,Form ,Nav,Navbar,NavDropdown, FormControl} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

  const navigate= useNavigate()

  return (
    
    <Navbar bg='primary' variant='dark' expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand ><Link to='/'> Take-notes </Link> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='m-auto'>
          <Form inline>
           <FormControl type='text' placeholder='Serach' className='mr-sm-2'/>
          </Form>
        </Nav>
        <Nav >
          <Nav.Link href='/mynotes' > <Link to='/mynotes'>
          My Notes
          </Link>
            </Nav.Link>
         
          <NavDropdown title="Abhishek" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
            
            <NavDropdown.Item onClick={()=>{localStorage.removeItem("userInfo")
                             navigate('/')
          }}> Logout </NavDropdown.Item>
           
          
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
