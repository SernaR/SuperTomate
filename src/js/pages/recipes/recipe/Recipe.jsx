import React, { useState, useEffect } from 'react';
import recipesAPI from '../../../services/recipesAPI';
import Header from './RecipeHeader'
import Ingredients from './RecipeIngredients';
import Steps from './RecipeSteps';

const Recipe = ({ match }) => {
    const [recipe, setRecipe] = useState({
        name: '',
        serve: '',
        making: '',
        cook: '',
        difficulty: '',
        ingredients: [],
        steps: []
    })

    useEffect(() => {
        fetchRecipe(match.params.id)
    }, [])

    const fetchRecipe = async (id) => {
        try {
            const {recipe} = await recipesAPI.find(id)
            setRecipe(recipe)
            console.log(recipe)/////////////////////////////////////////////////
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <div className="container bg-white card p-3 mb-5">
            <h1 className="display-2 text-center py-4">{ recipe.name }</h1>   
            <Header recipe={recipe} />
            <Ingredients ingredients={recipe.ingredients}/>
            <Steps steps={recipe.steps}/>
            
        </div>
    );
}
 
export default Recipe;