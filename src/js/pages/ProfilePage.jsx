import React, { useState, useEffect } from 'react';
import Cockpit from '../components/Cockpit';
import Footer from '../components/Footer';
import PageBlock from '../components/blocks/pageBlock';
import CommentBlock from '../components/blocks/CommentBlock';
import recipesAPI from '../services/recipesAPI';
import { Link } from 'react-router-dom';
import commentsAPI from '../services/commentsAPI';
import ProfileComments from '../components/comments/ProfileComments';
import { recipeUrl } from '../services/utils'
import NavItems from '../components/NavItems';

const items = ['Recettes', 'Commentaires', 'Infos']
const RECIPES = 0
const COMMENTS = 1
const USER_DATA =  2 

const ProfilePage = () => {

    useEffect( () => {
        fetchLists()
    }, [])

    const fetchLists = async () => {
        try {
            
            const { recipes } = await recipesAPI.findByUser()
            const { comments } = await commentsAPI.findByUser()

            setRecipes(recipes)
            setComments(comments)

        } catch(err) {
            console.log(err.response)
        }
    }
    

    const [recipes, setRecipes] = useState([])
    const [comments, setComments] = useState([])
    const [item, setItem] = useState(0)

    const myRecipes = recipes.map( (recipe, index) => 

        <Link 
            to={recipeUrl(recipe.category, recipe.slug) + recipe.id }  
            style={{textDecoration: 'none'}} 
            key={index} 
        >
            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span >{ recipe.name }</span>
                { recipe.isDraft && <span className="badge badge-secondary mx-1" >Brouillon</span>}
            </li>
        </Link>
    )

    const handleRead = async id => {
        try {
            await commentsAPI.readed(id)
            setComments( comments.filter( comment => comment.id !== id))
        }catch(err) {
            console.log(err.response)
        }
    }

    return ( 
        <>
            <PageBlock >
                <Cockpit title="Profil de l'utilisateur !" />

                <NavItems 
                    items={ items }
                    item={ item }
                    setItem={ setItem }
                />

                { item === RECIPES && <CommentBlock title="Mes recettes">
                    <ul className="list-group">
                        { myRecipes}
                    </ul>
                </CommentBlock>}
                { item === COMMENTS && <ProfileComments comments={comments} onRead={handleRead}/>}
                { item === USER_DATA && <CommentBlock title="Mes infos">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Mon pseudo:</th>
                                <td>user pseudo</td>
                            </tr>
                            <tr>
                                <th scope="row">Mon email:</th>
                                <td>user email</td>
                            </tr>
                            <tr>
                                <th scope="row">Mon mot de passe:</th>
                                <td>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#Modalmdp">Modifier</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CommentBlock>}
            </PageBlock>
            <Footer/>
        </>  
    );
}
 
export default ProfilePage;
