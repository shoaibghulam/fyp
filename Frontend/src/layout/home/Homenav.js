import React from 'react'
import {Navbar , Nav,Container} from 'react-bootstrap';

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
    <Nav className="ml-auto">
      <Nav.Link href="javascript:void(0)" onClick={()=>myBox()}>Category</Nav.Link>
      <Nav.Link href="#features">Login / Register</Nav.Link>
      
    </Nav>
  
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
