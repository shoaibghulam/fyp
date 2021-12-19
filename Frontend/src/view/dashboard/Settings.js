import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../../baseUrl';
import {BiDotsVertical} from 'react-icons/bi';

const  Settings=() =>{
  let token = `Bearer ` + localStorage.getItem("admintoken")
  const [data,setData]=useState([]);
  const [userData,setUserData]=useState([]);
  const allData=()=>{
    axios({
      method: 'GET',
      url: `${url.url}/api/settings`,
      
      headers: {
  
        Authorization: token,
        
      },
    })
    .then((response) => {
      var data= response.data;
      if(data.status==true){
      
          setData(data.data);
          setUserData(data.userData);
         
        
      
  
  
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
                    {/* information */}
                    <li className="nav-item">
                      <a className="nav-link" id="account-pill-info" data-toggle="pill" href="#account-vertical-info" aria-expanded="false">
                        <i data-feather="info" className="font-medium-3 mr-1" />
                        <span className="font-weight-bold">Website Settings</span>
                      </a>
                    </li>
                    {/* social */}
                    <li className="nav-item">
                      <a className="nav-link" id="account-pill-social" data-toggle="pill" href="#account-vertical-social" aria-expanded="false">
                        <i data-feather="link" className="font-medium-3 mr-1" />
                        <span className="font-weight-bold">Social</span>
                      </a>
                    </li>
                  
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
                          {/* header media */}
                          <div className="media">
                            <a href="javascript:void(0);" className="mr-25">
                              <img src="../../../app-assets/images/portrait/small/avatar-s-11.jpg" id="account-upload-img" className="rounded mr-50" alt="profile image" height={80} width={80} />
                            </a>
                            {/* upload and reset button */}
                            <div className="media-body mt-75 ml-1">
                              <label htmlFor="account-upload" className="btn btn-sm btn-primary mb-75 mr-75">Upload</label>
                              <input type="file" id="account-upload" hidden accept="image/*" />
                              <button className="btn btn-sm btn-outline-secondary mb-75">Reset</button>
                              <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                            </div>
                            {/*/ upload and reset button */}
                          </div>
                          {/*/ header media */}
                          {/* form */}
                          <form className="validate-form mt-2">
                            <div className="row">
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-username">FullName</label>
                                  <input type="text" className="form-control" id="account-username" name="username" placeholder="FUll Name" defaultValue={userData.FullName} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-name">email</label>
                                  <input type="email" className="form-control" id="account-name" name="name" placeholder="Name" defaultValue={userData.Email} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-e-mail">Contact No</label>
                                  <input type="text" className="form-control" placeholder="Contact No" defaultValue={userData.ContactNo} />
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
                        {/* website setting */}
                        <div className="tab-pane fade" id="account-vertical-info" role="tabpanel" aria-labelledby="account-pill-info" aria-expanded="false">
                          {/* form */}
                          <form className="validate-form">
                               {/* header media */}
                          
                          {/*/ header media */}
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="accountTextarea"> Website Description</label>
                                  <textarea className="form-control" id="accountTextarea" rows={4} placeholder="Website Description here..." defaultValue={data.WebsiteDescription} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="account-birth-date">Title</label>
                                  <input type="text" className="form-control flatpickr" placeholder="Title" value={data.WebsiteTitle} />
                                </div>
                              </div>
                            
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-website">Email</label>
                                  <input type="text" className="form-control"  placeholder="Helpline Email" value={data.WebsiteEmail} />
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-phone">Phone</label>
                                  <input type="text" className="form-control" id="account-phone" placeholder="Phone number" defaultValue={data.WebsiteContactNo} name="phone" />
                                </div>
                              </div>
                              <div className="col-12">
                                <button type="submit" className="btn btn-primary mt-1 mr-1">Save changes</button>
                                <button type="reset" className="btn btn-outline-secondary mt-1">Cancel</button>
                              </div>
                            </div>
                          </form>
                          {/*/ form */}
                        </div>
                        {/*/ information */}
                        {/* social */}
                        <div className="tab-pane fade" id="account-vertical-social" role="tabpanel" aria-labelledby="account-pill-social" aria-expanded="false">
                          {/* form */}
                          <form className="validate-form">
                            <div className="row">
                              {/* social header */}
                              <div className="col-12">
                                <div className="d-flex align-items-center mb-2">
                                  <i data-feather="link" className="font-medium-3" />
                                  <h4 className="mb-0 ml-75">Social Links</h4>
                                </div>
                              </div>
                              {/* twitter link input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-twitter">Twitter</label>
                                  <input type="text" id="account-twitter" className="form-control" placeholder="Add link" defaultValue="https://www.twitter.com" />
                                </div>
                              </div>
                              {/* facebook link input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-facebook">Facebook</label>
                                  <input type="text" id="account-facebook" className="form-control" placeholder="Add link" />
                                </div>
                              </div>
                              {/* google plus input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-google">Google+</label>
                                  <input type="text" id="account-google" className="form-control" placeholder="Add link" />
                                </div>
                              </div>
                              {/* linkedin link input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-linkedin">LinkedIn</label>
                                  <input type="text" id="account-linkedin" className="form-control" placeholder="Add link" defaultValue="https://www.linkedin.com" />
                                </div>
                              </div>
                              {/* instagram link input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-instagram">Instagram</label>
                                  <input type="text" id="account-instagram" className="form-control" placeholder="Add link" />
                                </div>
                              </div>
                              {/* Quora link input */}
                              <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="account-quora">Quora</label>
                                  <input type="text" id="account-quora" className="form-control" placeholder="Add link" />
                                </div>
                              </div>
                              {/* divider */}
                              <div className="col-12">
                                <hr className="my-2" />
                              </div>
                              <div className="col-12 mt-1">
                                {/* profile connection header */}
                                <div className="d-flex align-items-center mb-3">
                                  <i data-feather="user" className="font-medium-3" />
                                  <h4 className="mb-0 ml-75">Website Connections</h4>
                                </div>
                                <div className="row">
                                  {/* twitter user */}
                                  <div className="col-6 col-md-3 text-center mb-1">
                                    <p className="font-weight-bold">Your Twitter</p>
                                    <div className="avatar mb-1">
                                      <span className="avatar-content">
                                        <img src="../../../app-assets/images/avatars/11-small.png" alt="avatar img" width={40} height={40} />
                                      </span>
                                    </div>
                                    <p className="mb-0">@johndoe</p>
                                    <a href="javascript:void(0)">Disconnect</a>
                                  </div>
                                  {/* facebook button */}
                                  <div className="col-6 col-md-3 text-center mb-1">
                                    <p className="font-weight-bold mb-2">Your Facebook</p>
                                    <button className="btn btn-outline-primary">Connect</button>
                                  </div>
                                  {/* google user */}
                                  <div className="col-6 col-md-3 text-center mb-1">
                                    <p className="font-weight-bold">Your Google</p>
                                    <div className="avatar mb-1">
                                      <span className="avatar-content">
                                        <img src="../../../app-assets/images/avatars/3-small.png" alt="avatar img" width={40} height={40} />
                                      </span>
                                    </div>
                                    <p className="mb-0">@luraweber</p>
                                    <a href="javascript:void(0)">Disconnect</a>
                                  </div>
                                  {/* github button */}
                                  <div className="col-6 col-md-3 text-center mb-2">
                                    <p className="font-weight-bold mb-1">Your GitHub</p>
                                    <button className="btn btn-outline-primary">Connect</button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                {/* submit and cancel button */}
                                <button type="submit" className="btn btn-primary mr-1 mt-1">Save changes</button>
                                <button type="reset" className="btn btn-outline-secondary mt-1">Cancel</button>
                              </div>
                            </div>
                          </form>
                          {/*/ form */}
                        </div>
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
export default Settings