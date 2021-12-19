import React,{useEffect,useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
const  Data=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/locations`,
      
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
 <td> {e.Description}</td>
 <td>{e.Address}</td>
 <td>{e.ModalId['ModalTitle']}</td>
 <td>{e.UserId['AgencyName']}</td>
 <td><a href={e.WebsiteLink}>{e.WebsiteLink}</a></td>
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
              <h5 className="modal-title" id="exampleModalLabel">Coordinates </h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Title</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="John Doe" name="user-fullname" aria-label="Modal Title" aria-describedby="basic-icon-default-fullname2" />
              </div>
              





              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Latitude</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="Latitude" name="user-fullname" aria-label="Latitude" aria-describedby="basic-icon-default-fullname2" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Longitude</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="Longitude" name="user-fullname" aria-label="Longitude" aria-describedby="basic-icon-default-fullname2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Contact No</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="Contact No" name="user-fullname" aria-label="Contact No" aria-describedby="basic-icon-default-fullname2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Address</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="Address" name="user-fullname" aria-label="Contact No" aria-describedby="basic-icon-default-fullname2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Website Link</label>
                <input type="text" className="form-control dt-full-name" id="basic-icon-default-fullname" placeholder="Website Link" name="user-fullname" aria-label="Website Link" aria-describedby="basic-icon-default-fullname2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Description</label>
                <textarea id="basic-icon-default-uname" className="form-control dt-uname" placeholder="Description Here" aria-label="jdoe1" aria-describedby="basic-icon-default-uname2" name="user-name" ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Thumbnail</label>
                
                <input type="file" id="basic-icon-default-email" className="form-control dt-email" placeholder="john.doe@example.com" aria-label="john.doe@example.com" aria-describedby="basic-icon-default-email2" name="user-email" />
                <small className="form-text text-muted"> You can use jpg and png </small>
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
export default Data;