import React from 'react'

function Cockpit({title}){
    return(
        <div 
            className="jumbotron" 
            style={{ 
                marginTop: '80px', 
                color:'#fff', 
                background: '#78C2AD'
            }}
        >
            <h1 className="display-4 text-center">{ title.toUpperCase() }</h1>
        </div>   
    )
}

export default Cockpit