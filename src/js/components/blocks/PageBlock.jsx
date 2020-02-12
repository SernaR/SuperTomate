import React from 'react';
import ScrollToTopOnMount from '../../services/ScrollToTopOnMount';

const PageBlock = ({ children, commentBlock, back }) => {
    const url = "url('/images/fond-" + back + ".jpg')"
    return ( 
        <main style={{ backgroundImage: url, minHeight:'100vh' }} >
               <ScrollToTopOnMount />
                <div className="container">
                    <div className="card" style={{ marginTop: '60px', marginBottom: '15px'}}></div>
                    <div className="card px-4 mb-3">
                        { children }
                    </div>
                    { commentBlock }
                </div >    
        </main>
    );
}
 
export default PageBlock;