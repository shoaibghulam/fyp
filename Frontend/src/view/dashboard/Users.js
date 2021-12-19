import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
const  Model=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
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
                  <h2 className="content-header-title float-left mb-0">Users</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Users
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
           <button className="btn btn-primary" data-toggle="modal" data-target="#modals-slide-in">Add Users</button>
        
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
                    <th>Address</th>
                    <th>Date</th>
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
    {e.Address}
   </td>
   <td>
    {e.RegistrationDate}
   </td>
   <td>
     {e.Status ?
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
         <a className="dropdown-item" href="javascript:void(0);">
           <i data-feather="edit-2" className="mr-50" />
           <span>Edit</span>
         </a>
         <a className="dropdown-item" href="javascript:void(0);">
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
          <form className="add-new-user modal-content pt-0">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">New User</h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Full Name</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="John Doe" name="user-fullname" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Username</label>
                <input type="text" id="basic-icon-default-uname" className="form-control dt-uname" placeholder="Web Developer" aria-label="jdoe1" aria-describedby="basic-icon-default-uname2" name="user-name" />
              </div>
        



              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Email</label>
                <input type="text" id="basic-icon-default-email" className="form-control dt-email" placeholder="john.doe@example.com" aria-label="john.doe@example.com" aria-describedby="basic-icon-default-email2" name="user-email" />
                <small className="form-text text-muted"> You can use letters, numbers &amp; periods </small>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Password</label>
                <input type="Password" id="basic-icon-default-email" className="form-control dt-email" placeholder="**********" aria-label="*********" aria-describedby="basic-icon-default-email2" name="user-email" />
                <small className="form-text text-muted"> You can use letters, numbers &amp; periods </small>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Contact No</label>
                <input type="text" id="basic-icon-default-email" className="form-control dt-email" placeholder="Contact No" aria-label="Contact No" aria-describedby="basic-icon-default-email2" name="user-email" />
                <small className="form-text text-muted"> You can use  numbers  </small>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Date of Birth</label>
                <input type="date" id="basic-icon-default-email" className="form-control dt-email" placeholder="Contact No" aria-label="Contact No" aria-describedby="basic-icon-default-email2" name="user-email" />
        
              </div>

              <div className="form-group mb-2">
                <label className="form-label" htmlFor="user-plan">Select Gender</label>
                <select id="user-plan" className="form-control">
                  <option value="basic">Male</option>
                  <option value="enterprise">Female</option>
                 
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="user-role">User Role</label>
                <select id="user-role" className="form-control">
                  <option value="subscriber">Subscriber</option>
                  <option value="editor">Editor</option>
                  <option value="maintainer">Maintainer</option>
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
         
              <button type="submit" className="btn btn-primary mr-1 data-submit">Submit</button>
              <button type="reset" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal to add new user Ends*/}
        
        </>
    )
}
export default Model