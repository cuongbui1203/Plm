import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllProductApi } from '../../API/productApi';
import Notification from '../../components/notification/notification';
import { data } from '../../data';
import { handleGetAllProduct } from '../../hook/productHook';
import {HeaderBar,SideBar} from '../../layout';
import { actions, useStore } from '../../store';
import './Product.css'

function Product() {
    const [state,dispatch] = useState([])
    let data = [];
    // const [state,dispatch] = useStore()
    async function getProduct(){
        let response = await getAllProductApi()
        // dispatch(actions.setLoading(''))
        if(response.success){
            Notification('success','Get All Product Success')
            console.log(response.data)
            data = response.data
            dispatch(response.data)
        }else{
            Notification('error','Get All Product Fail')
        }
        
    }
    return (
        <div>
        <HeaderBar />
        <SideBar />
            <section id="sc" className="product">
            
            <Button onClick={getProduct} >name</Button>
            
            
                <div className="container" >
                    <div className="row" >
                        {   //handleGetAllProduct()
                             state.map((course, index) => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index} >
                                    <div className="m-2 card p-2">
                                    <img src={course.imageUrl} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{course.name}</h5>
                                            <p className="card-text">{course.history}</p>
                                        </div>
                                    </div>
                                        
                                    
                                </div>
                            )
                        }) 
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product;