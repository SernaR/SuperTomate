import React from 'react';
import Hearts from './Hearts';
import { Link } from 'react-router-dom';


const Infos = ({recipe, recipeId, userId, isAdmin}) => {
    const { name, user, likes, serve, making, cook, wait, difficulty } = recipe
    
    return (<>
        {((user && userId === user.id) || isAdmin)  &&   
            <div className="row d-flex justify-content-end">
                <Link to={ "/addRecipe/" + recipeId} >
                    <span className="mx-3 badge badge-primary pointer">modifier</span>
                </Link>
            </div>
        }
        <h1 className="display-2 text-center py-4">{ name }</h1>  
        <div className="row">
            <div className="col-12">
                { recipe.isDraft &&
                    <p className="text-center"><span className="badge badge-secondary">Brouillon</span></p>
                ||
                    <Hearts likes={ likes }/>
                }    
            </div> 
        </div>
        <div class="row d-flex justify-content-around p-2">
            <div>               
                <p>Difficulté : {difficulty.name }</p>
            </div>
            <div>               
                <p>Nombre de personnes : { serve }</p>
            </div>
            <div>               
                <p>Préparation : { making } mn</p>
            </div>
            { cook !== 0 && <div>               
                <p>Temps de cuisson :  { cook } mn</p>
            </div> }
            { wait !== 0 &&<div>               
                <p>Temps de repos : { wait } mn</p>
            </div> }
        </div>
    </>)
}
 
export default Infos;