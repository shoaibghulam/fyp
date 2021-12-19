import React from 'react'
import {  Route } from 'react-router-dom';
import {BiDotsVertical} from 'react-icons/bi';

const  Home=() =>{
    return (
        <>
             
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
                                <h4 className="font-weight-bolder mb-0">230k</h4>
                                <p className="card-text font-small-3 mb-0">Vistors</p>
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
                                <h4 className="font-weight-bolder mb-0">8.549k</h4>
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
                                <h4 className="font-weight-bolder mb-0">1.423k</h4>
                                <p className="card-text font-small-3 mb-0">Coordinates</p>
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
                                <h4 className="font-weight-bolder mb-0">45</h4>
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
              <h4 className="card-title">New Location</h4>
            </div>
            <div className="card-body">
              
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                  



                    <th>Location Title</th>
                    <th>Contact No</th>
                    <th>Address</th>
                    <th>Modal</th>
                    <th>Agency</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                     Saylani Walfear Turbat
                    </td>
                    <td>03232538</td>
                    <td>
                     Balochi Bazar Absor Turbat
                    </td>
                    <td>
                     Oxeygen Cylinder
                    </td>
                    <td>
                    saylni Walfear 
                    </td>
                    <td><span className="badge badge-pill badge-light-primary mr-1">Active</span></td>
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
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                     Saylani
                    </td>
                    <td>PeterCharls</td>
                    <td>
                      admin@gmail.com
                    </td>
                    <td>
                     03232538043
                    </td>
                    <td>
                     12-Dec-2021
                    </td>
                    <td><span className="badge badge-pill badge-light-primary mr-1">Active</span></td>
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

        
        </>
    )
}
export default Home