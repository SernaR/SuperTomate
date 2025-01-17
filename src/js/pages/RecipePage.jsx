import React, { useState, useEffect, useContext } from 'react';
import recipesAPI from '../services/recipesAPI';
import Infos from '../components/Infos'
import PageBlock from '../components/blocks/pageBlock';
import Block from '../components/blocks/Block';
import RecipeStepsCard from '../components/StepsCard'; 
import Footer from '../components/Footer';
import Comments from '../components/comments/RecipeComments';
import AddComment from '../components/comments/AddComment';
import AuthContext from '../contexts/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';
import Vote from '../components/Vote';

import toast from '../services/toaster' 

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
            toast.error("Oups, un problème est survenue")
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
                <Infos recipe={ recipe } recipeId={recipeId} userId={ isAuthenticated } isAdmin={isAdmin}/>
                <div className="row p-3">
                    <div id="recette-img" className="col">
                        <img src={ recipe.picture } className="img-fluid card" alt="Responsive image recette" />
                    </div>
                    <div className="col card py-3 lead"> 
                        <Block title="Ingrédients" customH2="recipe"> 
                            <ul>
                                { recipe.ingredients.map( ingredient => 
                                    <li className="food" key={ingredient.rank} >{ ingredient.content}</li>
                                )}
                            </ul>
                        </Block>
                    </div>
                </div>  
                <Block title="Les étapes de la recette" customH2="recipe">
                    { recipe.steps.map( step => 
                        <RecipeStepsCard key={ step.rank } step={step}/>
                    )}
                </Block>
                <Vote recipe={ recipe } userId={ isAuthenticated } recipeId={recipeId} onLike={handleLike} isAdmin={isAdmin}/>
            </PageBlock>
            <Footer/>
        </>  
    );
}
 
export default RecipePage;

