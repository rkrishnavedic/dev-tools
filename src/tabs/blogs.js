import axios from 'axios';
import React, {useState } from 'react';
import '../App.css';

const blogsAPIURL = "https://blogapi89.herokuapp.com/api/v1/faqs/";

function Blogs(){

    const [blogsData, setblogsData] = useState([]);
    // const [laodingStatus, setLoadingStatus] = useState(false);

    // function Loading(){
    //     if(laodingStatus){
    //         return(
    //         <div id="loading" class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
    //         <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    //         </div>
    //         )
    //     }
    //     return (<div></div>)
    // }
    
    const fetchData = async ()=>{
            
            await axios.get(blogsAPIURL)
                    .then((res)=>{
                        //console.log(res.data);
                        setblogsData(res.data);
                        
                    }).catch((err)=>{
                        
                        console.log(err);
                    });
            
                }
    fetchData();
    

    return (
        <div className="w-2 m-2 font-sans">
            
            <div className="grid">
                {blogsData.map((value,index)=>{
                    return (
                        <div>
                            <h2 className='font-bold text-xl'>{value.title}</h2>
                            <p>@author: {value.author}</p>
                            <p>{value.body}</p>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </div>
    )


}

export default Blogs;