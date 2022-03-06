import React,{useEffect,useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
import Pusher from 'pusher-js';
import 'react-quill/dist/quill.snow.css';
import {Helmet} from "react-helmet";
import {Tabs, Tab} from 'react-bootstrap'
const pusher = new Pusher('197d770c643a357ecfcf', {
    cluster: 'ap2',
  });
const  VendorOrders=() =>{
  let token = `Bearer ` + localStorage.getItem("vendorToken")
  const [newData,setNewData]=useState([]);
  const [acceptedDate,setAcceptedDate]=useState([]);
  const [pendingPayment,setPendingPayment]=useState([]);
  const [completed,setCompleted]=useState([]);
  const [cancel,setCancel]=useState([]);
  const[dataPk,setDataPk]=useState('')
  const[ChangeStatus,setChangeStatus]=useState('')
  const[viewData,setViewData]=useState([])

  // get modal dropdown end
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/vendor_orders`,
      
      headers: {
  
        Authorization: token,
        
      },
    })
    .then((response) => {
      var data= response.data;
      if(data.status==true){
        if(data.data.length>0){
         

          setNewData(
            data.data.filter((e)=>{
                return e.Status == "New"
            })
          );
         
          setAcceptedDate(
            data.data.filter((e)=>{
                return e.Status == "Accepted"
            })
          );
         
          setCompleted(
            data.data.filter((e)=>{
                return e.Status == "Completed"
            })
          );
          setCancel(
            data.data.filter((e)=>{
                return e.Status == "Cancel"
            })
          );
          
       

         
        }
      
  
  
    }
    else {
     
      swal("Incorrect!", data.message, "warning");
    
    
    }
      }, (error) => {
        console.log(error);
        
      });
  }

    // Change Status location start
    const changeStatus=(e)=>{
        e.preventDefault();
    
       var formdata = new FormData();
       formdata.append("status",ChangeStatus);
       formdata.append("tab",'locationstatus');
      
     
       axios({
        method: 'PUT',
        url: `${url.url}/api/vendor_orders/${dataPk}`,
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

  // effect start
  useEffect(()=>{
    allData();
  },[newData.length])

  var channel = pusher.subscribe(`user${localStorage.getItem('vendorid')}`);
  console.log("the chanel is ",channel)
  channel.bind('my-event', function(data) {
      allData();
      const audio = new Audio('https://proxy.notificationsounds.com/notification-sounds/beep-472/download/file-sounds-713-beep.mp3');
      audio.play();
    //  if(channel.subscribed==true){
    //     // alert("sub")
    //     // pusher.unsubscribe(`user${localStorage.getItem('vendorid')}`)
    // }
  })
  
  Pusher.logToConsole = true;


    return (
        <>
  <Helmet>
    <title>Anti Medicare System  Panel</title>
  </Helmet>
      {/* BEGIN: Content*/}
      <div className="app-content content ">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2">
              <div className="row breadcrumbs-top">
                <div className="col-12">
                  <h2 className="content-header-title float-left mb-0">New Orders</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">New Orders
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          {/* tabs start */}
            {/* Statistics Card */}
            <div className="col-xl-12 col-md-12 col-12">
                    <div className="card card-statistics">
                      <div className="card-header">
                        <h4 className="card-title">Statistics</h4>
                      
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
                              

                                <h4 className="font-weight-bolder mb-0 ml-2">{newData?.length}</h4>
                                <p className="card-text font-small-3 mb-0">New Orders</p>
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
                              

                                <h4 className="font-weight-bolder mb-0 ml-2">{acceptedDate?.length}</h4>
                                <p className="card-text font-small-3 mb-0">Accepted</p>
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
                          
                                <h4 className="font-weight-bolder mb-0 ml-2">{completed?.length}</h4>
                                <p className="card-text font-small-3 mb-0">Complated</p>
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
                          
                                <h4 className="font-weight-bolder mb-0 ml-2">{cancel?.length}</h4>
                                <p className="card-text font-small-3 mb-0">Cancel</p>
                              </div>
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Statistics Card */}
          <div className="vendor-tab">
          <Tabs
  defaultActiveKey="new"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
  tabClassName="bg-info"
>
  <Tab eventKey="new" title="New Orders">
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

                          <th>Product</th>
                          <th>Status</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                        
                           <th>Address</th>
                           <th>Qty</th>
                           <th>Price</th>
                          <th>Total Price</th>
                      
                      
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody >
                   
 
                        {newData.map((e)=>(
 <tr>
 <td >
 {e.Product['ProductTitle']}
  
</td>
<td>
     
     <span className="badge badge-pill badge-light-info mr-1">{e.Status}</span>
     
     </td>
 <td>{e.FirstName}</td>

 <td>{e.LastName}</td>

 <td>{e.Address}</td>
 <td>{e.Qty}</td>
 <td>{e.Price} .Rs</td>

 <td>{e.TotalPrice} .Rs</td>


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
          setDataPk(e.OrderId)
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
  </Tab>
  <Tab eventKey="Accepted" title="Accepted">
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

                          <th>Product</th>
                          <th>Status</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                       
                           <th>Address</th>
                           <th>Qty</th>
                           <th>Price</th>
                          <th>Total Price</th>
                        
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody >
                   
 
                        {acceptedDate.map((e)=>(
 <tr>
 <td >
 {e.Product['ProductTitle']}
  
</td>
<td>
     
     <span className="badge badge-pill badge-light-warning mr-1">{e.Status}</span>
     
     </td>
 <td>{e.FirstName}</td>

 <td>{e.LastName}</td>

 <td>{e.Address}</td>
 <td>{e.Qty} </td>
 <td>{e.Price} .Rs</td>

 <td>{e.TotalPrice} .Rs</td>


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
          setDataPk(e.OrderId)
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
  </Tab>

  <Tab eventKey="Completed" title="Completed">
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

                       <th>Product</th>
                       <th>Status</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       
                        <th>Address</th>
                        <th>Qty</th>
                        <th>Price</th>
                       <th>Total Price</th>
                      
                       <th>Actions</th>
                     </tr>
                   </thead>
                   <tbody >
                

                     {completed.map((e)=>(
<tr>
<td >
{e.Product['ProductTitle']}

</td>
<td>
  
  <span className="badge badge-pill badge-light-primary mr-1">{e.Status}</span>
  
  </td>
<td>{e.FirstName}</td>

<td>{e.LastName}</td>

<td>{e.Address}</td>
<td>{e.Qty}</td>
<td>{e.Price} .Rs</td>

<td>{e.TotalPrice} .Rs</td>


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
       setDataPk(e.OrderId)
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
  </Tab>
 
  <Tab eventKey="Cancel" title="Cancel">
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

                       <th>Product</th>
                       <th>Status</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                    
                        <th>Address</th>
                        <th>Qty</th>
                        <th>Price</th>
                       <th>Total Price</th>
                    
                    
                   
                       <th>Actions</th>
                     </tr>
                   </thead>
                   <tbody >
                

                     {cancel.map((e)=>(
<tr>
<td >
{e.Product['ProductTitle']}

</td>
<td>
  
  <span className="badge badge-pill badge-light-danger mr-1">{e.Status}</span>
  
  </td>
<td>{e.FirstName}</td>

<td>{e.LastName}</td>

<td>{e.Address}</td>
<td>{e.Qty}</td>
<td>{e.Price} .Rs</td>

<td>{e.TotalPrice} .Rs</td>


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
       setDataPk(e.OrderId)
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
  </Tab>
 
</Tabs>
</div>
          {/* tabs end */}
         
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
                 <option value="New">New</option>
                 <option value="Accepted">Accepted</option>
               
                 <option value="Completed">Completed</option>
                 <option value="Cancel">Cancel</option>
                
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
                  <th>Order Id</th>
                  <td>{viewData.OrderId}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{viewData.FirstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{viewData.LastName}</td>
                </tr>
               
               
                <tr>
                  <th>Email</th>
                  <td>{viewData.Email}</td>
                </tr>
                <tr>
                  <th>Product</th>
                  <td>
                    {viewData.Product ? viewData.Product['ProductTitle'] : null }
                   
                    </td>
                </tr>
              
                <tr>
                  <th>Contact No</th>
                  <td>{viewData.ContactNo}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{viewData.Date}</td>
                </tr>
               
                <tr>
                  <th>Price</th>
                  <td>{viewData.Price} .Rs</td>
                </tr>
                <tr>
                  <th>Qty</th>
                  <td>{viewData.Qty}</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>{viewData.TotalPrice} .Rs</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{viewData.Address}</td>
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
export default VendorOrders;