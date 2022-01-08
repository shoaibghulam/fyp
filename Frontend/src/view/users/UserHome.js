import React,{useEffect,useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
import Finder from '../../components/Finder';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
const  UserHome=() =>{
  let token = `Bearer ` + localStorage.getItem("usertoken")
  const [data,setData]=useState([]);
  const [modalData,setModalData]=useState([]);
  const[dataPk,setDataPk]=useState('')
  const[LocationTitle,setLocationTitle]=useState('')
  const[Lititude,setLititude]=useState('')
  const[Longitude,setLongitude]=useState('')
  const[ContactNo,setContactNo]=useState('')
  const[Description,setDescription]=useState('')
  const[Address,setAddress]=useState('')
  const[WebsiteLink,setWebsiteLink]=useState('')
  const[ModalId,setModalId]=useState('')
  const[ChangeStatus,setChangeStatus]=useState('')
  const locationData=(data)=>{
    setAddress(data)
 
    
   
  }
  const latLng=(e)=>{
    setLititude(e.lat)
    setLongitude(e.lng)
 
  }
  // add location start
  const addLocation=(e)=>{

   e.preventDefault();
   var formdata = new FormData();
   formdata.append("LocationTitle",LocationTitle);
   formdata.append("Lititude",Lititude);
   formdata.append("Longitude",Longitude);
   formdata.append("ContactNo",ContactNo);
   formdata.append("Description",Description);
   formdata.append("Address",Address);
   formdata.append("ModalId",ModalId);
   formdata.append("WebsiteLink",WebsiteLink);
   axios({
    method: 'POST',
    url: `${url.url}/api/agencylocation`,
    data: formdata,
    headers: {

      Authorization: token,

    },
  })
    .then((response) => {
    var data= response.data;
    if(data.status==true){
      allData();
    window.$('.close').click()
    e.target.reset();
    swal("successfully!", data.message, "success");


  }
  else {

    swal("Incorrect!", data.message, "warning");
  
  
  }
    }, (error) => {
      console.log(error);
      
    });
 
  }
  // add location end
  // Edit location start
  const editLocation=(e)=>{

   e.preventDefault();
   var formdata = new FormData();
   formdata.append("LocationTitle",LocationTitle);
   formdata.append("Lititude",Lititude);
   formdata.append("Longitude",Longitude);
   formdata.append("ContactNo",ContactNo);
   formdata.append("Description",Description);
   formdata.append("Address",Address);
   formdata.append("ModalId",ModalId);
   formdata.append("WebsiteLink",WebsiteLink);
   axios({
    method: 'PUT',
    url: `${url.url}/api/agencylocation/${dataPk}`,
    data: formdata,
    headers: {

      Authorization: token,

    },
  })
    .then((response) => {
    var data= response.data;
    if(data.status==true){
      allData();
    window.$('.close').click()
    e.target.reset();
    swal("successfully!", data.message, "success");


  }
  else {

    swal("Incorrect!", data.message, "warning");
  
  
  }
    }, (error) => {
      console.log(error);
      
    });
 
  }
  // Edit location 

  // Change Status location end
 // Delete Modal Modal Api Start
 const deleteLocation=(e)=>{
 

  axios({
    method: 'DELETE',
    url: `${url.url}/api/agencylocation/${e}`,
  
    headers: {

      Authorization: token,

    },
  })
    .then((response) => {
    var data= response.data;
    if(data.status==true){
      allData();
 
    swal("successfully!", data.message, "success");


  }
  else {

    swal("Incorrect!", data.message, "warning");
  
  
  }
    }, (error) => {
      console.log(error);
      
    });
  }
  // delet Modal APi End
  // get modal dropdown end
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/agencylocation`,
      
      headers: {
  
        Authorization: token,
        
      },
    })
    .then((response) => {
      var data= response.data;
      if(data.status==true){
        if(data.data.length>0 || data.model.length>0){
          setModalData(data.model);

          setData(data.data);
          console.log("my data",data)
        }
      
  
  
    }
    else {
     
      swal("Incorrect!", data.message, "warning");
    
    
    }
      }, (error) => {
        console.log(error);
        
      });
  }

  // effect start
  useEffect(()=>{
    allData();
  },[data.length])
    return (
        <>
  
      {/* BEGIN: Content*/}
      <div className="app-content content ">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2">
              <div className="row breadcrumbs-top">
                <div className="col-12">
                  <h2 className="content-header-title float-left mb-0">Coordinates</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Modal Data
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
           <button className="btn btn-primary" data-toggle="modal" data-target="#modals-slide-in">Add Coordinates</button>
        
            </div>
          </div>
          <div className="content-body">
         
            {/* Striped rows start 9999*/}
            <div className="row" id="table-striped">
              <div className="col-12">
                <div className="card">
                 
                  <div className="card-body p-0 m-0">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
         
                      <tr>
                       
                          <th>Title</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Contact No</th>
                          <th>Description</th>
                           <th>Address</th>
                          <th>Modal</th>
                          <th>User</th>
                          <th>Website</th>
                          <th>Status</th>
                      
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody >
                      









                        {data.map((e)=>(
 <tr>
 <td>
 {e.LocationTitle}
  
</td>
 <td>{e.Lititude}</td>

 <td>{e.Longitude}</td>
 <td>{e.ContactNo}</td>
 <td> <a href="javascript:void(0)" onClick={()=>setDescription(e.Description)} data-toggle="modal" data-target="#modal-desc">View Description</a></td>
 <td>{e.Address}</td>
 <td>{e.ModalId['ModalTitle']}</td>
 <td>{e.UserId['AgencyName']}</td>
 <td><a href={e.WebsiteLink}>{e.WebsiteLink}</a></td>
 <td>
     {e.Status =='pending' ?
     <span className="badge badge-pill badge-light-info mr-1">Pending</span>
     : e.Status =='active' ?
     <span className="badge badge-pill badge-light-primary mr-1">Active</span>
     :
     <span className="badge badge-pill badge-light-danger mr-1">Disable</span>
     }
     </td>
 <td>
   <div className="dropdown">
     <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
     <BiDotsVertical size={35} />
     </button>
     <div className="dropdown-menu">
       <a className="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#modals-slide-edit"
        onClick={()=>{
          

          setDataPk(e.LocationId)
          setLocationTitle(e.LocationTitle)
          setLititude(e.Lititude)
          setLongitude(e.Longitude)
          setContactNo(e.ContactNo)
          setDescription(e.Description)
          setAddress(e.Address)
          setModalId(e.ModalId['ModalId'])
          setWebsiteLink(e.WebsiteLink)
        }}
       >
         <i data-feather="edit-2" className="mr-50" />
         <span>Edit</span>
       </a>
       <a className="dropdown-item" href="javascript:void(0);" onClick={()=>deleteLocation(e.LocationId)}>
         <i data-feather="trash" className="mr-50" />
         <span>Delete</span>
       </a>
      
     </div>
   </div>
 </td>
</tr>
                        ))}
                       
                 
                      </tbody>
                    </table>
                  </div>
                  </div>
                 
                </div>
              </div>
            </div>
            {/* Striped rows end 9999*/}
           
       
          
    
          </div>
        </div>
      </div>
      {/* END: Content*/}


          {/* Modal to add new user starts*/}
          <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-in">
        <div className="modal-dialog">
            
          <form className="add-new-user modal-content pt-0" onSubmit={addLocation}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Locations </h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Title</label>
                <input type="text" className="form-control dt-full-name" placeholder="John Doe" name="user-fullname" aria-label="Modal Title" onChange={(e)=>setLocationTitle(e.target.value)} value={LocationTitle} required/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Address</label>
                {/* <input type="text"  className="form-control dt-full-name" placeholder="Address"  onChange={(e)=>setAddress(e.target.value)} value={Address} required/> */}
                <Finder  currentAddress={locationData} latLng={latLng} />
              </div>

              <div className="form-group d-none">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Latitude</label>
                <input type="number" step="0.00001" className="form-control dt-full-name"  placeholder="Latitude" onChange={(e)=>setLititude(e.target.value)} value={Lititude} required/>
              </div>

              <div className="form-group d-none">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Longitude</label>
                <input type="number" className="form-control dt-full-name"  placeholder="Longitude" step="0.00001" onChange={(e)=>setLongitude(e.target.value)} value={Longitude} required/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Contact No</label>
                <input type="text"  className="form-control dt-full-name" placeholder="Contact No" onChange={(e)=>setContactNo(e.target.value)} value={ContactNo} required />
              </div>
              




             
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Website Link</label>
                <input type="text" className="form-control dt-full-name"  placeholder="Website Link" onChange={(e)=>setWebsiteLink(e.target.value)} value={WebsiteLink} required />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Description</label>
                {/* <textarea placeholder="Description Here"  className="form-control dt-full-name" onChange={(e)=>setDescription(e.target.value)} value={Description} required  /> */}
                <ReactQuill value={Description}
                  onChange={(e)=>setDescription(e)} />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Modal</label>
               <select className="form-control" onChange={(e)=>setModalId(e.target.value)} value={ModalId} required>
                 <option >Select Modal name</option>
                 {modalData.map((e)=>(
                   <option value={e.ModalId}>{e.ModalTitle}</option>

                 ))}
               </select>
              </div>

        
             
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal to add new user Ends*/}
        
          {/* Modal to edit new user starts*/}
          <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-edit">
        <div className="modal-dialog">
            
          <form className="add-new-user modal-content pt-0" onSubmit={editLocation}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Edit Locations </h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Title</label>
                <input type="text" className="form-control dt-full-name" placeholder="John Doe" name="user-fullname" aria-label="Modal Title" onChange={(e)=>setLocationTitle(e.target.value)} value={LocationTitle} required/>
              </div>
    
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Address</label>
                {/* <input type="text"  className="form-control dt-full-name" placeholder="Address"  onChange={(e)=>setAddress(e.target.value)} value={Address} required/> */}
                <Finder  currentAddress={locationData} latLng={latLng} />
              </div>
              <div className="form-group d-none">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Latitude</label>
                <input type="number" className="form-control dt-full-name"  placeholder="Latitude" step="0.00001" onChange={(e)=>setLititude(e.target.value)} value={Lititude} required/>
              </div>

              <div className="form-group d-none">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Longitude</label>
                <input type="number" className="form-control dt-full-name"  placeholder="Longitude" onChange={(e)=>setLongitude(e.target.value)} value={Longitude} step="0.00001" required/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Contact No</label>
                <input type="text"  className="form-control dt-full-name" placeholder="Contact No" onChange={(e)=>setContactNo(e.target.value)} value={ContactNo} required />
              </div>
              




             
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Website Link</label>
                <input type="text" className="form-control dt-full-name"  placeholder="Website Link" onChange={(e)=>setWebsiteLink(e.target.value)} value={WebsiteLink} required />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Description</label>
                {/* <textarea placeholder="Description Here"  className="form-control dt-full-name" onChange={(e)=>setDescription(e.target.value)} value={Description} required  /> */}
                <ReactQuill value={Description}
                  onChange={(e)=>setDescription(e)} />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Modal</label>
               <select className="form-control" onChange={(e)=>setModalId(e.target.value)} value={ModalId} required>
                 <option >Select Modal name</option>
                 {modalData.map((e)=>(
                   <option value={e.ModalId}>{e.ModalTitle}</option>

                 ))}
               </select>
              </div>

        
             
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal to edit new user Ends*/}
         
        
           
         {/* Modal to edit new user starts*/}
         <div className="modal modal-slide-in new-user-modal fade" id="modal-desc">
        <div className="modal-dialog ">
            
          <form className="add-new-user modal-content pt-0" >
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Description </h5>
            </div>
            <div className="modal-body flex-grow-1">
          <div className="mt-4"  dangerouslySetInnerHTML={{__html:Description}}>

          </div>
              
            </div>
          </form>
        </div>
      </div>
      {/* Modal to edit new user Ends*/}
        
        </>
    )
}
export default UserHome;