import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';

const  AgencySettings=() =>{
  let token = `Bearer ` + localStorage.getItem("usertoken")
  const [data,setData]=useState([]);
  const [userData,setUserData]=useState([]);
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/login`,
      
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
                    {/* information */}
             
                  
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
                        
                          {/* <div className="media">
                            <a href="javascript:void(0);" className="mr-25">
                              <img src="../../../app-assets/images/portrait/small/avatar-s-11.jpg" id="account-upload-img" className="rounded mr-50" alt="profile image" height={80} width={80} />
                            </a>
                          
                            <div className="media-body mt-75 ml-1">
                              <label htmlFor="account-upload" className="btn btn-sm btn-primary mb-75 mr-75">Upload</label>
                              <input type="file" id="account-upload" hidden accept="image/*" />
                              <button className="btn btn-sm btn-outline-secondary mb-75">Reset</button>
                              <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                            </div>
                           
                          </div> */}
                          {/*/ header media */}
                          {/* form */}
                          <form className="validate-form mt-2">
                            <div className="row">
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-username">Agency Name</label>

                                  <input type="text" className="form-control" id="account-username" name="username" placeholder="Agency Name" defaultValue={data.AgencyName} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-name">email</label>
                                  <input type="email" className="form-control" id="account-name" name="name" placeholder="Email" defaultValue={data.Email} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-e-mail">Contact No</label>
                                  <input type="text" className="form-control" placeholder="Contact No" defaultValue={data.ContactNo} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-e-mail">Address</label>
                                  <input type="text" className="form-control" placeholder="Contact No" defaultValue={data.Address} />
                                </div>
                              </div>
                           
                              <div className="col-12 mt-75">
                                <div className="alert alert-warning mb-50" role="alert">
                                  <h4 className="alert-heading">Your email is not confirmed. Please check your inbox.</h4>
                                  <div className="alert-body">
                                    <a href="javascript: void(0);" className="alert-link">Resend confirmation</a>
                                  </div>
                                </div>
                              </div>
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
                          <form className="validate-form">
                            <div className="row">
                              <div className="col-12 col-sm-6">
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
                              <div className="col-12 col-sm-6">
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
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-retype-new-password">Retype New Password</label>
                                  <div className="input-group form-password-toggle input-group-merge">
                                    <input type="password" className="form-control" id="account-retype-new-password" name="confirm-new-password" placeholder="New Password" />
                                    <div className="input-group-append">
                                      <div className="input-group-text cursor-pointer"><i data-feather="eye" /></div>
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
                       
                        {/* social */}
                       
                        {/*/ social */}
                        {/* notifications */}
                        <div className="tab-pane fade" id="account-vertical-notifications" role="tabpanel" aria-labelledby="account-pill-notifications" aria-expanded="false">
                          <div className="row">
                            <h6 className="section-label mx-1 mb-2">Activity</h6>
                            <div className="col-12 mb-2">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" defaultChecked id="accountSwitch1" />
                                <label className="custom-control-label" htmlFor="accountSwitch1">
                                  Email me when someone comments onmy article
                                </label>
                              </div>
                            </div>
                            <div className="col-12 mb-2">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" defaultChecked id="accountSwitch2" />
                                <label className="custom-control-label" htmlFor="accountSwitch2">
                                  Email me when someone answers on my form
                                </label>
                              </div>
                            </div>
                            <div className="col-12 mb-2">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="accountSwitch3" />
                                <label className="custom-control-label" htmlFor="accountSwitch3">Email me hen someone follows me</label>
                              </div>
                            </div>
                            <h6 className="section-label mx-1 mt-2">Application</h6>
                            <div className="col-12 mt-1 mb-2">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" defaultChecked id="accountSwitch4" />
                                <label className="custom-control-label" htmlFor="accountSwitch4">News and announcements</label>
                              </div>
                            </div>
                            <div className="col-12 mb-2">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" defaultChecked id="accountSwitch6" />
                                <label className="custom-control-label" htmlFor="accountSwitch6">Weekly product updates</label>
                              </div>
                            </div>
                            <div className="col-12 mb-75">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="accountSwitch5" />
                                <label className="custom-control-label" htmlFor="accountSwitch5">Weekly blog digest</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <button type="submit" className="btn btn-primary mt-2 mr-1">Save changes</button>
                              <button type="reset" className="btn btn-outline-secondary mt-2">Cancel</button>
                            </div>
                          </div>
                        </div>
                        {/*/ notifications */}
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