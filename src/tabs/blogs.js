import axios from 'axios';
import React, {useState } from 'react';
import '../App.css';

const blogsAPIURL = "https://blogapi89.herokuapp.com/api/v1/faqs/";
const validToken = "987";
const validTokenD ="0987"

function BlogsT(){

    const [blogsData, setblogsData] = useState([]);

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


    return(
        <div className="grid">
            <ol>
                {blogsData.slice(0).reverse().map((value,index)=>{
                    return (
                        <li>
                        <div style={{outline:"0.1rem dotted blue"}} className="m-4 border-md">
                            <div>ID:{value.id}</div>
                            <h2 className='font-bold text-xl'>{value.title}</h2>
                            <p>@author: {value.author}</p>
                            <p>{value.body}</p>
                            <hr/>
                        </div>
                        </li>
                    )
                })}

            </ol>
            </div>
    )
}

function Blogs(){

    
    const [token, setToken] = useState('');
    const [id1, setId1] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    
    const [exist, setExist] = useState(false);

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

    function createBlog() {
        if(!exist){
            axios.post(blogsAPIURL, {
                id:id1,
                title:title,
                author:author,
                body:body,
                tags:tags,
            })
            .then(res=>{
                if(res.id!=='nan'){
                    //console.log('blog creation success!');
                   
                }
                
            }).catch(err=>console.log(err));
        }
        setExist(false);
    }

    function deleteBlog() {
        if(!exist){
            axios.delete(blogsAPIURL+id1)
            .then(res=>{
                if(res.id!=='nan'){
                    //console.log('blog creation success!');
                   
                }
                
            }).catch(err=>console.log(err));
        }
        setExist(false);
    }
    
    function  iddHandler(event) {
        setId1(event.target.value);
    }

    function tokenHandler(event) {
        setToken(event.target.value);
    }
    function titleNameHandler(event) {
        setTitle(event.target.value);
    }
    function authorNameHandler(event) {
        setAuthor(event.target.value);
    }
    function bodyHandler(event) {
        setBody(event.target.value);
    }
    function tagsHandler(event) {
        setTags(event.target.value);
    }

    function createButtonHandler(){
        if(token === validToken){
            axios.get(blogsAPIURL+id1)
                .then(res=>{
                    if(res.id!=='nan'){
                        setExist(true);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }else{
            //console.log('not valid token')
        }

        createBlog();
    }

    function deleteButtonHandler(){
        if(token === validTokenD){
            axios.get(blogsAPIURL+id1)
                .then(res=>{
                    if(res.id!=='nan'){
                        setExist(true);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }else{
            //console.log('not valid token')
        }

        deleteBlog();
    }

    return (
        <div className="m-2 font-sans">



           <div style={{padding:"1rem"}}>
            ValidToken to create:<input style={{outline:"0.1rem solid black",margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="token" placeholder="token" onChange={tokenHandler}></input>
            ID:<input style={{outline:"0.1rem solid black", margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="idd" onChange={iddHandler} placeholder="ID Unique"></input>
            Title:<input style={{outline:"0.1rem solid black", margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="title" onChange={titleNameHandler} placeholder="title"></input>
            Author:<input style={{outline:"0.1rem solid black",margin:"0.3rem",  padding:"0.3rem",width:"5rem"}} id="author" onChange={authorNameHandler} placeholder="author"></input>
            <br/>Body:<textarea style={{outline:"0.1rem solid black", margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="body" onChange={bodyHandler} placeholder="body"></textarea>
           
            <br/>tags:<input style={{outline:"0.1rem solid black", margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="tags" onChange={tagsHandler} placeholder="tags"></input>
            </div>
            <button className="rounded-full p-2 bg-indigo-300 hover:bg-indigo-600" onClick={createButtonHandler} id="create" >create-blog</button>
            <hr/><hr/><hr/><hr/><hr/>
            <div style={{padding:"1rem"}}>
            ValidToken to Delete<input style={{outline:"0.1rem solid black",margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="token" placeholder="token" onChange={tokenHandler}></input>
            <br/>
            ID:<input style={{outline:"0.1rem solid black", margin:"0.3rem", padding:"0.3rem",width:"5rem"}} id="idd" onChange={iddHandler} placeholder="ID Unique"></input>
            <button className="rounded-full p-2 bg-red-300 hover:bg-red-600" onClick={deleteButtonHandler} id="delete" >delete-blog</button>
          
           </div>
            <hr/><hr/><hr/><hr/><hr/>
            Now Blogs
            <BlogsT/>

            

        </div>
    )


}

export default Blogs;