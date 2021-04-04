import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';

const blogsAPIURL = "https://blogapi89.herokuapp.com/api/v1/faqs/";

function Blogs(){

    const [blogsData, setblogsData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            await axios.get(blogsAPIURL)
                    .then((res)=>{
                        //console.log(res.data);
                        setblogsData(res.data);
                    }).catch(err=>console.log(err));
                }
        fetchData();
    },blogsData)

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