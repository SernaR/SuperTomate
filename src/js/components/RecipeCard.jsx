import React from 'react';
import { Link } from 'react-router-dom'
import { recipeUrl } from '../services/utils'

const recipecard = ({ recipe, col }) => {
    const { id, name, picture, tags, category, slug } = recipe
    
    return ( 
        <div className={"col-" + col}>  
            <div className="card mb-4 text-center"> 
                <h3 className="card-header">{ name }</h3>
                <Link to={ recipeUrl(category, slug) + id } >
                    <img src={ picture } className="img-fluid" alt={ name } ></img>
                </Link>
                <div className="card-body" text-center> 
                    <p className="card-text">
                        {tags.map( (tag, index) => <span key={index} className="badge badge-secondary ml-1">{tag.name}</span>)}
                    </p>
                    <Link className="btn btn-outline-primary btn-sm" to={ recipeUrl(category, slug) + id }>Visualiser</Link>
                </div>
            </div>  
        </div> 
     );
}
 
export default recipecard;

