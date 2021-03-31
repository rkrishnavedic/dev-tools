import React, { useState } from 'react';
import './App.css'
import Editor from './tabs/editor';
import FunTools from './tabs/funtools';
import Home from './tabs/home';

const iconURL = "https://cdn.worldvectorlogo.com/logos/google-webdev-logo.svg";
const linkediconURL = "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg";
const githubURL = "https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg"

function Page(props){
  //console.log(props)
  if(parseInt(props.id) === 0) {
    return (
      <Home />
    )
  }
  if(parseInt(props.id)===1){
  return(
      <FunTools />
  )
  }
  return (
    <Editor />
  )
}

function App() {

  const [pageID, setPageID] = useState(0)

 function onTabClickHandler(event){
    //console.log(event.target.id)
    setPageID(parseInt(event.target.id))
    //console.log(pageID)
  }

  const activeTab = "bg-gray-900 cursor-default text-white font-bold py-2 px-4 rounded";
  const inactiveTab = "cursor-default hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  return (
    <div>
      <header className="z-10">
        <nav className="fixed w-screen flex flex-wrap items-center justify-between p-5 bg-gray-700 text-gray-300">
          <img className="rotate-90" src={iconURL} alt="icon" width="50px"/>

          <div className="flex flex-row gap-3">
            <div id={0} onClick={onTabClickHandler} className={( pageID === 0? activeTab:inactiveTab)}>home</div>
            <div id={1} onClick={onTabClickHandler} className={( pageID === 1? activeTab:inactiveTab)}>fun tools</div>
            <div id={2} onClick={onTabClickHandler} className={( pageID === 2? activeTab:inactiveTab)}>editor</div>
          </div>
        </nav>
      </header>
      <section>
       <small className="text-gray-600"> /... </small>
       <hr/>
      <Page id={pageID} />
      </section>
      <footer className="text-center ustify-between p-5 bg-gray-700 text-gray-300" style={{marginTop:"5rem"}}>
        <div>
          social media
        <br/>
        <nav className="flex gap-5 items-center" style={{justifyContent:'center', alignItems:"center"}}>
          <div>
          <a href="https://github.com/rkrishnavedic/"><img src={githubURL} className="customIMG" alt="github"/></a>
          </div>
          <div>
          <a href="https://www.linkedin.com/in/rahulkrishna23/"> <img src={linkediconURL} className="customIMG" alt="linkedin"/></a>
          </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
