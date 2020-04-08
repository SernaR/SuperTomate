import React from 'react'

function Cockpit({title}){
    return(
        <div 
            className="jumbotron jum-cat" 
        >
            <h1 className="display-4 text-center">{ title }</h1>
        </div>   
    )
}

export default Cockpit