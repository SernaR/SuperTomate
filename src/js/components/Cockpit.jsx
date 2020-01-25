import React from 'react'

function Cockpit({title, para}){
    return(
        <div className="jumbotron" style={{ marginTop: '80px'}}>
            <h1 className="display-4 text-center">{ title.toUpperCase() }</h1>
            { para && <h3 className="text-center">{ para }</h3> }
        </div>   
    )
}

export default Cockpit