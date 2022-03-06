import React from 'react'
import { Link,useHistory  } from 'react-router-dom';
export default function Navbar() {
  const history = useHistory();
  const logout=()=>{
    localStorage.removeItem('usertoken');
    history.push('/vendor_login')
  }
    return (
        <>
             {/* BEGIN: Header*/}
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-dark navbar-shadow container-xxl">
          <div className="navbar-container d-flex content">
            <div className="bookmark-wrapper d-flex align-items-center">
              <ul className="nav navbar-nav d-xl-none">
                <li className="nav-item"><a className="nav-link menu-toggle" href="javascript:void(0);"><i className="ficon" data-feather="menu" /></a></li>
              </ul>
              <ul className="nav navbar-nav bookmark-icons">
                <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-email.html" data-toggle="tooltip" data-placement="top" title="Email"><i className="ficon" data-feather="mail" /></a></li>
                <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-chat.html" data-toggle="tooltip" data-placement="top" title="Chat"><i className="ficon" data-feather="message-square" /></a></li>
                <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-calendar.html" data-toggle="tooltip" data-placement="top" title="Calendar"><i className="ficon" data-feather="calendar" /></a></li>
                <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-todo.html" data-toggle="tooltip" data-placement="top" title="Todo"><i className="ficon" data-feather="check-square" /></a></li>
              </ul>
              <ul className="nav navbar-nav">
                <li className="nav-item d-none d-lg-block"><a className="nav-link bookmark-star"><i className="ficon text-warning" data-feather="star" /></a>
                  <div className="bookmark-input search-input">
                    <div className="bookmark-input-icon"><i data-feather="search" /></div>
                    <input className="form-control input" type="text" placeholder="Bookmark" tabIndex={0} data-search="search" />
                    <ul className="search-list search-list-bookmark" />
                  </div>
                </li>
              </ul>
            </div>
            <ul className="nav navbar-nav align-items-center ml-auto">
        
              <li className="nav-item d-none d-lg-block"><a className="nav-link nav-link-style"><i className="ficon" data-feather="sun" /></a></li>
           
         
         
              <li className="nav-item dropdown dropdown-user"><a className="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div className="user-nav d-sm-flex d-none"><span className="user-name font-weight-bolder">{ localStorage.getItem('agencyName')}</span><span className="user-status">User</span></div><span className="avatar"><img className="round" src="app-assets/images/portrait/small/avatar-s-11.jpg" alt="avatar" height={40} width={40} /><span className="avatar-status-online" /></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user"><Link className="dropdown-item" to="/agencysettings"><i className="mr-50" data-feather="user" /> Settings</Link>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="javascript:void(0);" onClick={()=>logout()}><i className="mr-50" data-feather="power" /> Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="main-search-list-defaultlist d-none">
          <li className="d-flex align-items-center"><a href="javascript:void(0);">
              <h6 className="section-label mt-75 mb-0">Files</h6>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75"><img src="app-assets/images/icons/xls.png" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Two new item submitted</p><small className="text-muted">Marketing Manager</small>
                </div>
              </div><small className="search-data-size mr-50 text-muted">'17kb</small>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75"><img src="app-assets/images/icons/jpg.png" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">52 JPG file Generated</p><small className="text-muted">FontEnd Developer</small>
                </div>
              </div><small className="search-data-size mr-50 text-muted">'11kb</small>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75"><img src="app-assets/images/icons/pdf.png" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">25 PDF File Uploaded</p><small className="text-muted">Digital Marketing Manager</small>
                </div>
              </div><small className="search-data-size mr-50 text-muted">'150kb</small>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75"><img src="app-assets/images/icons/doc.png" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Anna_Strong.doc</p><small className="text-muted">Web Designer</small>
                </div>
              </div><small className="search-data-size mr-50 text-muted">'256kb</small>
            </a></li>
          <li className="d-flex align-items-center"><a href="javascript:void(0);">
              <h6 className="section-label mt-75 mb-0">Members</h6>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75"><img src="app-assets/images/portrait/small/avatar-s-8.jpg" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">John Doe</p><small className="text-muted">UI designer</small>
                </div>
              </div>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75"><img src="app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Michal Clark</p><small className="text-muted">FontEnd Developer</small>
                </div>
              </div>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75"><img src="app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Milena Gibson</p><small className="text-muted">Digital Marketing Manager</small>
                </div>
              </div>
            </a></li>
          <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75"><img src="app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height={32} /></div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Anna Strong</p><small className="text-muted">Web Designer</small>
                </div>
              </div>
            </a></li>
        </ul>
        <ul className="main-search-list-defaultlist-other-list d-none">
          <li className="auto-suggestion justify-content-between"><a className="d-flex align-items-center justify-content-between w-100 py-50">
              <div className="d-flex justify-content-start"><span className="mr-75" data-feather="alert-circle" /><span>No results found.</span></div>
            </a></li>
        </ul>
        {/* END: Header*/}
        {/* BEGIN: Main Menu*/}
        <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
          <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mr-auto"><a className="navbar-brand" href="html/ltr/vertical-menu-template-dark/index.html"><span className="brand-logo">
                    <svg viewBox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={24}>
                      <defs>
                        <linearGradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
                          <stop stopColor="#000000" offset="0%" />
                          <stop stopColor="#FFFFFF" offset="100%" />
                        </linearGradient>
                        <linearGradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
                          <stop stopColor="#EEEEEE" stopOpacity={0} offset="0%" />
                          <stop stopColor="#FFFFFF" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                          <g id="Group" transform="translate(400.000000, 178.000000)">
                            <path className="text-primary" id="Path" d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z" style={{fill: 'currentColor'}} />
                            <path id="Path1" d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z" fill="url(#linearGradient-1)" opacity="0.2" />
                            <polygon id="Path-2" fill="#000000" opacity="0.049999997" points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325" />
                            <polygon id="Path-21" fill="#000000" opacity="0.099999994" points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338" />
                            <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994" points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288" />
                          </g>
                        </g>
                      </g>
                    </svg></span>
                  <h2 className="brand-text">Anti Care</h2>
                </a></li>
              <li className="nav-item nav-toggle"><a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i className="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x" /><i className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc" /></a></li>
            </ul>
          </div>
          <div className="shadow-bottom" />
          <div className="main-menu-content">
            <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
              <li className="nav-item">
                <Link   to="/panel" className="d-flex align-items-center"><i data-feather="home" /><span className="menu-title text-truncate" >Orders</span>
              </Link>
            
              </li>
              <li className="nav-item">
                <Link   to="/products" className="d-flex align-items-center"><i data-feather="home" /><span className="menu-title text-truncate" >Products</span>
              </Link>
            
              </li>
            
           
              <li className=" nav-item">
                <Link className="d-flex align-items-center" to="/agencysettings"><i data-feather="calendar" /><span className="menu-title text-truncate" data-i18n="settings">Settings </span></Link>
              </li>
              <li className=" nav-item">
                <Link className="d-flex align-items-center" to="#" onClick={()=>logout()}><i data-feather="grid" /><span className="menu-title text-truncate" data-i18n="power">Logout</span></Link>
              </li>
            
            
                         </ul>
          </div>
        </div>
        {/* END: Main Menu*/}
 
        </>
    )
}
