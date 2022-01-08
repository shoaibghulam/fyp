import React from 'react'
import {Navbar , Nav,Container} from 'react-bootstrap';
import { Link,useHistory  } from 'react-router-dom';
export default function Homenav({shwoBox}) {
  const myBox=()=>{
    console.log(shwoBox);
    shwoBox()
  }
    return (
        <Navbar collapseOnSelect className="custom-navbar" variant="light">
  <Container>
  <Navbar.Brand href="#home">Anti Medi Care</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav  className="ml-auto">
      <Nav.Link href="javascript:void(0)" onClick={()=>myBox()}>Category</Nav.Link>
      {/* <Nav.Link to="/login">Login / Register</Nav.Link> */}
      <Link className="nav-link active" to="/login">Login / Register</Link>
      
    </Nav>
  
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
