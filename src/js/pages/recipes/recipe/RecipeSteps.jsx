import React from 'react';
import RecipeStepsCard from './recipeStepsCard';
import Block from '../../../components/Block';

const RecipeSteps = ({steps}) => {
    
    return ( 
        <Block title="Les étapes de la recette">
            { steps = steps.map( step => 
                <RecipeStepsCard key={ step.rank } step={step}/>
            )}
        </Block>
     );
}
 
export default RecipeSteps;