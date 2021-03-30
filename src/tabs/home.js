import React from 'react';
import '../App.css'

const tableData = [
    {
        name:"CF Profile Check",
        status:1,
        completiontime:"March 21"
    },
    {
        name:"CF Contest Submission Check",
        status:1,
        completiontime:"March 21"
    },
    {
        name:"CF Contest Standings Check",
        status:0,
        completiontime:"---"
    }
]

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
            <small className="m-2 text-gray-600"> /home </small>
                <hr/>
            <div className="m-4 p-3 text-center outline-black shadow-md">
                <div className="text-2xl">
            Welcome to my new learning project!
                </div>
                <div className="text-left">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
            <table className="m-auto text-center table-auto">
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
        </div>
    )
}

export default Home;