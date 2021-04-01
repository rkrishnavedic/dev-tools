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

            <nav id="appreciations" style={{justifyContent:'center', alignItems:"center"}} className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 items-center mt-8 m-auto" >

                {appreciationsData.map( (value, index)=>{
                    return(
                    <div className="flex-1 items-center justify-center px-5 py-5">
                        <div className="rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{maxWidth: "20rem"}}>
                            <div className="pt-1 pb-5">
                                <div className="overflow-x-scroll rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
                                    <img src={value.avatarURL} alt="avatar"/>
                                </div>
                            </div>
                            <div className="mb-10">
                                <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
                                <p className="text-sm text-gray-600 text-center px-5">{value.quote}</p>
                                <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
                            </div>
                            <div className="bg-white rounded-full hover:bg-indigo-100">
                                <p className="text-md text-indigo-500 font-bold text-center">{value.name}</p>
                                <p className="text-xs text-gray-500 text-center">{value.handle}</p>
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
            <div className="text-center justify-center grid text-gray-500">
                <span>
                Learning something new always make you feel better. Do you remember how you started to walk and talk as you grown up? In the same strategy let us learn and grow together.
                </span>
            </div>

            <section id='comments' className="mt-4 bg-indigo-200 p-4 shadow-lg rounded-full">

                    <div className="mx-auto sm:px-3 lg:px-5">
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-4 mr-2 text-white-100 bg-gray-700 dark:bg-gray-800 sm:rounded-l-full">
                                    <h1 className="sm:px-5 text-4xl sm:text-5xl text-gray-100 dark:text-white font-extrabold tracking-tight">
                                        Get in touch
                                    </h1>
                                    <p className="text-normal text-lg sm:text-2xl font-medium text-gray-300 dark:text-gray-400 mt-2">
                                        Fill this form and we will contact you!
                                    </p>

                                    <div className="flex items-center mt-8 text-gray-300 dark:text-gray-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                            abc-street, PingMe
                                            Postal Code
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-4 text-gray-400 dark:text-gray-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                            +610 1234567890
                                        </div>
                                    </div>

                                    <div className="sm:px-6 flex items-center mt-2 text-gray-400 dark:text-gray-400">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                            info@learn4fun.org
                                        </div>
                                    </div>
                                </div>

                                <form className="p-6 flex flex-col justify-center">
                                    <div className="flex flex-col">
                                        <label for="name" className="hidden">Full Name</label>
                                        <input type="name" name="name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                                    </div>

                                    <div className="flex flex-col mt-2">
                                        <label for="email" className="hidden">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                                    </div>

                                    <div className="flex flex-col mt-2">
                                        <label for="message" className="hidden">Message</label>
                                        <input type="message" name="message" id="message" placeholder="Say something!" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"/>
                                    </div>

                                    <button type="submit" className="md:w-32 bg-blue-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-full mt-3 hover:bg-blue-800 active:outline-none transition ease-in-out duration-300">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                
            </section>
           
        </div>
    )
}

export default Home;