// import React, { useState } from 'react'
// import HeaderBar from '../../layout/header/HeaderBar';
// import List from './List';
// import { Button } from 'react-bootstrap';
// import './Shop.css'
// import data from '../../data';

// function Shop() {
//     const [lists, setLists] = useState([]);
//     const shops = [{
//         categoryName: 'Java',
//         courseName: 'Spring Cloud',
//         metaDescription:'Microservices With Spring Cloud & OAuth 2 Security',
//         imageUrl:  'http://localhost:3000/image/img1.jpg'
//     },
//     {
//         categoryName: 'Java',
//         courseName: 'Java Web Servlet Jsp',
//         metaDescription:'Giới thiệu về cách sử dụng Java Web Servlet Jsp',
//         imageUrl:  'http://localhost:3000/image/img2.jpg'
//     },
//     {
//         categoryName: 'Java',
//         courseName: 'Java Core & JDBC SQL',
//         metaDescription:'Khóa học Core & JDBC SQL cho người bắt đầu',
//         imageUrl:  'http://localhost:3000/image/img3.jpg'
//     },
//     {
//         categoryName: 'JavaScript',
//         courseName: 'ReactJs & Redux',
//         metaDescription:'ReactJs la một thư viện sử dụng JavaScript',
//         imageUrl:  'http://localhost:3000/image/img4.jpg'
//     },
//     {
//         categoryName: 'SQL',
//         courseName: 'SQL co ban va nang cao',
//         metaDescription:'Khóa học SQL cung cấp kiến thức nền tảng vững chắc',
//         imageUrl:  'http://localhost:3000/image/img5.jpg'
//         },];
    
//     function buy
    
//   return (
//         <div>
//         <HeaderBar />
//           <div className='list'>
//               {lists.map((Item) => {
//                   return (
//                       <p>{Item.categoryName}</p> 
//                   )
//               })  }
              
//             </div>
          
//             <section id="sc" className="product">
            
//             <Button>name</Button>
            
//                 <div className="container" >
//                     <div className="row" >
//                         {   //handleGetAllProduct()
//                              shops.map((course, index) => {
//                             return (
//                                 <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item card" key={index} >
                                    
//                                         <img src={course.imageUrl} className="card-img-top" alt="..." />
//                                         <div className="card-body">
//                                             <h5 className="card-title">{course.courseName}</h5>
//                                             <p className="card-text">{course.metaDescription}</p>
//                                         <button className='buy btn-primary btn' onClick={buy}>Buy </button>
//                                         <label className='price'>&emsp; free</label>
//                                         </div>
                                    
//                                 </div>
//                             )
//                         }) 
//                         }
//                   </div>
                  
//                   <div className="row footbar">
                      
//                       <label style={{ fontSize: "20px" }}>Tổng tiền: free</label>
//                       <span>
//                           <button className='pay btn-primary btn'>Thanh toán</button>
//                         </span>
//                   </div>

//                 </div>
//             </section>
//         </div>
//     )
// }
// export default Shop;