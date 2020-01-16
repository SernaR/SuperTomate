import React, { useState, useEffect } from 'react';
import Cockpit from '../../components/Cockpit';
import Footer from '../../components/Footer';
import Block from '../../components/Block';

import {les_mains_dans_la_tambouille, devenir_cuisinier_vegetal} from './HomepageText.json'
import HomepageNewRecipes from './HomepageNewRecipes';
import recipesAPI from '../../services/recipesAPI';

const HomePage = (props) => {
    useEffect( () => {
        fetchRecipes();
    }, []);

    const [newRecipes, setNewRecipes] = useState([])
    const [bestRecipe, setBestRecipe] = useState({})
    
    const fetchRecipes = async() => {
        try {
            const { newRecipes, bestRecipe } = await recipesAPI.findAll()
            setNewRecipes(newRecipes)
            setBestRecipe(bestRecipe)
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <>
            <Cockpit 
                title="Super Tomate"
                para="Le héros du potager"
            />
            <Block
                title={les_mains_dans_la_tambouille.title}  
                text={les_mains_dans_la_tambouille.text} 
            />
            <Block title="Les jeunes pousses">
                <HomepageNewRecipes recipes={ newRecipes }/>
            </Block>
            
            <Block
                title={devenir_cuisinier_vegetal.title} 
                text={devenir_cuisinier_vegetal.text} 
            />
            <Footer />
        </>
    );
}
 
export default HomePage;