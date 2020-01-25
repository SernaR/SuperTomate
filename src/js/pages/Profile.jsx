import React from 'react';
import Cockpit from '../components/Cockpit';
import Footer from '../components/Footer';

const Profile = () => {
    return ( 
        <main>
            <div className="container">
                <Cockpit title="Profil de l'utilisateur !" />
            </div>
            <Footer/>
        </main>    
    );
}
 
export default Profile;