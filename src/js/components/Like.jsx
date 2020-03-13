import React, { useState } from 'react';
import Select from './forms/Select';
import likesAPI from '../services/likesAPI';

const Like = ({ recipeId, onLike}) => {
    const [show, setshow] = useState(true)
    const recordOptions = [
        { id: 0, name: ""},
        { id: 1, name: "niveau 1"},
        { id: 2, name: "niveau 2"},
        { id: 3, name: "niveau 3"},
        { id: 4, name: "niveau 4"},
        { id: 5, name: "niveau 5"}
    ]

    const handleChange = async ({currentTarget}) => {  
        try{
            await likesAPI.record(recipeId, currentTarget.value )
            setshow(false)
            onLike({record: parseInt(currentTarget.value) })
        }catch(err){
            console.log(err.response)
        } 
    }

    return ( 
        <div className="my-5 pt-3">
            {show && <Select
                label="Noter la recette:"
                onChange={handleChange}
                options={recordOptions}
            ></Select>} 
        </div>      
    );
}
 
export default Like;

