import React from 'react';

//TODO : user ??
//todo : notes -->  <p className="my-5 pt-3" id="note">Noter la recette: </p>

const RecipeHeader = ({ recipe }) => {
    const { serve, making, cook, picture, difficulty } = recipe
    return ( 
        <div className="row p-3">
            <div id="recette-img" className="col-md-6 col-sm-12">
                <img src={picture} className="img-fluid card" alt="Responsive image recette" />
            </div>
            <div className="col-md-6 col-sm-12 card py-3"> 
                <p>Difficulté: { difficulty.name }</p>
                <p>Nombre de personnes: { serve }</p>
                <p>Préparation: { making }mn</p>
                <p>Cuisson: { cook }mn</p>
                
            </div>
        </div>
     );
}
 
export default RecipeHeader;

