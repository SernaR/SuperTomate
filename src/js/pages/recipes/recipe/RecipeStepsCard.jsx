import React from 'react';

//todo :  enlever bordure
const RecipeStepsCard = ({ step }) => {
    return ( 
        <div className="card p-3 mb-3">
            <h3>Étape { step.rank }</h3>
            <p style={{whiteSpace: 'pre'}} className="card-text lead">{ step.content }</p>
        </div>
     );
}
 
export default RecipeStepsCard;
