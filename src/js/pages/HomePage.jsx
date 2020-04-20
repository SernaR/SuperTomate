import React, { useState, useEffect } from 'react';
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
    const [headline, setHeadline] = useState({})
    
    const fetchRecipes = async() => {
        try {
            const { newRecipes } = await recipesAPI.getHome() 
            const {recipe, highlight } = await recipesAPI.getHeadline()

            setNewRecipes(newRecipes)
            setHeadline({ recipe, highlight })
            
        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    return ( 
        <main className="mt-1">
            <ScrollToTopOnMount />
            <div className="jumbotron tomato text-center">
                <h1 className="display-4">SUPER TOMATE</h1>
                <h2>Le héros du potager</h2> 
            </div>  
           
            <Block
                customH2="recipe"
                title={les_mains_dans_la_tambouille.title}  
                text={les_mains_dans_la_tambouille.text}
            />
            <Block title="Les jeunes pousses" customH2="recipe">
                <RecipeCards recipes={ newRecipes } col={3}/>
            </Block>
                <Super headline={ headline } />
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