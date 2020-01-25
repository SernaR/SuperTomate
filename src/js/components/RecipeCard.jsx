import React from 'react';
import { Link } from 'react-router-dom'

const recipecard = ({ recipe, col }) => {
    const { id, name, picture, tags } = recipe
    return ( 
        <div className={"col-" + col}>  
            <div className="card mb-4"> 
                <h3 className="card-header">{ name }</h3>
                <Link to={"/recipe/" + id } >
                    <img src={ picture } className="img-fluid" alt={ name } ></img>
                </Link>
                <div className="card-body"> 
                    <p className="card-text">
                        {tags.map( (tag, index) => <span key={index} className="badge badge-secondary ml-1">{tag.name}</span>)}
                    </p>
                    <Link className="btn btn-primary" to={"/recipe/" + id }>Visualiser</Link>
                </div>
            </div>  
        </div> 
     );
}
 
export default recipecard;

