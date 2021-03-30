import React, { useState } from 'react';
import './App.css';
import FunTools from './tabs/funtools';
import Home from './tabs/home';

function Page(props){
  console.log(props)
  if(parseInt(props.id) === 0) {
    return (
      <Home />
    )
  }
  return(
    <div>
      <FunTools />
    </div>
  )
}

function App() {

  const [pageID, setPageID] = useState(0)

 function onTabClickHandler(event){
    //console.log(event.target.id)
    setPageID(event.target.id)
    //console.log(pageID)
  }

  return (
    <div>
      <header>
        <nav>
          <div className="tabs">
            <div id={0} onClick={onTabClickHandler} className="tab">home</div>
            <div id={1} onClick={onTabClickHandler} className="tab">fun tools</div>
          </div>
        </nav>
      </header>
      <section style={{margin:"3%"}}>
        Page displayed here
      <Page id={pageID} />
      </section>
    </div>
  );
}

export default App;
