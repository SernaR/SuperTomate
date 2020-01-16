import React from 'react';
import Block from '../../../components/Block';

const RecipeIngredients = ({ ingredients }) => {
    return ( 
        <Block title="Ingrédients">
            <ul className="list-group">
                { ingredients.map( ingredient => 
                    <li className="list-group-item" key={ingredient.rank} >{ ingredient.content}</li>
                )}
            </ul>
        </Block>
     );
}
 
export default RecipeIngredients;