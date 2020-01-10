import React from 'react'
import HomepageRecipeCard from './HomepageRecipeCard'

function HomepageNewRecipes({recipes}) {
        return(
            <div className="card-group">
                { recipes.map( (recipe, index) => <HomepageRecipeCard className="row text-center py-3" key={ index } recipe={ recipe }/>)}
            </div>
        )
}

export default HomepageNewRecipes