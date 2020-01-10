import React from 'react' 

function HomepageRecipeCard({ recipe }) {
    const { name, tags } = recipe
    
    return(    
        <div className="col-lg-3 col-md-6 col-sm-6">   
            <div className="card border-primary d-inline-block mr-3 mb-3">  
                <img src="../../../img/plat.jpg" className="card-img-top" alt="..."></img>
                <div class="card-body"> 
                    <h3 class="card-title">{ name }</h3>
                    <p class="card-text">
                        {tags.map( (tag, index) => <span key={index} class="badge badge-dark ml-1">{tag.name}</span>)}
                    </p>
                    <button className="primary">Go somewhere</button>
                </div>
            </div>  
        </div>    
    )
}

export default HomepageRecipeCard