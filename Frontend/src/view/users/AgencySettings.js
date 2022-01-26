import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';
import {Helmet} from "react-helmet";
const  AgencySettings=() =>{
  let token = `Bearer ` + localStorage.getItem("usertoken")
  const [data,setData]=useState([]);
  const [userData,setUserData]=useState([]);
 const updateGenral=(e)=>{
   e.preventDefault();
   var formdata = new FormData();

   formdata.append("tab",'general');
   formdata.append("FullName",e.target[0].value);
   formdata.append("Email",e.target[1].value);
   formdata.append("ContactNo", e.target[2].value);
 
   axios({
     method: 'PUT',
     url: `${url.url}/api/agencysettings`,
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
 const updatePassword=(e)=>{

   e.preventDefault();
   var formdata = new FormData();

   formdata.append("tab",'changepassword');
   formdata.append("OldPassword",e.target[0].value);
   formdata.append("NewPassowrd",e.target[1].value);
  
 
   axios({
     method: 'PUT',
     url: `${url.url}/api/agencysettings`,
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
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/agencysettings`,
      
      headers: {
  
        Authorization: token,
        
      },
    })
    .then((response) => {
      var data= response.data;
      if(data.status==true){
      
          setData(data.data);
         
         
        
      
  
  
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
  <Helmet>
    <title>Anti Medicare System User Setting</title>
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
                  <h2 className="content-header-title float-left mb-0">Website Settings</h2>
                  <div className="breadcrumb-wrapper">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item"><a href="#">Settings</a>
                      </li>
                      <li className="breadcrumb-item active"> Website Settings
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
          <div className="content-body">
            {/* account setting page */}
            <section id="page-account-settings">
              <div className="row">
                {/* left menu section */}
                <div className="col-md-3 mb-2 mb-md-0">
                  <ul className="nav nav-pills flex-column nav-left">
                    {/* general */}
                    <li className="nav-item">
                      <a className="nav-link active" id="account-pill-general" data-toggle="pill" href="#account-vertical-general" aria-expanded="true">
                        <i data-feather="user" className="font-medium-3 mr-1" />
                        <span className="font-weight-bold">General</span>
                      </a>
                    </li>
                    {/* change password */}
                    <li className="nav-item">
                      <a className="nav-link" id="account-pill-password" data-toggle="pill" href="#account-vertical-password" aria-expanded="false">
                        <i data-feather="lock" className="font-medium-3 mr-1" />
                        <span className="font-weight-bold">Change Password</span>
                      </a>
                    </li>
                  
                    {/* social */}
                   
                  
                  </ul>
                </div>
                {/*/ left menu section */}
                {/* right content section */}
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-body">
                      <div className="tab-content">
                        {/* general tab */}
                        <div role="tabpanel" className="tab-pane active" id="account-vertical-general" aria-labelledby="account-pill-general" aria-expanded="true">
                        
                          {/* form */}
                          <form className="validate-form mt-2" onSubmit={updateGenral}>
                            <div className="row">
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-username">Agency Name</label>
                                  <input type="text" className="form-control" id="account-username" name="username" placeholder="FUll Name" defaultValue={data.AgencyName} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-name">email</label>
                                  <input type="email" className="form-control" id="account-name" name="name" placeholder="Name" defaultValue={data.Email} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-e-mail">Contact No</label>
                                  <input type="text" className="form-control" placeholder="Contact No" defaultValue={data.ContactNo} />
                                </div>
                              </div>
                           
                             {/* shoaib ghulam */}
                              <div className="col-12">
                                <button type="submit" className="btn btn-primary mt-2 mr-1">Save changes</button>
                                <button type="reset" className="btn btn-outline-secondary mt-2">Cancel</button>
                              </div>
                            </div>
                          </form>
                          {/*/ form */}
                        </div>
                        {/*/ general tab */}
                        {/* change password */}
                        <div className="tab-pane fade" id="account-vertical-password" role="tabpanel" aria-labelledby="account-pill-password" aria-expanded="false">
                          {/* form */}
                          <form className="validate-form" onSubmit={updatePassword}>
                            <div className="row">
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-old-password">Old Password</label>
                                  <div className="input-group form-password-toggle input-group-merge">
                                    <input type="password" className="form-control" id="account-old-password" name="password" placeholder="Old Password" />
                                    <div className="input-group-append">
                                      <div className="input-group-text cursor-pointer">
                                        <i data-feather="eye" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-new-password">New Password</label>
                                  <div className="input-group form-password-toggle input-group-merge">
                                    <input type="password" id="account-new-password" name="new-password" className="form-control" placeholder="New Password" />
                                    <div className="input-group-append">
                                      <div className="input-group-text cursor-pointer">
                                        <i data-feather="eye" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col-12">
                                <button type="submit" className="btn btn-primary mr-1 mt-1">Save changes</button>
                                <button type="reset" className="btn btn-outline-secondary mt-1">Cancel</button>
                              </div>
                            </div>
                          </form>
                          {/*/ form */}
                        </div>
                        {/*/ change password */}
                      
                        {/*/ information */}
                     
                       
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ right content section */}
              </div>
            </section>
            {/* / account setting page */}
          </div>
        </div>
      </div>
      {/* END: Content*/}
        
        </>
    )
}
export default AgencySettings