// import React from 'react'   --no need to import the react

import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

//define metadata
export const metadata ={
    title:"Promptopia",
    description:"Discover & share AI prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
       <body>
        <Provider>       <div className="main">
            <div className="gradient" />
            
            </div>
            <main className="app">
              <Nav/>
              
              {children}

              </main>
              </Provider>
            </body> 
    </html>
  )
}

export default RootLayout;