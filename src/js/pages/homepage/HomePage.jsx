import React, { useState, useEffect } from 'react';
import Cockpit from '../../components/Cockpit';
import Footer from '../../components/Footer';
import Block from '../../components/Block';

import {les_mains_dans_la_tambouille, devenir_cuisinier_vegetal} from './HomepageText.json'
import recipesAPI from '../../services/recipesAPI';
import RecipeCards from '../../components/RecipeCards';

const HomePage = (props) => {
    useEffect( () => {
        fetchRecipes();
    }, []);

    const [newRecipes, setNewRecipes] = useState([])
    const [bestRecipe, setBestRecipe] = useState({})
    
    const fetchRecipes = async() => {
        try {
            const { newRecipes, bestRecipe } = await recipesAPI.getHome()
            setNewRecipes(newRecipes)
            setBestRecipe(bestRecipe)
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <main className="mt-1">
            <Cockpit 
                title="Super Tomate"
                para="Le héros du potager"
            />
            <Block
                title={les_mains_dans_la_tambouille.title}  
                text={les_mains_dans_la_tambouille.text} 
            />
            <Block title="Les jeunes pousses">
                <RecipeCards recipes={ newRecipes }/>
            </Block>
            
            <Block
                title={devenir_cuisinier_vegetal.title} 
                text={devenir_cuisinier_vegetal.text} 
            />
            <Footer />
        </main>
    );
}
 
export default HomePage;