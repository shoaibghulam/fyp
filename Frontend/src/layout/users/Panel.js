import React from 'react'
import {  Route,Redirect } from 'react-router-dom';

import PanelNavbar from './PanelNavbar';
import Footer from './Footer';
export default function Panel(props) {
    return (
        <>
         
{localStorage.getItem("vendorToken") !== null ?
<section>
   <PanelNavbar />
   
   <Route  path={props.path} component={props.comp} />  
   <Footer /> 
   </section>
: 
<Redirect to="/vendor_login" />
}
      
        </>
    )
}
