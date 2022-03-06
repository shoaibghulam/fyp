import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
const  Model=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
  const [UserPk,setUserPk]=useState('')
  const [AgencyName,setAgencyName]=useState('')
  const [Username,setUsername]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [ContactNo,setContactNo]=useState('')
  const [Address,setAddress]=useState('')
  const[ChangeStatus,setChangeStatus]=useState('')
  const[viewData,setViewData]=useState([])
   // add User Api Start
   const addUser=(e)=>{
   
    e.preventDefault();
    var formdata = new FormData();
  formdata.append("AgencyName",AgencyName);
  formdata.append("Username",Username);
  formdata.append("Email",Email);
  formdata.append("Password",Password);
  formdata.append("ContactNo",ContactNo);
  formdata.append("Address",Address);


  axios({
    method: 'POST',
    url: `${url.url}/api/register`,
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
  // add User API End
   // Update User Api Start
   const editUser=(e)=>{
   
    e.preventDefault();
    var formdata = new FormData();
  formdata.append("AgencyName",AgencyName);
  formdata.append("Username",Username);
  formdata.append("Email",Email);
  formdata.append("Password",Password);
  formdata.append("ContactNo",ContactNo);
  formdata.append("Address",Address);


  axios({
    method: 'PUT',
    url: `${url.url}/api/register/${UserPk}`,
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
  // Update User API End
  // Delete User Modal Api Start
  const deleteUser=(e)=>{
 

    axios({
      method: 'DELETE',
      url: `${url.url}/api/register/${e}`,
    
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
    // delet User APi End

      // Change Status  start
  const changeStatus=(e)=>{
    e.preventDefault();

   var formdata = new FormData();
   formdata.append("status",ChangeStatus);
   formdata.append("tab",'userstaus');
  
 
   axios({
    method: 'PUT',
    url: `${url.url}/api/locationstatus/${UserPk}`,
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
  // change status end
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/register`,
      
      headers: {
  
        Authorization: token,
        
      },
    })
    .then((response) => {
      var data= response.data;
      if(data.status==true){
        if(data.data.length>0){

          setData(data.data);
         
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
                  <h2 className="content-header-title float-left mb-0">Vendor</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Vendor
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
           <button className="btn btn-primary" data-toggle="modal" data-target="#modals-slide-in">Add Vendor</button>
        
            </div>
          </div>
          <div className="content-body">
         
            {/* Striped rows start 9999*/}
            <div className="row" id="table-striped">
              <div className="col-12">
                <div className="card">
                 
                  <div className="card-body p-0 m-0">
                  <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                  

                    <th>Agency Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Contact No</th>
                   
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                






                  {data.map((e)=>(
   <tr>
   <td>
    {e.AgencyName}
   </td>
   <td>{e.Username}</td>
   <td>
    {e.Email}
   </td>
   <td>
    {e.ContactNo}
   </td>
 
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
       <a className="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#modals-slide-view"
        onClick={()=>{
          
          setViewData(e);
        }}
       >
         <i data-feather="edit-2" className="mr-50" />
         <span>View</span>
       </a>
         <a className="dropdown-item" href="javascript:void(0);"
         data-toggle="modal" data-target="#modals-slide-edit"
         onClick={()=>{
          setUserPk(e.VendorId)
          setAgencyName(e.AgencyName)
          setUsername(e.Username)
          setEmail(e.Email)
          setPassword(null)
          setContactNo(e.ContactNo)
          setAddress(e.Address)
         }}
         >
           <i data-feather="edit-2" className="mr-50" />
           <span>Edit</span>
         </a>
         <a className="dropdown-item" href="javascript:void(0);" onClick={()=>deleteUser(e.VendorId)}>
           <i data-feather="trash" className="mr-50" />
           <span>Delete</span>
         </a>
         <a className="dropdown-item" href="javascript:void(0);"  data-toggle="modal" data-target="#modals-slide-status"
        onClick={()=>{
          setChangeStatus(e.Status)
          setUserPk(e.VendorId)
       
        }}
       >
         <i data-feather="trash" className="mr-50" />
         <span>Change Status</span>
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
          <form className="add-new-user modal-content pt-0" onSubmit={addUser}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">New User</h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
              
                <label>Agency Name</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setAgencyName(e.target.value)} value={AgencyName} required/>
              </div>
          
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setUsername(e.target.value)} value={Username} required/>
              </div>
      
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control dt-full-name"  onChange={(e)=>setEmail(e.target.value)} value={Email} required/>
              </div>
      
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control dt-full-name"  onChange={(e)=>setPassword(e.target.value)} value={Password} required/>
              </div>
              
              <div className="form-group">
                <label>Contact No</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setContactNo(e.target.value)} value={ContactNo} required/>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setAddress(e.target.value)} value={Address} required/>
              </div>
      
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal to add new user Ends*/}

           {/* User Edit*/}
      <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-edit">
        <div className="modal-dialog">
          <form className="add-new-user modal-content pt-0" onSubmit={editUser}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
              
                <label>Agency Name</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setAgencyName(e.target.value)} value={AgencyName} required/>
              </div>
          
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setUsername(e.target.value)} value={Username} required/>
              </div>
      
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control dt-full-name"  onChange={(e)=>setEmail(e.target.value)} value={Email} required/>
              </div>
      
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control dt-full-name"  onChange={(e)=>setPassword(e.target.value)} value={Password} />
              </div>
              
              <div className="form-group">
                <label>Contact No</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setContactNo(e.target.value)} value={ContactNo} required/>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control dt-full-name"  onChange={(e)=>setAddress(e.target.value)} value={Address} required/>
              </div>
      
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/*User Edit end*/}
          {/* Modal to edit new user starts*/}
          <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-status">
        <div className="modal-dialog">
            
          <form className="add-new-user modal-content pt-0" onSubmit={changeStatus}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Change Status </h5>
            </div>
            <div className="modal-body flex-grow-1">
           
              
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Modal</label>
               <select className="form-control"  name="status" onChange={(e)=>setChangeStatus(e.target.value)} value={ChangeStatus} required>
                 <option >Select Modal name</option>
                 <option value="active">Active</option>
                 <option value="disable">Disable</option>
                 <option value="pending">pending</option>
                
               </select>
              </div>

        
             
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal to edit new user Ends*/}
         {/* Modal to Viw Product Data starts*/}
         <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-view">
        <div className="modal-dialog modal-lg">
            
          <div className="add-new-user modal-content pt-0">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">View Details</h5>
            </div>
            <div className="modal-body flex-grow-1">
      

       
              <table className="model-table">
              





                <tr>
                  <th>ID</th>
                  <td>{viewData.VendorId}</td>
                </tr>
                <tr>
                  <th>Agency Name</th>
                  <td>{viewData.AgencyName}</td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>{viewData.Username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{viewData.Email}</td>
                </tr>
                <tr>
                  <th>Contact No</th>
                  <td>{viewData.ContactNo}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{viewData.Address}</td>
                </tr>
                <tr>
                  <th>Registration Date</th>
                  <td>{viewData.RegistrationDate}</td>
                </tr>
             
              </table>
            




             </div>
          </div>
        </div>
      </div>
      {/* Modal to Viw Product Data  Ends*/}
        </>
    )
}
export default Model