import React, { useState, useEffect, useContext } from 'react';
import recipesAPI from '../../../services/recipesAPI';
import Header from './RecipeHeader'
import Ingredients from './RecipeIngredients';
import Steps from './RecipeSteps';
import Footer from '../../../components/Footer';
import Comments from '../../../components/comments/Comments';
import AddComment from '../../../components/comments/AddComment';
import AuthContext from '../../../contexts/AuthContext';
import PageBlock from '../../../components/blocks/pageBlock';

const Recipe = ({ match }) => {
    
    const [recipe, setRecipe] = useState({
        name: '',
        serve: '',
        making: '',
        cook: '',
        difficulty: '',
        ingredients: [],
        steps: [],
        comments: []
    })

    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        fetchRecipe(match.params.id)
    }, [])

    const fetchRecipe = async (id) => {
        try {
            const {recipe} = await recipesAPI.find(id)
            setRecipe(recipe)
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <>
            <PageBlock 
                back="visiteur"
                commentBlock={
                    <>
                        { isAuthenticated && <AddComment commentId={ match.params.id }/> }
                        <Comments comments={recipe.comments} />
                    </>  
                }
            >  
                <h1 className="display-2 text-center py-4">{ recipe.name }</h1>  
                <p className="text-center mb-4 ">
                    <i className="fas fa-heart text-danger mx-1"></i>
                    <i className="fas fa-heart text-danger mx-1"></i>
                    <i className="fas fa-heart text-danger mx-1"></i>
                    <i className="fas fa-heart text-danger mx-1"></i>
                    <i className="far fa-heart text-danger mx-1"></i> 
                </p> 
                <Header recipe={ recipe } userId={ isAuthenticated } />
                <Ingredients ingredients={recipe.ingredients}/>
                <Steps steps={recipe.steps}/>
            </PageBlock>
            <Footer/>
        </>
        
        
    );
}
 
export default Recipe;