import React from 'react';
import '../App.css'
import {appreciationsData, tableData } from './data.js';

function Home(){

    function statusDisplay(yes){


        if(yes===1){
            return (
                <div className="text-green-600">
                    Published
                </div>
            )
        }
        else{
            return(
                <div className="text-red-600">
                    In Progress
                </div>
            )
        }
    }

    return (
        <div style={{marginTop:"5rem"}} className="font-sans">
            <small className="m-2 text-gray-400"> /home </small>
                <hr/>
            <div className="m-4 p-3 text-center shadow-md">
                <div className="text-2xl">
            Welcome to my new learning series!
                </div>
            </div>

            <nav id="appreciations" style={{justifyContent:'center', alignItems:"center"}} className=" flex gap-5 items-center m-auto" >

                {appreciationsData.map( (value, index)=>{
                    return(
                    <div class="flex-1 items-center justify-center px-5 py-5">
                        <div class="rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{maxWidth: "20rem"}}>
                            <div class="pt-1 pb-5">
                                <div class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
                                    <img src={value.avatarURL} alt="avatar"/>
                                </div>
                            </div>
                            <div class="mb-10">
                                <div class="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
                                <p class="text-sm text-gray-600 text-center px-5">{value.quote}</p>
                                <div class="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
                            </div>
                            <div >
                                <p class="text-md text-indigo-500 font-bold text-center">{value.name}</p>
                                <p class="text-xs text-gray-500 text-center">{value.handle}</p>
                            </div>
                        </div>
                    </div>
                    )
                }
                )}
            </nav>


            <table className="m-auto text-center table-auto shadow-md">
                <thead className="border px-4 py-2">
                    <tr>
                    <th>Properties</th>
                    <th>Status</th>
                    <th>Completed On</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((value, index)=>{
                        return(
                            <tr className={index%2===1? "bg-gray-100":null}>
                                <td className="border px-4 py-2">{value.name}</td>
                                <td className="border px-4 py-2">{statusDisplay(value.status)}</td>
                                <td className="border px-4 py-2">{value.completiontime}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="text-center float-right text-gray-500">
                <span>
                Learning something new always make you feel better. Do you remember how you started to walk and talk as you grown up? In the same strategy let us learn and grow together.
                </span>
            </div>
           
        </div>
    )
}

export default Home;