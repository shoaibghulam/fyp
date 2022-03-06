import React from 'react'
import {  Route,Redirect } from 'react-router-dom';

import Model from '../../view/dashboard/Model';
import Navbar from './Navbar';
import Footer from './Footer';
export default function Main(props) {
    return (
        <>
         
{localStorage.getItem("admintoken") !== null ?
<section>
   <Navbar />
   
   <Route  path={props.path} component={props.comp} />  
    <Footer />
   </section>
: 
<Redirect to="/404" />
}
      
        </>
    )
}
