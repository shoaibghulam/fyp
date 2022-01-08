import React,{useEffect,useState} from 'react';
import {Navbar , Nav,Container, Modal} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import url from '../../baseUrl';
import axios from 'axios';
import {AiFillCloseCircle ,AiFillContacts } from 'react-icons/ai';
import {BiMap } from 'react-icons/bi';
import {FaFirefoxBrowser } from 'react-icons/fa';
import Loader from '../../components/Loader'
import useGeoLocation from "../../components/useGeoLocation";
import Homenav from '../../layout/home/Homenav';

const Home=()=> {
  const [show, setShow] = useState(true);
  const [data,setData]=useState([]);
  const[fullWidth,setFullWidth]=useState(false);
  const [singleData,setSingleData]=useState([]);
  const [loader,setLoader]=useState(true);
  const [locations,setLocations]=useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const location = useGeoLocation();
//  all data modal start
const getAllLocation=(id)=>{

  var formdata = new FormData();
  formdata.append("id",id);
  formdata.append("lat",location.coordinates.lat);
  formdata.append("lng", location.coordinates.lng);
  axios({
    method: 'POST',
    url: `${url.url}/api/nearlocation`,
    data: formdata,
    
   
  })
  .then((response) => {
    var data= response.data;
    console.log("myloc is ",data)
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
      setTimeout(()=>{
        setLoader(false)

      },3000)
  //  alert(location.coordinates.lat)
   

     allData();
   
 },[data.length, location])

    return(
  <>
{/* {loader ? <Loader /> :null } */}

 <Homenav shwoBox={showBox}/>

<section className="container-fluid bg-dark">
    <div className="row p-0">
      
    <div className={fullWidth ? "col-md-8 p-0" :"col-md-12 p-0"}>
    
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
 onClick={()=>{setFullWidth(true); setSingleData(e)}}
> 
  <span className="text-primary ">{e.Address}</span>
    <img src="assets/marker.png" style={{margin:0, padding:0,}}/>
   </div>
          ))}
         
        
        </GoogleMapReact> 
      </div>

    </div>
 <div className={fullWidth ? "d-block col-md-4 fullwidth" :"d-none"}>
  <a href="javascript:void(0)" onClick={()=>setFullWidth(false)}><AiFillCloseCircle size={30} className="my-icon"/></a>
  <div className="container mt-4 ">
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

{/* modal start */}
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-light text-center">Select Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* cards start */}
          <div className="container">
        <div className="row">
          {data.map((e)=>(
  <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" onClick={()=>{getAllLocation(e.ModalId); handleClose()}}>
  <div className="card shadow">
    <img src={`${url.url}${e.ModalThumbnail}`} className="card-img-top" style={{height:'215px'}}/>
    <div className="card-body">
      <h2 className="card-title">{e.ModalTitle}</h2>
      <p className="card-text">{e.ModalDescription}</p>
    </div>
    
  </div>
</div>
          ))}
      
       
        </div>
      </div>
          {/* cards end */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
{/* modal end*/}
</section>
  </>
    )

}
export default Home;