import React, { useEffect } from 'react';

const Breadcrumbs = (props) => {
    
    return (  
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Accueil</a></li>
            <li className="breadcrumb-item"><a href="#">Catégories</a></li>
            <li className="breadcrumb-item active">Entrées</li>
        </ol>
    );
}
 
export default Breadcrumbs;