import React, { useState, useEffect, useContext } from 'react';
import recipesAPI from '../../../services/recipesAPI';
import Header from './RecipeHeader'
import Ingredients from './RecipeIngredients';
import Steps from './RecipeSteps';
import Footer from '../../../components/Footer';
import Comments from '../../../components/comments/RecipeComments';
import AddComment from '../../../components/comments/AddComment';
import AuthContext from '../../../contexts/AuthContext';
import PageBlock from '../../../components/blocks/pageBlock';
import Breadcrumbs from '../../../components/Breadcrumbs';

import Vote from './RecipeVote';
import Cockpit from './RecipeCockpit';

const Recipe = ({ match }) => {
    
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
                <Header recipe={ recipe } />
                <Vote recipe={ recipe } userId={ isAuthenticated } recipeId={recipeId} onLike={handleLike} isAdmin={isAdmin}/>
                <Ingredients ingredients={recipe.ingredients}/>
                <Steps steps={recipe.steps}/>
            </PageBlock>
            <Footer/>
        </>
        
        
    );
}
 
export default Recipe;

/*{ recipe.isDraft && 
                <p className="text-center mb-4 ">
                    <span className="badge badge-secondary mx-1">Brouillon</span>
                </p>
                ||
                <>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <Hearts likes={ recipe.likes }/>
                    </div>
                    <div className="col-3"><span>test</span></div>     
                </div>
                    
                 </>}*/