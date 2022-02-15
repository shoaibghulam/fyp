import react,{useEffect,useState} from 'react';
import axios from 'axios';
import url from '../../baseUrl';
import swal from 'sweetalert';
import {AiFillContacts } from 'react-icons/ai';
import {BiMap , BiDollar } from 'react-icons/bi';
import {FaFirefoxBrowser } from 'react-icons/fa';
import { useLocation,Link,useHistory} from 'react-router-dom';
import GoogleMapReact from "google-map-react";
import $ from 'jquery';
import '../../css/welcome.css'

const Order=()=>{
  const google = window.google;
  const history= useHistory()

    let token = `Bearer ` + localStorage.getItem("usertoken")
    const locat = useLocation()
    const {id, location}= locat.state;
    const  [currentLocation,setCurrentLocation]=useState({ lat: 40.756795, lng: -73.954298 })
    const [data,setData]=useState([]);
    const [qty,setQty]=useState(1);
    const [totalPrice,setTotalPrice]=useState(data.Price);
    const [price,setPrice]=useState(0);
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [contactNo,setContactNo]=useState('')
    const [address,setAddress]=useState('')
    const allData=async()=>{
       
        axios({
          method: 'GET',
          url: `${url.url}/api/order_now/${id}`,
          headers: {
  
            Authorization: token,
      
          },
          
         
        })
        .then((response) => {
          var data= response.data;
            
           setData(data.data)
           
           setTotalPrice(data.data.Price)
           setPrice(data.data.Price)

          }, (error) => {
            console.log(error);
            
          });
      }

      // add order Function start
    const AddOrder =(e)=>{
      e.preventDefault();
      
      var formdata = new FormData();
      
      
      formdata.append("FirstName", firstName);
      formdata.append("LastName", lastName);
      formdata.append("Email", email);
      formdata.append("Product", id);
      formdata.append("ContactNo", contactNo);
      formdata.append("Address", address);
      formdata.append("Price", price);
      formdata.append("Qty", qty);
      formdata.append("TotalPrice", totalPrice);
     
    
      axios({
          method: 'POST',
          url: `${url.url}/api/order_now`,
          data:formdata,
          headers: {

            Authorization: token,
      
          },
          })
          .then((response) => {
           
            var data=response.data;
         
          if(data.status==true){
            
      
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
      // add order Function end
      useEffect(()=>{
        window.$(document).ready(function(){
         $('div').removeClass('modal-backdrop')
        })
        allData();
     
   },[data.length])
  

  //  create react map route start
  const apiIsLoaded = (map, maps) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = location.coordinates;
    const destination = { lat:24.8920057, lng:67.0747154 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  //  create react map route end
    return(
        <>
        <div className="container-fluid">
        <section className="row">
           <div className="col-12 col-md-4 section-a">
              <div className="mt-6 text-center order-logo">
              <a href="javascript:void(0);" className="">
                      <svg viewBox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={70}>
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
                    <h3>{data.ProductTitle}</h3>
                    <div className="mb-4 mt-2 text-left" dangerouslySetInnerHTML={{__html: data.Description}}></div>
                <p className="text-left">
                <ul className='list-unstyled info-quote'>
      <li><strong><BiDollar size={20} /> Price:</strong>{data.Price}.Rs</li>
      <li><strong><BiMap size={20} /> Address:</strong>{data.Address}</li>
      <li><strong><AiFillContacts size={20} /> Contact NO:</strong> {data.ContactNo}</li>
      {/* <li><strong>Email:</strong> {data.UserId.Email}</li> */}
      <li><strong><FaFirefoxBrowser size={20} /> Website: </strong><a href={data.WebsiteLink}>{data.WebsiteLink}</a></li>
     
    </ul>
                </p>

              </div>
            
           </div>
           <div className="col-12 col-md-8 section-b">
               <div className="mt-0 text-center welcome-text">
               
             
        <div className="row">
        <div style={{ height: "200px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAbnkyiEEVFi1tGsTNc1TmWpRmLbFHSqAs"
            }}
            defaultCenter={location.coordinates}
            defaultZoom={11}
            center={location.coordinates}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          />
        </div>       
      </div>
            <div className="row mt-2">
              <div className="col-md-12 text-center">

              <h3 className="text-black">Please Fill you Basic Information</h3>
              </div>
         
            </div>
            <form onSubmit={AddOrder} className="custom-form text-left row">
    
    <div className="col-12 col-md-6 col-xl-6 form-group">
     <label>First Name</label>
     <input type="text"  value={firstName} onChange={(e)=>setFirstName(e.target.value)}   className="custom-input" placeholder="Enter First Name" required/>
    </div>
    <div className="col-12 col-md-6 col-xl-6 form-group">
     <label>Last Name</label>
     <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}   className="custom-input" placeholder="Enter Last Name" required/>
    </div>

    <div className="col-12 col-md-6 col-xl-6 form-group">
     <label>Email</label>
     <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  className="custom-input" placeholder="Enter Email" required/>
    </div>
    <div className="col-12 col-md-6 col-xl-6 form-group">
     <label>Contact No</label>
     <input type="text" value={contactNo} onChange={(e)=>setContactNo(e.target.value)}  className="custom-input" placeholder="Enter Contact No" required/>
    </div>
    <div className="col-12 col-md-9 col-xl-9 form-group">
     <label>Address</label>
     <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}  className="custom-input" placeholder="Enter Contact No" required/>
    </div>
    <div className="col-12 col-md-3 col-xl-3 form-group">
     <label>Quantity</label>
     <input type="Number" min={1} max={data.qty}  className="custom-input" placeholder="Enter Contact No" value={qty} onChange={(e)=>{setQty(e.target.value); setTotalPrice(e.target.value*data.Price)}}  required/>
    </div>
<div className="col-md-12">
  <p><b>Price: {data.Price}.Rs</b></p>
  <p><b>qty: {qty}</b></p>
  <p><b>Total Price: {totalPrice}.Rs</b></p>
</div>

     <div className="text-center mx-auto">

     <button type="submit" className="btn mx-auto  btn-outline-primary mr-1 data-submit">Complate Order</button>
     </div> 
 </form>
               </div>

           </div>
       </section>
        </div>
     
        </>
    )
}
export default Order;