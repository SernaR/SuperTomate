import React from 'react';

//TODO : user ??
//todo : notes -->  <p className="my-5 pt-3" id="note">Noter la recette: </p>

const RecipeHeader = ({ recipe, userId }) => {
    const { serve, making, cook, picture, difficulty, user } = recipe

    return ( 
        <div className="row p-3">
            <div id="recette-img" className="col">
                <img src={picture} className="img-fluid card" alt="Responsive image recette" />
            </div>
            <div className="col card py-3 lead"> 
                <p>Difficulté : {difficulty.name }</p>
                <p>Nombre de personnes : { serve }</p>
                <p>Préparation : { making }mn</p>
                <p>Cuisson : { cook }mn</p>

                { (user && userId === user.id)  &&
                    <button className="ml-3 btn btn-outline-primary btn-sm">modifier</button>
                }
            </div>
        </div>
     );
}
 
export default RecipeHeader;

