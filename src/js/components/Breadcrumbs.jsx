import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ recipe }) => {
    const { category, name } = recipe
    return (  
        <ol className="breadcrumb bg-danger">
            <li className="breadcrumb-item"><Link to={ '/' }>Accueil</Link></li>
            { category && <li className="breadcrumb-item"><Link to={ '/recettes/'+ category.name }>{ category.name }</Link></li>}
            <li className="breadcrumb-item active">{ name }</li>
        </ol>
    );
}
 
export default Breadcrumbs;