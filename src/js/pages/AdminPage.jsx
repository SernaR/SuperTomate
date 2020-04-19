import React, { useState, useEffect } from 'react';
import Cockpit from '../components/Cockpit';
import adminAPI from '../services/adminAPI';
import Comments from '../components/comments/RecipeComments';
import CommentBlock from '../components/blocks/CommentBlock';
import PageBlock from '../components/blocks/pageBlock';
import recipesAPI from '../services/recipesAPI';
import Slugs from '../components/Slugs';
import NavItems from '../components/NavItems';
import Params from '../components/Params';
import Register from '../components/Register';

import toast from '../services/toaster' 
import Highlights from '../components/Highlights';
import Headlines from '../components/Headlines';

const items = ['Recettes', 'Commentaires', 'Paramètres', 'Actu', 'Inscription']
const RECIPES = 0
const COMMENTS = 1
const PARAMS =  2 
const HIGHLIGHT = 3
const REGISTER = 4

const AdminPage = ({ history }) => {

    useEffect( () => {
        fetchList()
    }, [])


    const [params, setParams] = useState({
        tags: [],
        difficulties: [],
        categories: [],
    })

    const [comments, setComments] = useState([])
    const [slugs, setSlugs] = useState([])
    const [item, setItem] = useState(0)

    const [errors, setErrors] = useState({
        tags: '',
        difficulties: '',
        categories: '',
    });

    const fetchList = async () => {
        try {
            const params = await adminAPI.getParams()
            const { comments } = await adminAPI.getComments()
            const { slugs } = await recipesAPI.getSlugs()

            setSlugs(slugs)
            setParams(params)
            setComments(comments)

        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    const handleChangeComments = (comments) => {
        setComments(comments)
    }

    const handleParamSubmit = async (value, param) => {
            try {
                const newParam = await adminAPI.addParam(value, param)

                const newParamTab = [...params[param], newParam]
                setParams({...params, [param]: newParamTab})
                setErrors({
                    tags: '',
                    difficulties: '',
                    categories: '',
                })
    
            } catch({ response }) {
                const message = response.data;
                if(message) {
                    setErrors({...errors, [param]: message});
                    toast.error("Il y a des erreurs dans votre formulaire")
                } else {
                    toast.error("Oups, un problème est survenue")
                }
            }    
    }

    const handleSlugChange = (id, slug, category) => {
        setSlugs(slugs.filter( slug => slug.id !== id ))
        history.push('/recette/'+ category + '/'+ slug + '/' + id,)
    }

    return ( 
        <PageBlock>
            <Cockpit title="Admin Page" />

            <NavItems
                items={ items }
                item={ item }
                setItem={ setItem }
            />

            { item === RECIPES && <Slugs slugs={slugs} onSlugChange={handleSlugChange}/>} 

            { item === COMMENTS && 
                <Comments
                    onModerated={ handleChangeComments }
                    comments={ comments } 
                    isAdmin={ true } 
                 />}

            { item === PARAMS && <CommentBlock title="Paramètres">
                <Params
                    params={ params.categories }
                    name ="categories"
                    error={ errors.categories }
                    title="Ajouter une catégorie"
                    onSubmit={ handleParamSubmit }
                />
                <Params
                    params={ params.tags }
                    name ="tags"
                    title="Ajouter un Tag"
                    error={ errors.tags }
                    onSubmit={handleParamSubmit}
                />
                <Params
                    params={ params.difficulties }
                    name ="difficulties"
                    title="Ajouter une difficulté"
                    error={ errors.difficulties }
                    onSubmit={handleParamSubmit}
                />
            </CommentBlock>}
            { item === HIGHLIGHT && 
                <CommentBlock title="Mise en avant">
                   <Headlines />
                </CommentBlock>
            }    
            { item === REGISTER && 
                <CommentBlock title="Inscription">
                    <Register />
                </CommentBlock>
            }
            
        </PageBlock>
     );
}
 
export default AdminPage
