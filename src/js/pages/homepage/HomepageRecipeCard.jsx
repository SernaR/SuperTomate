import React from 'react' 

function HomepageRecipeCard({ recipe }) {
    const { name, picture, tags } = recipe
    
    return(    
        <div className="col-lg-3 col-md-6 col-sm-6">   
            <div className="card border-primary d-inline-block mr-3 mb-3">  
                <img src={ picture } className="card-img-top" alt="..."></img>
                <div className="card-body"> 
                    <h3 className="card-title">{ name }</h3>
                    <p className="card-text">
                        {tags.map( (tag, index) => <span key={index} className="badge badge-primary ml-1">{tag.name}</span>)}
                    </p>
                    <button className="btn btn-success">Go somewhere</button>
                </div>
            </div>  
        </div>    
    )
}

export default HomepageRecipeCard