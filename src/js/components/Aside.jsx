import React, { useState, useEffect } from 'react';  
import recipesAPI from '../services/recipesAPI';
import Check from './forms/Check';

const Aside = ({onTagChange, onSearchChange}) => {
    useEffect( () => {
        fetchTags()
    },[])

    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [searchedName, setSearchedName] = useState('')


    const handleTagChange = ({currentTarget}) => {
        const {name} = currentTarget;

        if(selectedTags.includes(name)) {
            setSelectedTags(selectedTags.filter( tag => tag !== name ))
           
        } else {
            setSelectedTags([...selectedTags, name])
        }
    }

    const handleSearchChange = ({ currentTarget }) => {
        setSearchedName(currentTarget.value)
    };

    const handleTagSubmit = event => {
        event.preventDefault()
        if(selectedTags.length > 0) onTagChange(selectedTags)
    }

    const handleSearchSubmit = event => {
        event.preventDefault()
        onSearchChange(searchedName)
    }

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
            <form className="form-inline my-4" onSubmit={handleSearchSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control mr-sm-2" placeholder="Rechercher" name="Rechercher" value={searchedName} onChange={handleSearchChange} />
                </div>
            </form>
            <form onSubmit={handleTagSubmit}>
                <h2 className="mt-3">Filtrer par:</h2>
                {
                    tags.map( tag => 
                        <Check 
                            key={tag.id} 
                            name={tag.name}
                            checked = { selectedTags.includes(tag.name) } 
                            onChange={handleTagChange}
                        />)
                }
                <button type="submit" className="btn btn-secondary my-4">Filtrer</button>
            </form>
        </aside>
    );
}
 
export default Aside;