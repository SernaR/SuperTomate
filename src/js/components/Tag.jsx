import React from 'react'

//TODO pointer
function Tag({name, color = "Dark", onClick }) {  
    return(
        <span
            className={ "badge ml-1" + (color && " pointer " + color) } 
            onClick={ onClick }
            >{ name }
        </span>
    ) 
}

export default Tag