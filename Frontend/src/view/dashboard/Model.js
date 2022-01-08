import React,{useEffect,useState,useRef} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
import $ from 'jquery';
const  Model=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
  const [modalPk,setModalPk]=useState();
  const [modalTitle,setModalTitle]=useState('');
  const [modalDescription,setModalDescription]=useState('');
  const [modalThumbnail,setModalThumbnail]=useState();

  // add Modal Api Start
  const addModal=(e)=>{
   
    e.preventDefault();
    var formdata = new FormData();
  formdata.append("ModalTitle",modalTitle);
  formdata.append("ModalDescription",modalDescription);
  formdata.append("ModalThumbnail", modalThumbnail);

  axios({
    method: 'POST',
    url: `${url.url}/api/models`,
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
  // add Modal APi End
  // Edit Modal Api Start
  const editModal=(e)=>{
   
    e.preventDefault();
    var formdata = new FormData();

  formdata.append("ModalTitle",modalTitle);
  formdata.append("ModalDescription",modalDescription);
  
  formdata.append("ModalThumbnail", modalThumbnail);

  axios({
    method: 'PUT',
    url: `${url.url}/api/models/${modalPk}`,
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
  // Edit Modal APi End
  // Delete Modal Modal Api Start
  const deleteModal=(e)=>{
   

  axios({
    method: 'DELETE',
    url: `${url.url}/api/models/${e}`,
  
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

  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/models`,
      
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
  // effect end
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
                  <h2 className="content-header-title float-left mb-0">Modal Data</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Modal Data
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
           <button className="btn btn-primary" data-toggle="modal" data-target="#modals-slide-in">Add Modal</button>
        
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
                          <th>Thumbnail</th>
                          <th>Title</th>
                          <th>Description</th>
                          {/* <th>Status</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody >
                      {data.map((e)=>(
 <tr>
 <td>
   <img src={`${url.url}${e.ModalThumbnail}`} className="mr-75" height={30} width={30} alt="Angular" />
  
 </td>
 <td>{e.ModalTitle}</td>
 <td>
 {e.ModalDescription}
 </td>

 <td>
   <div className="dropdown">
     <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
     <BiDotsVertical size={35} />
     </button>
     <div className="dropdown-menu">
       <a className="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#modals-slide-edit"
       onClick={()=>{
        setModalTitle(e.ModalTitle)
        setModalDescription(e.ModalDescription)
        setModalThumbnail(null)
        setModalPk(e.ModalId)
      
       }}
       >
         <i data-feather="edit-2" className="mr-50" />
         <span>Edit</span>
       </a>
       <a className="dropdown-item" href="javascript:void(0);" onClick={()=>deleteModal(e.ModalId)}>
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
          <form className="add-new-user modal-content pt-0" onSubmit={addModal}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Modal </h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Title</label>
                <input type="text" className="form-control dt-full-name" placeholder="John Doe" onChange={(e)=>setModalTitle(e.target.value)} value={modalTitle}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Description</label>
                <textarea id="basic-icon-default-uname" className="form-control dt-uname" placeholder="Description Here" onChange={(e)=>setModalDescription(e.target.value)} >{modalDescription}</textarea>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Thumbnail</label>
                
                <input type="file" className="form-control dt-email" onChange={(e)=>setModalThumbnail(e.target.files[0])}/>
                <small className="form-text text-muted"> You can use jpg and png </small>
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
          <form className="add-new-user modal-content pt-0" onSubmit={editModal}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            <div className="modal-header mb-1">
              <h5 className="modal-title" id="exampleModalLabel">Edit Model </h5>
            </div>
            <div className="modal-body flex-grow-1">
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-fullname">Title</label>
                <input type="text" className="form-control dt-full-name" placeholder="John Doe" onChange={(e)=>setModalTitle(e.target.value)} value={modalTitle}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-uname">Description</label>
                <textarea id="basic-icon-default-uname" className="form-control dt-uname" placeholder="Description Here" onChange={(e)=>setModalDescription(e.target.value)} value={modalDescription}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="basic-icon-default-email">Thumbnail</label>
                
                <input type="file" className="form-control dt-email" onChange={(e)=>setModalThumbnail(e.target.files[0])}/>
                <small className="form-text text-muted"> You can use jpg and png </small>
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
export default Model