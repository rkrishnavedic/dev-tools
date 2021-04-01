import axios from 'axios';
import React, { useState } from 'react';
import '../App.css'

function FunTools(){

    const [usrName, setUsrName] = useState('');
    const [data, setData] = useState({})
    const [statusData, setStatusData] = useState('nan')
    const [contestID, setContestID] = useState(0);
    const [contestData, setContestData] = useState([])
    const [statusContestData, setStatusContestData] = useState("N");
    const [contestList, setContestList] = useState([])

    function userNameInputHandler(event){
        setUsrName(event.target.value)
    }

    function contestListHandler(){
        axios.get(`https://codeforces.com/api/contest.list`)
            .then( (res) =>{
                //console.log(res.data)
                setContestList(res.data.result)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    function fetchProfileHandler(){
        if(usrName === '') return;
        console.log(usrName)
        axios.get(`https://codeforces.com/api/user.info?handles=${usrName}`)
            .then( (res) =>{
                console.log(res.data)
                setData(res.data.result[0])
                setStatusData(res.data.status)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    function contestInputHandler(event){
        if(event.target.id === 'h') setUsrName(event.target.value)
        else{
            setContestID(parseInt(event.target.value))
        }
    }

    function contestIDClickHandler(){
        if(contestID === 0 ) return
        axios.get(`https://codeforces.com/api/contest.status?contestId=${contestID}&handle=${usrName}&from=1&count=10`)
                .then( (res) =>{
                  // console.log(res.data.result.length)
                  setContestData(res.data.result)
                  setStatusContestData(res.data.status)
                })
                .catch((err)=>{
                  console.log(err)
                })
      }

    function toHH(t){
        return ((t)/3600).toFixed(2) +'hrs'
    }

    function ContestList(){
        //console.log(contestList)
        if(contestList.length === 0) return (<div></div>)
        return (<div style={{fontSize:"0.7rem"}} className="m-auto border overflow-scroll h-64">
            <table>
                <thead>
                    <tr>
                    <td className="border px-4 py-2">Contest ID</td>
                    <td className="border px-4 py-2">Name</td>
                    <td className="border px-4 py-2">Status</td>
                    <td className="border px-4 py-2">Duration</td>
                    <td className="border px-4 py-2">Type</td>
                    
                    </tr>
                </thead>
                <tbody>
                {contestList.map((value,index)=>{
                return (
                    <tr className={(index%2==1? "bg-gray-100":null)}>
                     <td className="border px-4 py-2">{value.id}</td>
                    <td className="border px-4 py-2">{value.name}</td>
                    <td className="border px-4 py-2">{value.phase}</td>
                    
                    <td className="border px-4 py-2">{toHH(value.durationSeconds)}</td>
                    <td className="border px-4 py-2">{value.type}</td>
                    </tr>
                            )
                })}

                </tbody>
            
            </table>
        </div>)
    }

    function UserData(){
        if( statusData !== "OK" ) return (<div></div>)
        
        return (
          <div style={{paddingTop:"10px",paddingLeft:"10px"}}>
            Name: {data.firstName} {data.lastName} 
            <br/>
            Rating: {data.rating} (maxRating : {data.maxRating})
            <br/>
            Rank: {data.rank} (maxRank : {data.maxRank})
            <br/>
            Country: {data.country},  Contribution : {data.contribution}
            <br/>
            Avatar: <img alt="avatarImage" src={data.avatar}></img>
            <br/>
            Organisation: {data.organization}
          </div>
        )
      }

      function ContestDataDisplay(){
        // console.log(contestData[0])
        if( statusContestData !== "OK" ) return (<div></div> )
        
        return (
         <div style={{fontSize:"0.7rem"}}>
           <table className="m-auto text-center table-auto">
           <thead className="border px-4 py-2">
                <tr>
               <td className="border px-4 py-2">Submission ID</td>
               <td className="border px-4 py-2">Verdict</td>
               <td className="border px-4 py-2">Problem</td>
               <td className="border px-4 py-2">Time (ms)</td>
               <td className="border px-4 py-2">testSet</td>
               <td className="border px-4 py-2">passedTestCount</td>
               <td className="border px-4 py-2">Language</td>
               <td className="border px-4 py-2">Contest</td>
               <td className="border px-4 py-2">author</td>
               </tr>
                </thead>
                <tbody>
           {contestData.map((value, index) => {
            //  console.log(value.author.members[0].handle)
            //  console.log(index)
             return(
                <tr className={index%2===1? "bg-gray-100":null}>
                 
                 <td className="border px-4 py-2">{value.id}</td>
                 <td className="border px-4 py-2">{value.verdict}</td>
                 <td className="border px-4 py-2">{value.problem.index}. {value.problem.name}</td>
                 <td className="border px-4 py-2">{value.timeConsumedMillis}</td>
                 <td className="border px-4 py-2">{value.testset}</td>
                 <td className="border px-4 py-2">{value.passedTestCount}</td>
                 <td className="border px-4 py-2">{value.programmingLanguage}</td>
                 <td className="border px-4 py-2">{value.contestId}</td>
                 <td className="border px-4 py-2">{value.author.members[0].handle}</td>
              </tr>
             )
           })}
           </tbody>
            </table>
            


         </div>
        )
      }

    return (
        <div style={{marginTop:"5rem"}} className="font-sans">
            <small className="m-2 text-gray-400"> /fun-tools </small>
                <hr/>
            <br/>
            <hr/><hr/><hr/><hr/><hr/><hr/>
            <section className="m-4" id="profile-check">
                <h3>CF-Profile Check</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Please input handle/username that you have on codeforces</li>
                    <li>2. Then click 'fetch profile' button to display your profile info.</li>
                    <li>3. example: type 'benq' and see the result.</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
                    <input onChange={userNameInputHandler} type="text" placeholder="handle" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none"/>
                    &ensp; <button onClick={fetchProfileHandler} className="ease-in-out duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">fetch profile</button>
                </div>
                <div id="result">
                    <UserData />
                </div>
            </section>


            <hr/><hr/><hr/><hr/><hr/><hr/>
            <br/>
            <hr/><hr/><hr/><hr/><hr/><hr/>

            <section className="m-4" id="profile-check">
                <h3>CF-Contest Submission Check</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Please input handle/username that you have on codeforces</li>
                    <li>2. Then, please enter the contest ID in which you are taking part</li>
                    <li>3. Then click 'fetch submission' button to display your profile info.</li>
                    <li>4. example: type handle = 'tourist' and contestID = 1500! see the result.</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
                    <input id='h' onChange={contestInputHandler} type="text" placeholder="handle" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    &ensp; 
                    <input id='c' onChange={contestInputHandler} type="decimal" placeholder="contestID" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    &ensp; <button onClick={contestIDClickHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ease-in-out duration-300 focus:outline-none">fetch submissions</button>
                </div>
                <div id="result">
                    <ContestDataDisplay />
                </div>
            </section>
            
            <hr/><hr/><hr/><hr/><hr/>

            <section className="m-4" id="profile-check">
                <h3>CF-Contest List</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Just Click "list Contest" to fetch the list of contests.</li>
                    <li>2. You can scroll throught the list.</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
                    <button onClick={contestListHandler} className="ease-in-out duration-300 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">list contest</button>
                </div>
                <div id="result">
                    <ContestList />
                </div>
            </section>

        </div>
    )
}

export default FunTools;