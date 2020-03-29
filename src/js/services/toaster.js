import React from 'react';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import TomatoToast from '../components/TomatoToast';

function success(message) {
    return toast.notify(<TomatoToast message={ message }/>, {
        position: 'bottom-left' 
    })
}

function error(message) {
    toast.notify(<TomatoToast message={ message} error/>, {
        position: 'bottom-left',
        duration: 5000 
      })
}

export default { success, error }