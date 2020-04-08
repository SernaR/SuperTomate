import React from 'react'

function Block({title, text, children, customH2}) {
    return(
        <section className="pt-3">
            <h2 className={ "display-4 text-center mb-4 "+ customH2}>{ title }</h2>
            <div className="container pt-3">
                <div className="lead" style={{color: '#555'}} dangerouslySetInnerHTML={{__html: text}} />
                <div>{ children }</div>
            </div>
        </section>    
    )
}

export default Block


