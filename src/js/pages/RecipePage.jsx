import React, { useState, useEffect, useContext } from 'react';
import recipesAPI from '../services/recipesAPI';
import Infos from '../components/Infos'
import PageBlock from '../components/blocks/pageBlock';
import Block from './blocks/Block';
//import Ingredients from '../components/RecipeIngredients';
//import Steps from '../components/RecipeSteps';
import RecipeStepsCard from '../components/StepsCard'; 
import Footer from '../components/Footer';
import Comments from '../components/comments/RecipeComments';
import AddComment from '../components/comments/AddComment';
import AuthContext from '../contexts/AuthContext';

import Breadcrumbs from '../components/Breadcrumbs';

import Vote from '../components/Vote';
import Cockpit from '../components/RecipeCockpit'; //à revoir

import '../../css/RecipePage.css'

const RecipePage = ({ match }) => {
    
    const recipeId = match.params.id

    const [recipe, setRecipe] = useState({
        name: '',
        serve: '',
        making: '',
        cook: '',
        difficulty: '',
        ingredients: [],
        steps: [],
        comments: [],
        likes: []
    })

    const { isAuthenticated, isAdmin } = useContext(AuthContext)

    useEffect(() => {
        fetchRecipe(recipeId)
    }, [])

    const fetchRecipe = async (id) => {
        try {
            const {recipe} = await recipesAPI.find(id)
            setRecipe(recipe)
        } catch(err) {
            console.log(err.response)
        }
    }

    const handleLike = (record) => {
        recipe.likes.push(record)
        setRecipe( { ...recipe, likes:recipe.likes})
    }

    return ( 
        <>
            <PageBlock 
                back="visiteur"
                breadcrumds={
                    <Breadcrumbs recipe={ recipe }/>
                }
                commentBlock={
                    <>
                        { isAuthenticated && <AddComment recipeId={ recipeId }/> }
                        <Comments comments={recipe.comments} />
                    </>  
                }
            >  
                <h1 className="display-2 text-center py-4">{ recipe.name }</h1>  
                <Cockpit recipe={ recipe } recipeId={recipeId} userId={ isAuthenticated } isAdmin={isAdmin}/>
                <Infos recipe={ recipe } />
                <Vote recipe={ recipe } userId={ isAuthenticated } recipeId={recipeId} onLike={handleLike} isAdmin={isAdmin}/>
                <Block title="Ingrédients">
                    <div className="p-3 mb-1">
                        <ul>
                            { recipe.ingredients.map( ingredient => 
                                <li className="lead" key={ingredient.rank} >{ ingredient.content}</li>
                            )}
                        </ul>
                    </div>
                
                </Block>
                <Block title="Les étapes de la recette">
                    { recipe.steps.map( step => 
                        <RecipeStepsCard key={ step.rank } step={step}/>
                    )}
                </Block>
            </PageBlock>
            <Footer/>
        </>  
    );
}
 
export default RecipePage;

