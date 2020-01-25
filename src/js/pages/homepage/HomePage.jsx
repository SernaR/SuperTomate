import React, { useState, useEffect } from 'react';
//import Cockpit from '../../components/Cockpit';
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

    const style = {
        backgroundColor: '#fff'
    }

    return ( 
        <main className="mt-1" style={style}>
            <div className="jumbotron tomato" style={{ paddingTop: '100px'}}>
                <h1 className="display-4 text-center">SUPER TOMATE</h1>
                <h3 className="text-center">Le héros du potager</h3> 
            </div>  
           
            <Block
                title={les_mains_dans_la_tambouille.title}  
                text={les_mains_dans_la_tambouille.text}
            />
            <Block title="Les jeunes pousses">
                <RecipeCards recipes={ newRecipes } col={3}/>
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