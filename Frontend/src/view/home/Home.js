import React,{useEffect,useState} from 'react';
import { Modal} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import url from '../../baseUrl';
import axios from 'axios';
import {AiFillCloseCircle ,AiFillContacts } from 'react-icons/ai';
import {BiMap } from 'react-icons/bi';
import {FaFirefoxBrowser } from 'react-icons/fa';
import Loader from '../../components/Loader'

import Homenav from '../../layout/home/Homenav';
import {Helmet} from "react-helmet";
import { useLocation } from 'react-router-dom'

const Home=()=> {
  const locat = useLocation()
  const {modalId , location}= locat.state;
  // const { from } = locat.state
  const [show, setShow] = useState(false);
  const [data,setData]=useState([]);
  const[fullWidth,setFullWidth]=useState(false);
  const [singleData,setSingleData]=useState([]);
  const [loader,setLoader]=useState(true);
  const [locations,setLocations]=useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



//  all data modal start
const getAllLocation=(id,lat,lng)=>{
  console.log("my llaaa",id,lat,lng)
  var formdata = new FormData();
  formdata.append("id",id);
  formdata.append("lat",lat);
  formdata.append("lng", lng);
  console.log("THe form is",formdata)
  axios({
    method: 'POST',
    url: `${url.url}/api/nearlocation`,
    data: formdata,
    
   
  })
  .then((response) => {
    var data= response.data;
      console.log("the response is ",data)
     setLocations(data)
    }, (error) => {
      console.log(error);
      
    });
}
const allData=async()=>{
  axios({
    method: 'GET',
    url: `${url.url}/api/allmodels`,
    
   
  })
  .then((response) => {
    var data= response.data;
   
     setData(data.data)
    }, (error) => {
      console.log(error);
      
    });
}
const showBox=()=>{
  handleShow()
}

    useEffect(()=>{
      getAllLocation(modalId,location.coordinates.lat,location.coordinates.lng)
      console.log("the props is ",location)
      setTimeout(()=>{
        setLoader(false)

      },3000)
  //  alert(location.coordinates.lat)
  //  console.log(location.coordinates)

     allData();
   
 },[data.length])

    return(
  <>
{/* {loader ? <Loader /> :null } */}
<Helmet>
  <title>Anti Medicare System</title>
</Helmet>
 <Homenav shwoBox={showBox}/>

<section className="">
<div style={{ height: '92vh', width: '100%', padding:'0', margin:'0' }}>
         <GoogleMapReact
         
        
          defaultCenter={location.coordinates}
         
          defaultZoom={13}
          bootstrapURLKeys={{
            key: 'AIzaSyAbnkyiEEVFi1tGsTNc1TmWpRmLbFHSqAs',
            language: 'en',
            
            libraries:['places', 'geometry', 'drawing', 'visualization'],
           
          }}
        > 
          <div
            lat={location.coordinates.lat}
            lng={location.coordinates.lng}
        
          > 
         
              <img src="assets/current.png"/>
              </div>
          {locations.map((e)=>(
 <div
 className="pin"
 key={e.LocationId}
 lat={e.Lititude}
 lng={e.Longitude}
 onClick={()=>{ setSingleData(e)}}
 data-toggle="modal" data-target="#modal-desc"
> 
    <img src="assets/marker.png" style={{margin:0, padding:0,}}/> <br></br>
  <span className="text-bold">{e.LocationTitle}</span>
   </div>
          ))}
         
        
        </GoogleMapReact> 
      </div>

 {/* Modal to edit new user starts*/}
 <div className="modal modal-slide-in new-user-modal fade" id="modal-desc">
        <div className="modal-dialog modal-full">
            
          <form className="add-new-user modal-content pt-0" >
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Location </h5>
            </div>
            <div className="modal-body flex-grow-1">
          <div className=""  >
          <div className=" ">
    <h1 className="text-center mb-3">{singleData.LocationTitle}</h1>
    <div className="mb-4" dangerouslySetInnerHTML={{__html: singleData.Description}}></div>
  
    <ul className='list-unstyled info-quote'>
      <li><strong><BiMap size={20} /> Address:</strong>{singleData.Address}</li>
      <li><strong><AiFillContacts size={20} /> Contact NO:</strong> {singleData.ContactNo}</li>
      {/* <li><strong>Email:</strong> {singleData.UserId.Email}</li> */}
      <li><strong><FaFirefoxBrowser size={20} /> Website: </strong><a href={singleData.WebsiteLink}>{singleData.WebsiteLink}</a></li>
     
    </ul>
  </div>
          </div>
              
            </div>
          </form>
        </div>
      </div>
</section>
  </>
    )

}
export default Home;