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
          setPendingPayment(
            data.data.filter((e)=>{
                return e.Status == "Pending payment"
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
                          <th>Email</th>
                          <th>Contact No</th>
                           <th>Address</th>
                           <th>Qty</th>
                           <th>Price</th>
                          <th>Total Price</th>
                          <th>User</th>
                          <th>Date</th>
                       
                      
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
 <td>{e.Email}</td>
 <td> {e.ContactNo}</td>
 <td>{e.Address}</td>
 <td>{e.Qty}</td>
 <td>{e.Price}</td>

 <td>{e.TotalPrice}</td>
 <td>{e.User}</td>
 <td>{e.Date}</td>

 <td>
   <div className="dropdown">
     <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
     <BiDotsVertical size={35} />
     </button>
     <div className="dropdown-menu">
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
                          <th>Email</th>
                          <th>Contact No</th>
                           <th>Address</th>
                           <th>Qty</th>
                           <th>Price</th>
                          <th>Total Price</th>
                          <th>User</th>
                          <th>Date</th>
                       
                      
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
     
     <span className="badge badge-pill badge-light-info mr-1">{e.Status}</span>
     
     </td>
 <td>{e.FirstName}</td>

 <td>{e.LastName}</td>
 <td>{e.Email}</td>
 <td> {e.ContactNo}</td>
 <td>{e.Address}</td>
 <td>{e.Qty}</td>
 <td>{e.Price}</td>

 <td>{e.TotalPrice}</td>
 <td>{e.User}</td>
 <td>{e.Date}</td>

 <td>
   <div className="dropdown">
     <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
     <BiDotsVertical size={35} />
     </button>
     <div className="dropdown-menu">
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
  <Tab eventKey="Pendingpayment" title="Pending payment">
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
                       <th>Email</th>
                       <th>Contact No</th>
                        <th>Address</th>
                        <th>Qty</th>
                        <th>Price</th>
                       <th>Total Price</th>
                       <th>User</th>
                       <th>Date</th>
                    
                   
                       <th>Actions</th>
                     </tr>
                   </thead>
                   <tbody >
                

                     {pendingPayment.map((e)=>(
<tr>
<td >
{e.Product['ProductTitle']}

</td>
<td>
  
  <span className="badge badge-pill badge-light-info mr-1">{e.Status}</span>
  
  </td>
<td>{e.FirstName}</td>

<td>{e.LastName}</td>
<td>{e.Email}</td>
<td> {e.ContactNo}</td>
<td>{e.Address}</td>
<td>{e.Qty}</td>
<td>{e.Price}</td>

<td>{e.TotalPrice}</td>
<td>{e.User}</td>
<td>{e.Date}</td>

<td>
<div className="dropdown">
  <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
  <BiDotsVertical size={35} />
  </button>
  <div className="dropdown-menu">
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
                       <th>Email</th>
                       <th>Contact No</th>
                        <th>Address</th>
                        <th>Qty</th>
                        <th>Price</th>
                       <th>Total Price</th>
                       <th>User</th>
                       <th>Date</th>
                    
                   
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
  
  <span className="badge badge-pill badge-light-info mr-1">{e.Status}</span>
  
  </td>
<td>{e.FirstName}</td>

<td>{e.LastName}</td>
<td>{e.Email}</td>
<td> {e.ContactNo}</td>
<td>{e.Address}</td>
<td>{e.Qty}</td>
<td>{e.Price}</td>

<td>{e.TotalPrice}</td>
<td>{e.User}</td>
<td>{e.Date}</td>

<td>
<div className="dropdown">
  <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
  <BiDotsVertical size={35} />
  </button>
  <div className="dropdown-menu">
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
                       <th>Email</th>
                       <th>Contact No</th>
                        <th>Address</th>
                        <th>Qty</th>
                        <th>Price</th>
                       <th>Total Price</th>
                       <th>User</th>
                       <th>Date</th>
                    
                   
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
  
  <span className="badge badge-pill badge-light-info mr-1">{e.Status}</span>
  
  </td>
<td>{e.FirstName}</td>

<td>{e.LastName}</td>
<td>{e.Email}</td>
<td> {e.ContactNo}</td>
<td>{e.Address}</td>
<td>{e.Qty}</td>
<td>{e.Price}</td>

<td>{e.TotalPrice}</td>
<td>{e.User}</td>
<td>{e.Date}</td>

<td>
<div className="dropdown">
  <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
  <BiDotsVertical size={35} />
  </button>
  <div className="dropdown-menu">
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
                 <option value="Pending payment">Pending payment</option>
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

     
        
         
   
        
        </>
    )
}
export default VendorOrders;