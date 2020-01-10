import React from 'react'

const red = "#999"


function Cockpit({title, para}){
    return(
        <div className="jumbotron mt-2" style={{ background: red }}>
            <h1 className="display-4 text-center">{ title }</h1>
            <p className="text-center">{ para }</p>
        </div>   
    )
}

export default Cockpit