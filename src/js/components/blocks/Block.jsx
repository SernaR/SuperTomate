import React from 'react'

function Block({title, text, children}) {
    return(
        <section className="pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4">{ title }</h2>
            <div className="container pt-3">
                <p className="lead">{ text }</p>
                <div>{ children }</div>
            </div>
        </section>    
    )
}

export default Block