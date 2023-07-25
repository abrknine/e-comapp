import React from 'react'
import './Landingpage.css'
import { Container,Row,Button } from 'react-bootstrap'

const Landingpage = () => {
  return (
     <div className='main'>
    <Container>
 <Row>
     <div className='intro-text'>
    <div>
        <h1 className='title' >Welcome to Note Zipper</h1>
        <p className='subtitle' >One Safe Place for all your notes</p>
    </div>
    <div className='buttonContainer'>
        <a href="/login">
            <Button size="lg" className="landingbutton">
                Login
            </Button>
        </a>
        <a href="/register">
            <Button size='lg' className="landingbutton" variant="outline-primary" >
                Sign-Up 
            </Button>
        </a>

    </div>
    </div>
     </Row>
    </Container>
    </div>
  )
}

export default Landingpage
