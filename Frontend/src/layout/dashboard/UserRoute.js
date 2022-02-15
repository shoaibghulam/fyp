import React from 'react'
import {  Route,Redirect } from 'react-router-dom';

import Model from '../../view/dashboard/Model';
import Navbar from './Navbar';
export default function UserRoute(props) {
    return (
        <>
         
{localStorage.getItem("usertoken") !== null ?
<section>
  
   <Route  path={props.path} component={props.component} />   
   </section>
: 
<Redirect to="/" />
}
      
        </>
    )
}
