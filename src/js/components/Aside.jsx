import React, { useState, useEffect } from 'react';  
import recipesAPI from '../services/recipesAPI';
import Check from './forms/Check';

const Aside = ({selectedTags, onTagChange, searchedName, onSearchChange, onSubmit, onUnfilter}) => {
    useEffect( () => {
        fetchTags()
    },[])

    const [tags, setTags] = useState([])

    const fetchTags = async () => {
        try{
            const {tags} = await recipesAPI.getTags()
            setTags(tags)
        }catch(err) {
            console.log(err.response)
        }
    }
    return ( 
        <aside >
            <form className="form-inline my-4" onSubmit={onSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Rechercher" name="Rechercher" value={searchedName} onChange={onSearchChange}/>
                </div>
            </form>
            <form onSubmit={onSubmit}>
                <h2 className="mt-4">Filtrer par:</h2>
                {
                    tags.map( tag => 
                        <Check 
                            key={tag.id} 
                            name={tag.name}
                            checked = { selectedTags.includes(tag.name) } 
                            onChange={onTagChange}
                        />)
                }
                <button type="submit" className="btn btn-primary my-4">Filtrer</button>
                <button type="button" className="btn btn-link" onClick={onUnfilter}>Vider les filtres</button>
            </form>
        </aside>
    );
}
 
export default Aside;