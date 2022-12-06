import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer, toast } from 'react-toastify';

/**
 * this function is showing notify in app
 * @param {string} type { success, warning, info, error }
 * @param {string} message message í showing
 */
function Notification(type,message){
    console.log('notifycation')
    let config = {
        position:"top-right"
    }
    switch(type){
        case 'success':
            toast.success(message,config)
            break
        case 'warning':
            toast.warning(message,config)
            break
            
        case 'info':
            toast.info(message,config)
            break
            
        case 'error':
            toast.error(message,config)
            break
        default:
            toast(message,config)
    }
}

export default Notification