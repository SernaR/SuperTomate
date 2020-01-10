import React from 'react'

function Block({title, text, children}) {
    return(
        <section className="pt-3">
            <h2 className="display-4 text-center">{ title}</h2>
            <p className="lead" >{ text }</p>
            <div>{ children }</div>
        </section>    
    )
}

export default Block