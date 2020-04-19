import React, { useState } from 'react';

const HeadlineRecipe = ({ recipes, headline, onChange}) => {

    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [searchedName, setSearchedName] = useState('')
    const [show, setShow] = useState(false)

    const handleChange = ({ currentTarget }) => {
        const name = currentTarget.value

        setSearchedName(name)
        setFilteredRecipes(filterByName(name))
        if(name.length > 2) setShow(true)
        if(name.length < 3) setShow(false)
    }

    const handleClick = (recipe) => {
        setSearchedName(recipe.name)
        setShow(false)
        onChange({ ...headline, recipeId: recipe.id, recipeName: recipe.name})
    }

    const filterByName = name => {
        return recipes.filter( recipe => 
            recipe.name.toLowerCase().includes(name.toLowerCase() 
        ))  
    }

    return ( <>
        <div className="card mb-2"> 
            <input 
                type="text" 
                className="ml-3 borderless" 
                placeholder={headline.recipeName}
                name="Rechercher" 
                value={ searchedName } 
                onChange={handleChange}
            /> 
            { show && <>
                <hr className="custom-hr"/>
                { filteredRecipes.map((recipe, index) => 
                    <input 
                        key={index}
                        className="ml-3 borderless pointer" 
                        value={ recipe.name } 
                        readOnly 
                        onClick={ () => handleClick(recipe) }
                    />
                )}
            </>}
                
        </div>
    </> )
}
 
export default HeadlineRecipe;