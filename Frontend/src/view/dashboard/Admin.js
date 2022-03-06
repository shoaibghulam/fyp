import React,{useEffect,useState} from 'react'
import {  Route } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
import Loader from '../../components/Loader';
import { Helmet } from 'react-helmet';

const  Admin=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
  const[ChangeStatus,setChangeStatus]=useState('')
  const[dataPk,setDataPk]=useState('')
  const [UserPk,setUserPk]=useState('')
  const [userData,setUserData]=useState([])
  const[Description,setDescription]=useState('')
  const [loader,setLoader]=useState(true);
  const[viewData,setViewData]=useState([])
    // Change Status location start
    const changeStatus=(e)=>{
      e.preventDefault();
  
     var formdata = new FormData();
     formdata.append("status",ChangeStatus);
     formdata.append("tab",'locationstatus');
    
   
     axios({
      method: 'PUT',
      url: `${url.url}/api/locationstatus/${dataPk}`,
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
    // Change Status location end
    // Change User Status location start
    const changeUserStatus=(e)=>{
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
        allUserData();
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
    // Change User Status location end
  
  // get modal dropdown end
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
          if(data.data.length>0 ){
            const filterData= data.data.filter((e)=>{
              return e.Status =="pending"
            })
  
            setData(filterData);
           
          }
        
    
    
      }
      else {
       
        swal("Incorrect!", data.message, "warning");
      
      
      }
        }, (error) => {
          console.log(error);
          
        });
    }
  
    const allUserData=()=>{
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
           const filterdatauser=data.data.filter((e)=>{
             return e.Status == 'pending';
           })
            setUserData(filterdatauser);
           
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
    
      setTimeout(()=>{
        setLoader(false)

      },3000)
      allData();
      allUserData();
    },[data.length])
    return (
        <>
         <Helmet>
    <title>Anti Medicare System  Admin Panel</title>
  </Helmet>
         {/* {loader ? <Loader /> :null }     */}
        {/* shoaib BEGIN: Content*/}
        <div className="app-content content ">
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper container-xxl p-0">
            <div className="content-header row">
            </div>
            <div className="content-body">
              {/* Dashboard Ecommerce Starts */}
              <section id="dashboard-ecommerce">
                <div className="row match-height">
                  {/* Medal Card */}
                  <div className="col-xl-4 col-md-6 col-12">
                    <div className="card card-congratulation-medal">
                      <div className="card-body">
                        {/* <h5>Congratulations 🎉 John!</h5>
                        <p className="card-text font-small-3">You have won gold medal</p> */}
                        <h3 className="mb-75 mt-2 pt-50">
                          {/* <a href="javascript:void(0);">$48.9k</a> */}
                        </h3>
                        <button type="button" className="btn btn-primary">Vist</button>
                        <img src="app-assets/images/illustration/badge.svg" className="congratulation-medal" alt="Medal Pic" />
                      </div>
                    </div>
                  </div>
                  {/*/ Medal Card */}
                  {/* Statistics Card */}
                  <div className="col-xl-8 col-md-6 col-12">
                    <div className="card card-statistics">
                      <div className="card-header">
                        <h4 className="card-title">Statistics</h4>
                        <div className="d-flex align-items-center">
                          <p className="card-text font-small-2 mr-25 mb-0">Updated 1 month ago</p>
                        </div>
                      </div>
                      <div className="card-body statistics-body">
                        <div className="row">
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                            <div className="media">
                              <div className="avatar bg-light-primary mr-2">
                                <div className="avatar-content">
                                  <i data-feather="trending-up" className="avatar-icon" />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">10</h4>
                                <p className="card-text font-small-3 mb-0">Orders</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                            <div className="media">
                              <div className="avatar bg-light-info mr-2">
                                <div className="avatar-content">
                                  <i data-feather="user" className="avatar-icon" />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">20</h4>
                                <p className="card-text font-small-3 mb-0">Users</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                            <div className="media">
                              <div className="avatar bg-light-danger mr-2">
                                <div className="avatar-content">
                                  <i data-feather="box" className="avatar-icon" />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">5</h4>
                                <p className="card-text font-small-3 mb-0">Vendors</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12">
                            <div className="media">
                              <div className="avatar bg-light-success mr-2">
                                <div className="avatar-content">
                                  <i data-feather="dollar-sign" className="avatar-icon" />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">4</h4>
                                <p className="card-text font-small-3 mb-0">Modals</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Statistics Card */}
                </div>
                <div className="row match-height">
                {/* new Locations Start */}
            
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Product</h4>
            </div>
            <div className="card-body">
              
            </div>
            <div className="table-responsive">
            <table className="table table-striped">
                      <thead>
         
                      <tr>
                       
                          <th>Title</th>
                         
                          <th>Contact No</th>
                        
                           <th>Address</th>
                          <th>Modal</th>
                          <th>User</th>
                       
                          <th>Status</th>
                      
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody >
                      









                        {data.map((e)=>(
 <tr>
 <td>
 {e.ProductTitle}
  
</td>

 <td>{e.ContactNo}</td>

 <td>{e.Address}</td>
 <td>{e.ModalId['ModalTitle']}</td>
 <td>{e.UserId['AgencyName']}</td>
 
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
       

       <a className="dropdown-item" href="javascript:void(0);"  data-toggle="modal" data-target="#modals-slide-view"
        onClick={()=>{
          setViewData(e);
        }}
       >
         <i data-feather="trash" className="mr-50" />
         <span>View</span>
       </a>
       <a className="dropdown-item" href="javascript:void(0);"  data-toggle="modal" data-target="#modals-slide-status"
        onClick={()=>{
          setChangeStatus(e.Status)
          setDataPk(e.ProductId)
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
                {/* new Locations end */}
                  {/*/ Revenue Report Card */}
                </div>
                <div className="row match-height">
                {/* new Locations Start */}
            
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Users</h4>
            </div>
            <div className="card-body">
              
            </div>
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
                






                  {userData.map((e)=>(
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
       <a className="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#modals-slide-view-user"
        onClick={()=>{
          
          setViewData(e);
        }}
       >
         <i data-feather="edit-2" className="mr-50" />
         <span>View</span>
       </a>
      
         <a className="dropdown-item" href="javascript:void(0);"  data-toggle="modal" data-target="#modals-slide-user"
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
                {/* new Locations end */}
                  {/*/ Revenue Report Card */}
                </div>
              
             
              </section>
              {/* Dashboard Ecommerce ends */}
            </div>
          </div>
        </div>
        {/* END: Content*/} 
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
       {/* Modal to edit new user starts*/}
       <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-user">
        <div className="modal-dialog">
            
          <form className="add-new-user modal-content pt-0" onSubmit={changeUserStatus}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Change User Status </h5>
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
                  <td>{viewData.ProductId}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>{viewData.ProductTitle}</td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>
                    {viewData.UserId ? viewData.UserId['AgencyName'] : null }
                   
                    </td>
                </tr>
                <tr>
                  <th>Model</th>
                  <td>
                    {viewData.ModalId ? viewData.ModalId['ModalTitle'] : null}
                   </td>
                </tr>
                <tr>
                  <th>Contact No</th>
                  <td>{viewData.ContactNo}</td>
                </tr>
               
                <tr>
                  <th>Price</th>
                  <td>{viewData.Price} .Rs</td>
                </tr>
                <tr>
                  <th>Qty</th>
                  <td>{viewData.qty}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{viewData.Address}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td><a href={viewData.WebsiteLink}>{viewData.WebsiteLink}</a></td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td  dangerouslySetInnerHTML={{__html:viewData.Description}}></td>
                </tr>
              </table>
            




             </div>
          </div>
        </div>
      </div>
      {/* Modal to Viw Product Data  Ends*/}
            {/* Modal to Viw User Data starts*/}
            <div className="modal modal-slide-in new-user-modal fade" id="modals-slide-view-user">
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
      {/* Modal to Viw user Data  Ends*/}
        </>
    )
}
export default Admin