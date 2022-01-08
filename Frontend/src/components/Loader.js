import React from 'react';
// import './css/loader.css';
// import Logo from '../images/loader.png';
import Logo from '../images/loader2.gif';
const  Loader=()=> {
    return (
        <div>
           <div class="loading"><img className="load-img" src={Logo} /></div>

        </div>
    )
}
export default Loader;
