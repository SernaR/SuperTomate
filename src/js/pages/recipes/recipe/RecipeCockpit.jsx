import React from 'react';
import Hearts from '../../../components/Hearts';
import { Link } from 'react-router-dom';

const RecipeCockpit = ({recipe, recipeId, userId, isAdmin}) => {
    const { user, likes } = recipe
    return (  
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                <Hearts likes={ likes }/>
            </div>
            <div className="col-3">
                {((user && userId === user.id) || isAdmin)  &&   
                    <div className="row">
                        <Link to={ "/addRecipe/" + recipeId} >
                            <span className="mx-3 badge badge-primary pointer">modifier</span>
                        </Link>
                        { recipe.isDraft && 
                            <p className="text-center">
                                <span className="badge badge-secondary">Brouillon</span>
                            </p>
                        }   
                    </div>
                }    
            </div>     
        </div>
    )
}
 
export default RecipeCockpit;
