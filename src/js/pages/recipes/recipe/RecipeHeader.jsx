import React from 'react';
import { Link } from 'react-router-dom';
import Like from '../../../components/Like';

const RecipeHeader = ({ recipe, userId, recipeId, onLike, isAdmin }) => {
    const { serve, making, cook, picture, difficulty, user, likes } = recipe
    let isRecorded

    if (likes) {
        isRecorded = likes.findIndex( like => like.userId === userId) === -1
    }  
    
    const handleLike = (record) => onLike({...record, userId})
    
    return ( 
        <div className="row p-3">
            <div id="recette-img" className="col">
                <img src={picture} className="img-fluid card" alt="Responsive image recette" />
            </div>
            <div className="col card py-3 lead"> 
                <p>Difficulté : {difficulty.name }</p>
                <p>Nombre de personnes : { serve }</p>
                <p>Préparation : { making } mn</p>
                <p>Cuisson : { cook } mn</p>

                {  ((user && userId === user.id) || isAdmin)  &&
                    <>
                        <Link to={ "/addRecipe/" + recipeId} >
                            <button className="ml-3 btn btn-outline-primary btn-sm">modifier</button>
                        </Link> 
                        { isRecorded && <Like recipeId={ recipeId } onLike={handleLike}/> }
                    </>
                }
            </div>
        </div>
     );
}
 
export default RecipeHeader;
''
