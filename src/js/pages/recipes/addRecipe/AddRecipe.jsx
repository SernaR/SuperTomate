import React, { useState, useEffect } from 'react';     
import Cockpit from '../../../components/Cockpit';
import Field from './AddRecipeField';
import Select from '../../../components/forms/Field'
import recipeAPI from '../../../services/recipesAPI'
import AddRecipeList from './AddrecipeList';
import Tag from '../../../components/Tag'

const AddRecipe = (props) => {
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
        isDraft: false,
        tagList: [],
        difficultyList: [],
        categoryList: []
    })

    const fetchRecipeParams = async () => {
        try {
            const { tags, difficulties, categories } = await recipeAPI.getParams()
            setNewRecipe({
                difficulty: difficulties[0].id,
                category: categories[0].id ,
                tagList: tags, 
                difficultyList: difficulties, 
                categoryList: categories
            })
        } catch(err) {
            console.log(err.response)
        }
        
    }

    //TODO : contraintes
    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setNewRecipe({ ...newRecipe, [name]: value })
    };

    const handleIngredientsChange = ingredients => setNewRecipe({ ...newRecipe, ingredients })
    const handleStepsChange = steps => setNewRecipe({ ...newRecipe, steps })
    const handleImageChange = ({ currentTarget }) => setNewRecipe({ ...newRecipe, picture: currentTarget.files[0] })
    const handleTagChange = (index) => {
        const tagList = [...newRecipe.tagList]
        const oldTags = [...newRecipe.tags]
        
        let tags
        if (!tagList[index].selected && oldTags.length < 3) {
            tagList[index].selected = true
            tags = [...oldTags, tagList[index].id]
            setNewRecipe({ ...newRecipe, tagList, tags })
        } else if (tagList[index].selected) {
            tagList[index].selected = false
            tags = oldTags.filter( t =>  t !== tagList[index].id )
            setNewRecipe({ ...newRecipe, tagList, tags }) 
        }    
    }

    const handleRecipeSubmit = async (event) => {
        event.preventDefault()
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
            //TODO : notification
        } catch(err) {
            //NotificationManager.error(err.response.data.error, 'Error');
            console.log(err.response)
        }
    }
    
    const handleDraftSubmit = event => {
        event.preventDefault()
       setNewRecipe({ ...newRecipe,
            isDraft: true
        })
        handleRecipeSubmit()
    }

    const clearForm = () => {
        setNewRecipe({ ...newRecipe,
            name: '',
            difficulty: list.difficultyList[0].id,
            serve: '',
            cook: '', 
            making: '', 
            category: newRecipe.categoryList[0].id,
            tags: [],
            ingredients: [],
            steps: [],
            picture: null,
            isDraft: false,
            tagList: [...newRecipe.tagList].map( t =>  { return { ...t, selected: false} })
        })
    }

    const { tagList, difficultyList, categoryList } = newRecipe
    const tags = tagList ? 
        tagList.map( (tag, index) => 
            <Tag key={index} name={ tag.name } color={ tag.selected ? "dark" : "light" } onClicked={() => handleTagChange(index)}/>
        ) : ""
    const difficulty = difficultyList ? difficultyList.map( (d, index) => <option key={index} value={d.id}>{ d.name }</option>) : ""
    const category = categoryList ? categoryList.map( (c, index) => <option key={index} value={c.id}>{c.name}</option>) : ""


    return ( 
    <div className="container">
        <Cockpit title="Proposer une recette" />
        <Field
            label="Nom de la recette"
            value={newRecipe.name}
            onChange={handleChange}
            name="name"
        />
        <Field 
            label="Difficulté"
            type="select"
            value={newRecipe.difficulty}
            onChange={handleChange}
            name="difficulty"
        >{ difficulty }</Field>
        <hr></hr>
        <div className="row mb-3">
            <div className="col">
            <Field 
                label="Temps de préparation (en mn)"
                value={newRecipe.making}
                onChange={handleChange}
                name="making"
            />
            </div>
            <div className="col">
            <Field 
                label="Temps de cuisson (en mn)"
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
        <Field label="Catégories">
            <Select name="category" type="select" value={newRecipe.category} onChange={handleChange}>
                { category }
            </Select>
            <p className="card-text">{tags}</p>  
        </Field>
        <hr></hr>
        <Field label="Ingrédients">
            <AddRecipeList
                items={ newRecipe.ingredients }
                aria="ingrédients"
                onChange={ handleIngredientsChange }/>
        </Field> 
        <Field label="Étapes">
            <AddRecipeList
                items={ newRecipe.steps }
                aria="steps"
                type="textarea"
                onChange={ handleStepsChange }/>
        </Field>    
        <Field label="Ajouter une photo">
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
        </Field>       
        <hr></hr>
        <div className="container text-center my-5">
            <button type="submit" className="btn btn-outline-success mx-1" onClick={handleRecipeSubmit}>Ajouter ma recette</button>
            <button className="btn btn-outline-secondary" onClick={handleDraftSubmit}>Enregistrer le brouillon</button>
        </div>

    </div>   );
}
 
export default AddRecipe;