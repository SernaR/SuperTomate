import React, { useState } from 'react';
import likesAPI from '../services/likesAPI';
import toast from '../services/toaster' 

const Like = ({ recipeId, onLike}) => {
    
    const records = [
        { vote: 1, name: "kazebodjai"},
        { vote: 2, name: "kaze"},
        { vote: 3, name: "Banni"},
        { vote: 4, name: "Banni uai"},
        { vote: 5, name: "Uai banni uai"}
    ]

    const handleClick = async (vote) => {  
        try{
            await likesAPI.record(recipeId, vote )
            onLike({record: parseInt(vote) }) 
            toast.success("Merci pour le vote")
        }catch(err){
            toast.error("Oups, un problème est survenue")
        } 
    }

    return ( 
        <div className="row p-3">
            <div className="lead col-sm-4">Noter la recette:</div>
            <div className="col-sm-8 ">
                { records.map( (record, index) =>
                    <span
                        key={index}
                        className="badge ml-2 pointer badge-secondary"
                        onClick={ () => handleClick(record.vote) }
                        >{ record.name }
                    </span>
                )}
            </div>
        </div>      
    );
}
 
export default Like;

/**
 *   const [show, setshow] = useState(true)
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
        <div className="pt-3">
            {show && <Select
                label="Noter la recette:"
                onChange={handleChange}
                options={recordOptions}
            ></Select>} 
        </div>      
    );
 */
/////////////////////////////////////////////////////
/**
 * 
 * const [ vote, setVote ] = useState(0)

    const hearts = []
    for (let i = 1; i <= 5; i++) {
        hearts.push( <i 
            key={i} 
            className={( i <= vote ? "text-danger fas": "far" ) + " fa-heart mx-1"}
            onMouseOver={() => handleMouseHover(i)}
            //onMouseLeave={() => setVote(0) } // to improve
            onClick = {() => handleclick(i)}
        ></i> ) 
    } 

    const handleMouseHover = (i) => {
        console.log(i)
        setVote(i)
    }

    const handleclick = (i) => {  
        try{
            console.log('click ' + i)
            setVote(i)
            //await likesAPI.record(recipeId, currentTarget.value )
            //onLike({record: parseInt(currentTarget.value) })
        }catch(err){
            console.log(err.response)
        } 
    }

    const recordOptions = [
        { id: 0, name: ""},
        { id: 1, name: "niveau 1"},
        { id: 2, name: "niveau 2"},
        { id: 3, name: "niveau 3"},
        { id: 4, name: "niveau 4"},
        { id: 5, name: "niveau 5"}
    ]

    return ( 
        <div className="pt-3">
            <Select
                label="Noter la recette:"
                options={recordOptions}
            ></Select>
             <div className="pt-3">
                { hearts }
            </div>     
        </div>      
    );
 */