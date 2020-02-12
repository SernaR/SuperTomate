import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cockpit from '../components/Cockpit';
import adminAPI from '../services/adminAPI';
import Comments from '../components/comments/Comments';
import CommentBlock from '../components/blocks/CommentBlock';
import PageBlock from '../components/blocks/pageBlock';

//TODO : refacto les inputs

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
        categories: [],
    })

    const [comments, setComments] = useState([])

    const fetchList = async () => {
        try {
            const { tags, difficulties, categories } = await adminAPI.getParams()
            const { comments } = await adminAPI.getComments()

            setList({ tags, difficulties, categories })
            setComments(comments)

        } catch(err) {
            console.log(err.response)
        }
    }

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setParams({ ...params, [name]: value })
    }

    const handleChangeComments = (comments) => {
        setComments(comments)
    }

    const categories = list.categories.map( (category, index) => <li key={index}>{category.name}</li>)
    const tags = list.tags.map( (tag, index) => <li key={index}>{tag.name}</li>)
    const difficulties = list.difficulties.map( (difficulty, index) => <li key={index}>{difficulty.name}</li>)

    const handleCategorySubmit = async event => {
        event.preventDefault()
        try {
            const category = await adminAPI.setCategory(params.category)
            list.categories.push(category)
            setParams({ ...params, category:'' })

        } catch(err) {
            console.log(err.response)
        }
    }

    const handleTagSubmit = async event => {
        event.preventDefault()
        try {
            const tag = await adminAPI.setTag(params.tag)
            list.tags.push(tag)
            setParams({ ...params, tag:'' })
    
        } catch(err) {
            console.log(err.response)
        }
    }

    const handleDifficultySubmit = async event => {
        event.preventDefault()
        try {
            const difficulty = await adminAPI.setDifficulty(params.difficulty)
            list.difficulties.push(difficulty)
            setParams({ ...params, difficulty:'' })

        } catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <PageBlock 
            back="gris"
            commentBlock={
                <>
                    <Comments
                        onModerated={ handleChangeComments }
                        comments={ comments } 
                        isAdmin={ true } 
                    />  
                </>
            }
        >
            
            <Cockpit title="Admin Page" />    
            <CommentBlock title="Paramètres">
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
            </CommentBlock>     
        </PageBlock>
     );
}
 
export default AdminPage
