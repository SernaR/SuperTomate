import React from 'react'

//TODO pointer
function Tag({name, color="secondary", onClick }) {  
    return(
        <span
            className={ "badge ml-1" + (color && (" pointer badge-" + color)) } 
            onClick={ onClick }
            >{ name }
        </span>
    ) 
}

export default Tag