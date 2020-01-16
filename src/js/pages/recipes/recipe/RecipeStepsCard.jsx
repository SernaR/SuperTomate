import React from 'react';

//todo :  enlever bordure
const RecipeStepsCard = ({ step }) => {
    const none = "none"
    return ( 
        <div className="card p-3 mb-3">
            <h3>Étape { step.rank }</h3>
            <pre style={{ border: none }} className="card-text">{ step.content }</pre>
        </div>
     );
}
 
export default RecipeStepsCard;