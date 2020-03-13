import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ recipe, category }) => {
    return ( 
        <> 
            {recipe && <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ '/' }>Accueil</Link></li>
                { recipe.category && <li className="breadcrumb-item"><Link to={ '/recettes/'+ recipe.category.name }>{ recipe.category.name }</Link></li>}
                <li className="breadcrumb-item active">{ recipe.name }</li>
            </ol>
            ||
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={ '/' }>Accueil</Link></li>
                <li className="breadcrumb-item active">{ category }</li>  
            </ol>}
        </>
    );
}
 
export default Breadcrumbs;