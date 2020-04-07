import React, { useState, useEffect } from 'react';
import Cockpit from '../components/Cockpit';
import Footer from '../components/Footer';
import PageBlock from '../components/blocks/pageBlock';
import CommentBlock from '../components/blocks/CommentBlock';
import recipesAPI from '../services/recipesAPI';
import commentsAPI from '../services/commentsAPI';
import ProfileComments from '../components/comments/ProfileComments';
import NavItems from '../components/NavItems';
import userAPI from '../services/userAPI';
import MyData from '../components/MyData';

import toast from '../services/toaster' 
import MyRecipes from '../components/MyRecipes';

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
            const user = await userAPI.findProfile()
            
            setUser(user)
            setRecipes(recipes)
            setComments(comments)

        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }
    
    const [user, setUser] = useState('')
    const [recipes, setRecipes] = useState([])
    const [comments, setComments] = useState([])
    const [item, setItem] = useState(0)

    const handleRead = async id => {
        try {
            await commentsAPI.readed(id)
            toast.success("message lu")
            setComments( comments.filter( comment => comment.id !== id))
        }catch(err) {
            toast.error("Oups, un problème est survenue")
        }
    }

    return ( 
        <>
            <PageBlock >
                <Cockpit title={"Bienvenue " + user.name} />

                <NavItems 
                    items={ items }
                    item={ item }
                    setItem={ setItem }
                />

                { item === RECIPES && <CommentBlock title="Mes recettes">
                    <MyRecipes recipes={ recipes } />
                </CommentBlock>}
                { item === COMMENTS && <ProfileComments comments={comments} onRead={handleRead}/>}
                { item === USER_DATA && <CommentBlock title="Mes infos">
                    <MyData user={ user }/>
                </CommentBlock>}
            </PageBlock>
            <Footer/>
        </>  
    );
}
 
export default ProfilePage;
