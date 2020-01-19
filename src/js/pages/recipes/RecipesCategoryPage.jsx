import React, { useEffect, useState } from 'react';
import Cockpit from '../../components/Cockpit'
import Breadcrumbs from '../../components/Breadcrumbs'
import recipesAPI from '../../services/recipesAPI';
import RecipeCards from '../../components/RecipeCards';
import Aside from '../../components/Aside'

//todo pagination
//todo cas avec un mauvais tag à finaliser
//todo voir tous les cas
//todo voir pour reinitialiser les filtres

//todo enlever et recoder Breadcrumbs


const RecipesCategoryPage = ({ match }) => {
    const category = match.params.category

    useEffect( () => {
        fetchRecipes();
    }, [category])

    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])

    const filterByTag = (tags, recipesTags) => {
        // à finaliser
        let test = false
        recipesTags.map( recipesTag => {
            if(tags.some( tag => tag === recipesTag.name) ){
                test = true
                return
            }
        })  
        return test
    }

    const handleTagChange = (tags) => {
        setFilteredRecipes(filteredRecipes.filter( recipe => 
            filterByTag(tags, recipe.tags) 
        ))
    }

    const handleSearchChange = (searchedName) => {
        setFilteredRecipes(filteredRecipes.filter( recipe => 
            recipe.name.toLowerCase().includes(searchedName.toLowerCase() 
        )))
    }
        

    const fetchRecipes = async() => {
        try {
            const { recipes } = await recipesAPI.findAll(category)
            setRecipes(recipes)
            setFilteredRecipes(recipes)
        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <main>
            <div className="container">
                <Cockpit title={category} />
                <Breadcrumbs />
                <div className="row">
                    <div className="col-sm-3">
                        <Aside onTagChange={handleTagChange} onSearchChange={handleSearchChange}/>
                    </div>
                    <div className="col-sm-9"> 
                            { filteredRecipes.length > 0 ?  <RecipeCards recipes={filteredRecipes} /> :<h2 className="text-center">vide</h2>}
                    </div>
                </div>   
            </div>
        </main>    
    );
}
 
export default RecipesCategoryPage;