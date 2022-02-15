import react,{useEffect,useState} from 'react';
import axios from 'axios';
import url from '../../baseUrl';
import swal from 'sweetalert';
import { useHistory,Link} from 'react-router-dom';
import '../../css/welcome.css'
import {Tabs, Tab} from 'react-bootstrap'
const Welcome=()=>{
    const history = useHistory();
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [contactNo,setContactNo]=useState('')
    const [address,setAddress]=useState('')
    const [showForeget,setShowForget]=useState(false)

const clearInput=()=>{
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setContactNo('')
    setAddress('')
}
// user Registartion start
const useRegister = (e)=>{
    
    e.preventDefault();
    
    var formdata = new FormData();
    formdata.append("FirstName", firstName);
    formdata.append("LastName", lastName);
    formdata.append("Email",email);
    formdata.append("Password", password);
    formdata.append("ContactNo", contactNo);
    formdata.append("Address", address);
   
    axios({
        method: 'POST',
        url: `${url.url}/api/userregister`,
        data:formdata
        })
        .then((response) => {
         
          var data=response.data;
       
        if(data.status==true){
            clearInput()
          swal("successfully!", data.message, "success");
          
          history.push("/")
        }
        else {
      
          swal("Incorrect!", data.message, "warning");
        
        
        }
        console.log(response.data);
        }, (error) => {
        console.log(error);
        });
}
// user Registartion end
// User Login start
const useLogin = (e)=>{
   
  e.preventDefault();
  var formdata = new FormData();
 
  formdata.append("Email", email);
  formdata.append("Password", password);
 

  axios({
      method: 'POST',
      url: `${url.url}/api/login`,
      data:formdata
      })
      .then((response) => {
       
        var data=response.data;
     
      if(data.status==true){
        
          localStorage.setItem('usertoken',data.token);
          localStorage.setItem('id',data.user.id)
          localStorage.setItem('Fullname',data.user.name)
  
        swal("successfully!", data.message, "success");

        history.push("/category")
      }
      else {
    
        swal("Incorrect!", data.message, "warning");
      
      
      }
      console.log(response.data);
      }, (error) => {
      console.log(error);
      });
}
// User Login end
    return(
        <>
        <div className="container-fluid">
        <section className="row">
           <div className="col-12 col-md-6 section-a">
              <div className="mt-6 text-center welcome-logo">
              <a href="javascript:void(0);" className="">
                      <svg viewBox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={118}>
                        <defs>
                          <linearGradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
                            <stop stopColor="#000000" offset="0%" />
                            <stop stopColor="#FFFFFF" offset="100%" />
                          </linearGradient>
                          <linearGradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
                            <stop stopColor="#EEEEEE" stopOpacity={0} offset="0%" />
                            <stop stopColor="#FFFFFF" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                            <g id="Group" transform="translate(400.000000, 178.000000)">
                              <path className="text-primary" id="Path" d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z" style={{fill: 'currentColor'}} />
                              <path id="Path1" d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z" fill="url(#linearGradient-1)" opacity="0.2" />
                              <polygon id="Path-2" fill="#000000" opacity="0.049999997" points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325" />
                              <polygon id="Path-21" fill="#000000" opacity="0.099999994" points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338" />
                              <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994" points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288" />
                            </g>
                          </g>
                        </g>
                      </svg>
                      <h2 className="brand-text text-primary ml-1 xl-font">Anti Medi Care</h2>
                
                    </a>
                    <h3>Welcome to Anti Medi Care👋</h3>

              </div>
            
           </div>
           <div className="col-12 col-md-6 section-b">
             <div className="text-right mt-2 mr-auto">
               <Link className="btn btn-primary" to="/vendor_login">Vendor Login</Link>
             </div>
               <div className="mt-100 text-center welcome-text">
               <h1 className="text-black">Hello Welcome Back.</h1>
               <h4 className="text-black">Log in with your data that you entered during Your registration.</h4>

<div className="col-md-11 mx-auto my-tab">
{showForeget ?
    <form className="custom-form text-left">
<div className="form-group">

 <label>Email</label>
 <input type="email"  className="custom-input" placeholder="Enter Email" required/>
</div>


 <div className="text-center">

 <button type="submit" className="btn btn-outline-primary  mr-1 data-submit">Forget</button>
 <p className="forgetpassword text-left" onClick={()=>setShowForget(false)}>Login Account</p>
 </div> 
</form>
: 
<Tabs
  defaultActiveKey="login"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
  tabClassName="bg-info"
>
  <Tab eventKey="login" title="Login">
  <form onSubmit={useLogin} className="custom-form text-left">
     <div className="form-group">

      <label>Email</label>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="custom-input" placeholder="Enter Email" required/>
     </div>
    
     <div className="form-group">
      <label>Password</label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="custom-input" placeholder="Enter Password" required/>
      
     </div>
     <p className="forgetpassword" onClick={()=>setShowForget(true)}>Forget Password</p>
      <div className="text-center">

      <button type="submit" className="btn btn-outline-primary  mr-1 data-submit">Login</button>
      </div> 
  </form>
  </Tab>
  <Tab eventKey="registration" title="Registration">
  <form onSubmit={useRegister} id="regform" className="custom-form text-left row">
    
     <div className="col-12 col-md-6 col-xl-6 form-group">
      <label>First Name</label>
      <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="custom-input" placeholder="Enter First Name" required/>
     </div>
     <div className="col-12 col-md-6 col-xl-6 form-group">
      <label>Last Name</label>
      <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="custom-input" placeholder="Enter Last Name" required/>
     </div>

     <div className="col-12 col-md-6 col-xl-6 form-group">
      <label>Email</label>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="custom-input" placeholder="Enter Email" required/>
     </div>
    
     <div className="col-12 col-md-6 col-xl-6 form-group">
      <label>Password</label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="custom-input" placeholder="Enter Password" required/>
     </div>
     <div className="col-12 col-md-6 col-xl-6 form-group">
      <label>Contact No</label>
      <input type="text" value={contactNo} onChange={(e)=>setContactNo(e.target.value)}  className="custom-input" placeholder="Enter Contact No" required/>
     </div>
     <div className="col-12 col-md-6 col-xl-6 form-group">
     <label>Address</label>
      <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}  className="custom-input" placeholder="Enter Address" required/>
     </div>

      <div className="text-center mx-auto">

      <button type="submit" className="btn mx-auto  btn-outline-primary mr-1 data-submit">Register</button>
      </div> 
  </form>
  </Tab>
 
</Tabs>

}
</div>
               </div>

           </div>
       </section>
        </div>
     
        </>
    )
}
export default Welcome;