import React from 'react'
import {Navbar , Nav,Container} from 'react-bootstrap';
import { Link,useHistory  } from 'react-router-dom';
import {FiMenu } from 'react-icons/fi';
export default function Homenav({shwoBox}) {
  const myBox=()=>{
    console.log(shwoBox);
    shwoBox()
  }
    return (
    <div className="container-fluid">
        <Navbar collapseOnSelect expand="lg"   className="custom-navbar" variant="light">
  <Container>
  <Navbar.Brand className="float-left" href="#home">Anti Medi Care</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" >
    <FiMenu color={'#fff'} size={30}/>
    </Navbar.Toggle>

  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav  className="ml-auto">
    
      {/* <Nav.Link to="/login">Login / Register</Nav.Link> */}
      <Link className="nav-link active" to="/category">Category</Link>
      
    </Nav>
  
  </Navbar.Collapse>
  </Container>
</Navbar>
</div>
    )
}
