import React, { useEffect, useState } from 'react';
import Cockpit from '../../components/Cockpit'
import Breadcrumbs from '../../components/Breadcrumbs'
import recipesAPI from '../../services/recipesAPI';
import RecipeCards from '../../components/RecipeCards';
import Aside from '../../components/Aside'
import Footer from '../../components/Footer';


//todo pagination
//todo enlever et recoder Breadcrumbs

const RecipesCategoryPage = ({ match }) => {
    const category = match.params.category

    useEffect( () => {
        fetchRecipes();
        setSearchedName('')
        setSelectedTags([])
    }, [category])

    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [searchedName, setSearchedName] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    const handleTagChange = ({currentTarget}) => {
        const {name} = currentTarget;

        if(selectedTags.includes(name)) {
            setSelectedTags(selectedTags.filter( tag => tag !== name ))
           
        } else {
            setSelectedTags([...selectedTags, name])
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        const recipesFilterByTag =  filterByTag(recipes)
        const recipesFilterByName = filterByName(recipesFilterByTag)

        setFilteredRecipes(recipesFilterByName)
    }

    const handleSearchChange = ({ currentTarget }) => {
        setSearchedName(currentTarget.value)
    }

    const handleUnfilter = () => {
        setFilteredRecipes(recipes)
        setSelectedTags([])
        //setSearchedName('')
    }

    const filterByName = recipes => {
        return recipes.filter( recipe => 
            recipe.name.toLowerCase().includes(searchedName.toLowerCase() 
        ))  
    }

    const filterByTag = recipes => {
        if(selectedTags.length > 0) {  
            return recipes.filter( recipe => 
                checkTags(selectedTags, recipe.tags) 
            )
        } else {
            return recipes
        } 
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

    const checkTags = (tags, recipesTags) => {
        let test = false
        recipesTags.map( recipesTag => {
            if(tags.some( tag => tag === recipesTag.name) ){
                test = true
                return
            }
        })  
        return test
    }

    return ( 
        <>
            <main style={{ backgroundImage:"url('/images/fond-vert.jpg')" }}>
                <div className="container">
                    <div className="card px-4"> 
                        <Cockpit title={category} />
                        <div className="row">
                            <div className="col-sm-3 bg-light border-right">
                                <Aside 
                                    selectedTags={ selectedTags }
                                    onTagChange={ handleTagChange }
                                    searchedName={ searchedName }
                                    onSearchChange={ handleSearchChange }
                                    onSubmit={ handleSubmit }
                                    onUnfilter={ handleUnfilter }
                                />
                            </div>
                            <div className="col-sm-9"> 
                                    { filteredRecipes.length > 0 ?  <RecipeCards recipes={filteredRecipes}  col={4}/> :<h2 className="text-center">vide</h2>}
                            </div>
                        </div>   
                    </div>
                </div>
            </main>    
            <Footer/>
        </>
    );
}
 
export default RecipesCategoryPage;