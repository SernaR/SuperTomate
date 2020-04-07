import React, { useState, useEffect } from 'react';
//import Cockpit from '../../components/Cockpit';
import Footer from '../components/Footer';
import Block from '../components/blocks/Block';

import {les_mains_dans_la_tambouille, devenir_cuisinier_vegetal} from '../homepageText.json'
import recipesAPI from '../services/recipesAPI';
import RecipeCards from '../components/RecipeCards';
import ScrollToTopOnMount from '../services/ScrollToTopOnMount';
import Super from '../components/Super';

import toast from '../services/toaster' 

const HomePage = (props) => {
    useEffect( () => {
        fetchRecipes();
    }, []);

    const [newRecipes, setNewRecipes] = useState([])
    const [bestRecipe, setBestRecipe] = useState({})
    const randomIndex = Math.floor( Math.random() * 5 );
    
    const fetchRecipes = async() => {
        try {
            const { newRecipes, bestRecipes } = await recipesAPI.getHome()
            setNewRecipes(newRecipes)
            setBestRecipe(bestRecipes[randomIndex])
        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    return ( 
        <main className="mt-1">
            <ScrollToTopOnMount />
            <div className="jumbotron tomato" style={{ paddingTop: '100px'}}>
                <h1 className="display-4 text-center text-primary">SUPER TOMATE</h1>
                <h2 className="text-center text-primary">Le héros du potager</h2> 
            </div>  
           
            <Block
                title={les_mains_dans_la_tambouille.title}  
                text={les_mains_dans_la_tambouille.text}
            />
            <Block title="Les jeunes pousses">
                <RecipeCards recipes={ newRecipes } col={3}/>
            </Block>
            <Super bestRecipe={bestRecipe} />
            <Footer />
        </main>
    );
}
 
export default HomePage;

/**
 * block pour inscription
 * <Block
        title={devenir_cuisinier_vegetal.title} 
        text={devenir_cuisinier_vegetal.text} 
    />
 */