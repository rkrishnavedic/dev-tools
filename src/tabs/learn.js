import React from 'react';
import '../App.css'

function Learn(){
    return (
        <div style={{marginTop:"5rem"}} className="font-sans">
            <small className="m-2 text-gray-400"> /learn </small>
            <hr/>
            <div className="m-5 p-5 bg-gray-200 rounded-full text-gray-700">
                Learn and Grow
                <br/>
                <small className="m-5 text-gray-600">
                    Thank you for visiting this page!
                    We are working on this page...
                </small>
            </div>
        </div>
    )
}

export default Learn;