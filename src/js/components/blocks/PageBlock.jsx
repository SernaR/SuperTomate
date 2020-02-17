import React from 'react';
import ScrollToTopOnMount from '../../services/ScrollToTopOnMount';

const PageBlock = ({ children, commentBlock, breadcrumds, back }) => {
    //const url = "url('/images/fond-" + back + ".jpg')"
    const url = "url('/images/fond-visiteur.jpg')"
    return ( 
        <main style={{ backgroundImage: url, minHeight:'100vh', paddingBottom: '1em'}} >
                <ScrollToTopOnMount />
                    <div className="container">
                        <div className="card" style={{ marginTop: '3.75em', marginBottom: '1em'}}></div>
                        {breadcrumds}
                        <div className="card px-4 mb-3">
                            { children }
                        </div>
                        { commentBlock }
                    </div >    
        </main>
    );
}
 
export default PageBlock;