import React, { useEffect, useState } from 'react'
import { Button, Card,Badge } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import axios from 'axios'


function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );




  return (
    <button
      type="button"
      style={{ backgroundColor: 'none', border: 'none'}}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}


const MyNotes = () => {

     const [notes,setNotes ]=useState( []);




   const deleteHandler=(id)=>{
    if( window.confirm('Are you sure?')){

   }
  }

  const fetchNotes = async()=>{
    const {data}=await axios.get("http://localhost:5000/api/notes");
        setNotes(data);
        console.log(data);
  }

  useEffect(() =>{  
         fetchNotes();
  },[])



  return (

    <MainScreen title="Welcome Back Abhishek Bahukhandi">
      <Link to='createnote'>
        <Button style={{marginLeft:10,marginBottom:6}} size='lg' >
          Create New Note 
        </Button>
        </Link>
        {
          notes.map(note=>(
            <Accordion key={note._id} defaultActiveKey="0">
              
<Card style={{margin:10}}>
          <Card.Header style={{display:"flex"}}>
             <span style={{
                color:'black',
                textDecoration:'none',
                flex:1,
                cursor:'pointer',
                alignSelf:'',
                fontSize : 18,
              
              
             }} >
             
             <CustomToggle eventKey="0" as={Card.Text}  variant="link"  >{note.title}</CustomToggle>
             
               
              
              
              </span> 
          <div>
            <Button href={`/note/${note._id}`}>Edit</Button>
            <Button variant="danger" className='mx-2' onClick={()=>deleteHandler(note._id)}>Delete</Button>
          </div>
          </Card.Header>


          <Accordion.Collapse eventKey="0">
          <Card.Body>
            <h4>
        
<Badge bg="success">Catergory-{note.category}</Badge>

            </h4>
          <blockquote className="blockquote mb-0">
          <p>
          {note.content}
          </p>
          <footer className="blockquote-footer">
            created on -date
          </footer>
        </blockquote>

          </Card.Body>
        </Accordion.Collapse>
          
         


        </Card>

        </Accordion>
          
            


          )

          )
        }
        
    
      
       </MainScreen>
  )
}

export default MyNotes
