import React, { useState, useEffect } from 'react';     
import Cockpit from '../../../components/Cockpit';
import Field from '../../../components/forms/Field'
import recipeAPI from '../../../services/recipesAPI'
import AddRecipeList from './AddrecipeList';
import Tag from '../../../components/Tag'
import Select from '../../../components/forms/Select';
import Block from './AddRecipeBlock';

//TODO : contraintes
//TODO : prise en charge des options du select
//TODO : revoir addRecipeList - refacto
//TODO : prise en charge des tags -> composant
//TODO : notification

const AddRecipe = () => {
    useEffect( () => {
        fetchRecipeParams()
    }, [])

    const [newRecipe, setNewRecipe] = useState({
        name: '',
        difficulty: '',
        serve: '',
        cook: '', 
        making: '', 
        category: '',
        tags: [],
        ingredients: [],
        steps: [],
        picture: null,
        isDraft: false
    })

    const [params, setParams] = useState({
        tags: [],
        difficulties: [],
        categories: []
    })

    const fetchRecipeParams = async () => {
        try {
            const { tags, difficulties, categories } = await recipeAPI.getParams()
            setNewRecipe({ ...newRecipe,
                difficulty: difficulties[0].id,
                category: categories[0].id ,
            })
            setParams({ tags, difficulties, categories })
        } catch(err) {
            console.log(err.response)
        }
        
    }

    
    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setNewRecipe({ ...newRecipe, [name]: value })
    };

    const handleIngredientsChange = ingredients => setNewRecipe({ ...newRecipe, ingredients })
    const handleStepsChange = steps => setNewRecipe({ ...newRecipe, steps })

    const handleImageChange = ({ currentTarget }) => setNewRecipe({ ...newRecipe, picture: currentTarget.files[0] })

    const handleTagChange = (id) => {
            const tags = newRecipe.tags
            if ( tags.indexOf(id) === -1 && tags.length < 3 ) {
                tags.push(id)
                setNewRecipe({ ...newRecipe, tags})
            } else  {
                setNewRecipe({ ...newRecipe, tags: tags.filter( tag => tag !== id )})   
            } 
    }

    const handleRecipeSubmit = async (event) => {
        event.preventDefault()
        console.log(newRecipe)
        
        const { name, difficulty, serve, making, cook, tags, category, isDraft } = newRecipe 
        const steps = newRecipe.steps.map( (step, index) => { return {"rank": index + 1, "content": step} })
        const ingredients = newRecipe.ingredients.map( (ingredient, index) => { return {"rank": index + 1, "content": ingredient} })

        const picture = newRecipe.picture
        let formData = new FormData()

        formData.append('image', picture)
        formData.set('name', name)
        formData.set('difficulty', difficulty)
        formData.set('serve', serve)
        formData.set('making', making)
        formData.set('cook', cook)
        formData.set('tags', JSON.stringify(tags)) 
        formData.set('steps', JSON.stringify(steps))
        formData.set('ingredients', JSON.stringify(ingredients))
        formData.set('category', category)
        formData.set('isDraft', isDraft)

        try {
            await recipeAPI.save(formData)
            clearForm()
        } catch(err) {
            //NotificationManager.error(err.response.data.error, 'Error');
            console.log(err.response)
        } 
    }
    
    const handleDraftSubmit = event => {
        setNewRecipe({ ...newRecipe,
            isDraft: true
        })
        handleRecipeSubmit(event)
    }

    const clearForm = () => {
        setNewRecipe({ //...newRecipe,
            name: '',
            difficulty: params.difficulties[0].id,
            serve: '',
            cook: '', 
            making: '', 
            category: params.categories[0].id,
            tags: [],
            ingredients: [],
            steps: [],
            picture: null,
            isDraft: false, 
        })
    }  

    const tags = params.tags.map( tag => <Tag 
        key={tag.id} 
        name={ tag.name }  
        color={ newRecipe.tags && newRecipe.tags.includes(tag.id) ? "success" : "secondary" }
        onClick={() => handleTagChange(tag.id)}/>
    ) 
    const difficulty = params.difficulties.map( (d, index) => <option key={index} value={d.id}>{ d.name }</option>)
    const category = params.categories.map( (c, index) => <option key={index} value={c.id}>{c.name}</option> )
    
    return ( 
    <div className="container">
        <Cockpit title="Proposer une recette" />
        <form>
            <Field
                label="Nom de la recette"
                value={newRecipe.name}
                onChange={handleChange}
                name="name"
            />
            <Select
                label="Difficulté"
                value={newRecipe.difficulty}
                onChange={handleChange}
                name="difficulty"
                options={ difficulty }
            />
            <hr></hr>
            <div className="row mb-3">
                <div className="col">
                <Field 
                    label="Temps de préparation (en mn)"
                    type="number"
                    value={newRecipe.making}
                    onChange={handleChange}
                    name="making"
                />
                </div>
                <div className="col">
                <Field 
                    label="Temps de cuisson (en mn)"
                    type="number"
                    value={newRecipe.cook}
                    onChange={handleChange}
                    name="cook"
                />
                </div>
                <div className="col">
                <Field 
                    label="Nombre de personnes"
                    type="number"
                    value={newRecipe.serve}
                    onChange={handleChange}
                    name="serve"
                />
                </div>
            </div>
            <hr></hr>
            
            <Select
                label="Catégories"
                value={newRecipe.category}
                onChange={handleChange}
                name="category"
                options={ category }
            />
            <Block>
                {tags}
            </Block>
            <hr></hr>
            <Block label="Ingrédients">
                <AddRecipeList
                    items={ newRecipe.ingredients }
                    aria="ingrédients"
                    onChange={ handleIngredientsChange }/>
            </Block> 
            <Block label="Étapes">
                <AddRecipeList
                    items={ newRecipe.steps }
                    aria="steps"
                    type="textarea"
                    onChange={ handleStepsChange }/>
            </Block>   
            <Block label="Ajouter une photo">
                <div className="input-group mb-3">    
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="inputGroupFile" 
                            aria-describedby="fileHelp" 
                            onChange={ handleImageChange }
                        />
                        <label className="custom-file-label" htmlFor="inputGroupFile">{ (newRecipe.picture && newRecipe.picture.name) || "selectionner une image" }</label>
                    </div>
                </div>
            </Block>       
            <hr></hr>
            <div className="container text-center my-5">
                <button type="submit" className="btn btn-outline-success mx-1" onClick={handleRecipeSubmit}>Ajouter ma recette</button>
                <button className="btn btn-outline-secondary" onClick={handleDraftSubmit}>Enregistrer le brouillon</button>
            </div>
        </form>
    </div> );
}
 
export default AddRecipe;