import { useEffect, useState } from 'react';
import '../App.css'

function Editor(props){

    const [codeID, setCodeID] = useState('C++');

function languageHandler(event){
    //console.log(event.target.value)
    let idd = parseInt(event.target.value);
    if(codeID === idd) {
        //do nothing
        return;
    }
    setCodeID(idd)
}

function EditorPage(){
    if(codeID==="C"){
        //C
        return (
            <>
            <iframe title="C compiler" src="https://widgets.judge0.com?widgetId=ygkF&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }
    if(codeID==="JS"){
        //JS
        return (
            <>
            <iframe title="JS compiler" src="https://widgets.judge0.com?widgetId=a8o5&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }
    if(codeID==="python3"){
        //python3
        return (
            <>
            <iframe title="py compiler" src="https://widgets.judge0.com?widgetId=x3jg&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }

    //c++
    return (
        <>
        <iframe title="C++ compiler" src="https://widgets.judge0.com?widgetId=GRkS&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
        </>
    )
}

    return (
        <div style={{marginTop:"5rem"}} className="font-sans">
            <small className="m-2 text-gray-400"> /editor </small>
                <hr/>
            <div className="m-4 p-3 text-center shadow-md">
                <div className="text-2xl text-gray-500">
            Code Editor
                </div>
            </div>

            <section style={{marginTop:"2rem"}} className="pl-7 pr-7">
            <iframe id="sec-widget-1" src="https://compilers.widgets.sphere-engine.com/6d2090af94196903915268188962e183?place_id=sec-widget-1&amp;sdk=1" style={{width: "100%", height: "30em", border: "node"}}></iframe>
                {/* <EditorPage/> */}
            {/* <iframe src="https://widgets.judge0.com?widgetId=ygkF&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            {/* <iframe src="https://widgets.judge0.com?widgetId=McX4&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
             {/* <iframe src="https://widgets.judge0.com?widgetId=a8o5&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            {/* <iframe src="https://widgets.judge0.com?widgetId=x3jg&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            </section>

        </div>
    )
}

export default Editor;