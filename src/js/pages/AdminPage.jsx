import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cockpit from '../components/Cockpit';

//TODO : refacto les inputs et methodes

const AdminPage = (props) => {

    useEffect( () => {
        fetchList()
    }, [])

    const [params, setParams] = useState({
        tag: '',
        difficulty: '',
        category: ''
    })

    const [list, setList] = useState({
        tags: [],
        difficulties: [],
        categories: []
    })

    const fetchList = async () => {
        await Axios.get('http://localhost:3000/api/user/recipe-params')
            .then( result => {
                const { tags, difficulties, categories } = result.data
                setList({ tags, difficulties, categories})
                
            })
            .catch( err => console.log(err.response))
    }

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setParams({ ...params, [name]: value })
    }

    //const handleListChange = list => setNewRecipe({ ...newRecipe, [list]: list })

    const categories = list.categories.map( category => <li key={category.id}>{category.name}</li>)
    const tags = list.tags.map( tag => <li key={tag.id}>{tag.name}</li>)
    const difficulties = list.difficulties.map( difficulty => <li key={difficulty.id}>{difficulty.name}</li>)

    const handleCategorySubmit = event => {
        event.preventDefault()
        Axios
            .post('http://localhost:3000/api/admin/category', { category: params.category})
            .then( result => {
                list.categories.push(result.data)
                setParams({ ...params, category:'' })
            })
            .catch( err => console.log(err.response))
    }

    const handleTagSubmit = event => {
        event.preventDefault()
        Axios
            .post('http://localhost:3000/api/admin/tag', { tag: params.tag})
            .then( result => {
                list.tags.push(result.data)
                setParams({ ...params, tag:'' })
            })
            .catch( err => console.log(err.response))
    }

    const handleDifficultySubmit = event => {
        event.preventDefault()
        Axios
            .post('http://localhost:3000/api/admin/difficulty', { difficulty: params.difficulty })
            .then( result => {
                list.difficulties.push(result.data)
                setParams({ ...params, difficulty:'' })
            })
            .catch( err => console.log(err.response))
    }

    return ( 
        <main> 
            <div className="container">
                <div className="card px-4"> 
                    <Cockpit title="Admin Page" />
                    <form >
                        <div className="form-group">
                            <label className="control-label">Ajouter une catégorie</label>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input name="category" type="text" value={ params.category } className="form-control" onChange={handleChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text" onClick={handleCategorySubmit}>Envoyer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul>{ categories }</ul>

                    <form >
                        <div className="form-group">
                            <label className="control-label">Ajouter un tag</label>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input name="tag" type="text" value={ params.tag } className="form-control" onChange={handleChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text" onClick={handleTagSubmit}>Envoyer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul>{ tags }</ul>

                    <form >
                        <div className="form-group">
                            <label className="control-label">Ajouter une difficulté</label>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input name="difficulty" type="text" value={ params.difficulty } className="form-control" onChange={handleChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text" onClick={handleDifficultySubmit}>Envoyer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul>{ difficulties }</ul>
                </div>
            </div>    
        </main>
     );
}
 
export default AdminPage
