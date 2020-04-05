import React from 'react';


const Infos = ({ recipe }) => {
    const { serve, making, cook, wait, picture, difficulty } = recipe
    
    return ( 
        <div className="row p-3">
            <div id="recette-img" className="col">
                <img src={picture} className="img-fluid card" alt="Responsive image recette" />
            </div>
            <div className="col card py-3 lead"> 
                <p>Difficulté : {difficulty.name }</p>
                <p>Nombre de personnes : { serve }</p>
                <p>Préparation : { making } mn</p>
                { cook !== 0 && <p>Cuisson : { cook } mn</p>}
                { wait !== 0 && <p>Repos : { wait } mn</p> }
            </div>
        </div>
     );
}
 
export default Infos;
''
