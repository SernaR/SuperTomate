import React, { useEffect } from 'react';
import Highlights from './Highlights';
import HeadlineRecipe from './HeadlineRecipe';
import { useState } from 'react';
import adminAPI from '../services/adminAPI';
import toaster from '../services/toaster';

const Headlines = () => {

    useEffect( () => {
        fetchList()
    }, [])

    const [highlights, setHighlights] = useState([])
    const [recipes, setRecipes] = useState([])   
    const [headline, setHeadline] = useState({})

    const fetchList = async () => {
        try {
             
            const { highlights} = await adminAPI.getHighlights()
            const { recipes } = await adminAPI.getRecipes()
            const recipeHighlight = await adminAPI.getRecipeHighlight()



            setHighlights(highlights)
            setRecipes(recipes)
            setHeadline(recipeHighlight)

        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    const handleChange = async (recipeHighlight) => {
        try {
            await adminAPI.addRecipeHighlight(recipeHighlight)
            toaster.success("L'actu est actualisé")

        }catch (err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    return ( <>
        <h3 className="recipe-3">Recette à la Une</h3>
        <HeadlineRecipe 
            recipes={recipes}
            headline={headline}
            onChange={handleChange}
        />
        <h3 className="recipe-3">templates</h3>
        <Highlights 
            highlights={ highlights }
            headline={headline}
            //activeHighlight={ recipeHighlight.highlightId }/////////////////////////////////****** */2
            onChange={handleChange}
        />
    </> );
}
 
export default Headlines;