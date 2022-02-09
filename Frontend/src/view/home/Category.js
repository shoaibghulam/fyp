import react,{useEffect,useState} from 'react';
import axios from 'axios';
import url from '../../baseUrl';
import swal from 'sweetalert';
import { Link} from 'react-router-dom';
import useGeoLocation from "../../components/useGeoLocation";
import '../../css/welcome.css'

const Category=()=>{
    const location = useGeoLocation();
    const [data,setData]=useState([]);
    const allData=async()=>{
        axios({
          method: 'GET',
          url: `${url.url}/api/allmodels`,
          
         
        })
        .then((response) => {
          var data= response.data;
         
           setData(data.data)
          }, (error) => {
            console.log(error);
            
          });
      }
      useEffect(()=>{
      
       allData();
     
   },[data.length])
  
    return(
        <>
        <div className="container-fluid">
        <section className="row">
           <div className="col-12 col-md-4 section-a">
              <div className="mt-6 text-center category-logo">
              <a href="javascript:void(0);" className="">
                      <svg viewBox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={118}>
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
                      </svg>
                      <h2 className="brand-text text-primary ml-1 xl-font">Anti Medi Care</h2>
                
                    </a>
                    <h3>Select Category👋</h3>

              </div>
            
           </div>
           <div className="col-12 col-md-8 section-b">
               <div className="mt-5 text-center welcome-text">
               
               <div className="mx-auto">
        <div className="row">
          {data.map((e)=>(
<Link 
to={{
    pathname:"/map",
    state:{ modalId: e.ModalId, location:location }
}}

className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-12">

  <div className="card shadow">
    <img src={`${url.url}${e.ModalThumbnail}`} className="card-img-top" style={{height:'215px'}}/>
    <div className="card-body">
      <h2 className="card-title">{e.ModalTitle}</h2>
      <p className="card-text text-white">{e.ModalDescription}</p>
    </div>
    
  
</div>
</Link>
          ))}
      
       
        </div>
      </div>
               </div>

           </div>
       </section>
        </div>
     
        </>
    )
}
export default Category;