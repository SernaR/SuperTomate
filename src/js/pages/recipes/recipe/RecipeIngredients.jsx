import React from 'react';
import Block from '../../../components/blocks/Block';

const RecipeIngredients = ({ ingredients }) => {
    return ( 
        <Block title="Ingrédients">
            <div className="p-3 mb-1">
                 <ul>
                    { ingredients.map( ingredient => 
                        <li className="lead" key={ingredient.rank} >{ ingredient.content}</li>
                    )}
                </ul>
            </div>
           
        </Block>
     );
}
 
export default RecipeIngredients;