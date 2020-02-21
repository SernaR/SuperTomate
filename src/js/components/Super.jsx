import React from 'react';
import { Link } from 'react-router-dom';

const Super = ({bestRecipe }) => {
    const{ Recipe, recipeId } = bestRecipe
    return ( 
        <section className="pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4">La super-héroïne du potager</h2>
            <div className="jumbotron super">
                <div className="container text-center">
                    <h3 className="display-4 super-titre">{ Recipe && Recipe.name }</h3>
                </div>
                <div className="container text-center">
                    <Link 
                        className="btn btn-primary btn-lg align-middle" 
                        to={"/recipe/" + recipeId }
                    >Voir les super-pouvoirs</Link>
                </div>
                <div className="container vide"></div>
            </div>
        </section>
    );
}
 
export default Super;