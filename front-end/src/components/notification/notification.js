import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer, toast } from 'react-toastify';

function Notification(type,message){
    console.log('notifycation')
    switch(type){
        case 'success':
            toast.success(message,{position: "top-center"})
            break
        case 'warning':
            toast.warning(message,{position: "top-center"})
            break
            
        case 'info':
            toast.info(message,{position: "top-center"})
            break
            
        case 'error':
            toast.error(message,{position: "top-center"})
            break
        default:
            toast(message,{position: "top-center"})
    }
    // return
}

export default Notification