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
    // const [contestDelta, setContestDelta] = useState([])
    const [contestDeltaUser, setContestDeltaUser] = useState([])
    const [laodingStatus, setLoadingStatus] = useState(false);
    const [contestStandingData, setcontestStandingData] = useState([])
    const [contestProblems, setContestProblems] = useState([])
    const [pageContestStanding, setpageContestStanding] = useState(1)

    function Loading(){
        if(laodingStatus){
            return(
            <div id="loading" class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
            )
        }
        return (<div></div>)
    }


    function userNameInputHandler(event){
        setUsrName(event.target.value)
    }

    function contestStandingsHandler(event){

        if(event.target.id === 'pg'){
            if(event.target.value !== ""){
                setpageContestStanding(parseInt(event.target.value));
            }else{
                setpageContestStanding(1)
            }
            return ;
        }

        if(event.target.id === 'c'){
           
                if(event.target.value !== 0){
                setContestID(event.target.value)
                }
            return;
        }

        setLoadingStatus(true)
        axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestID}&from=${1+(pageContestStanding-1)*20}&count=20`)
            .then( (res) =>{
                //console.log(res.data)
                //setContestList(res.data.result.slice(0,10))

                // if(usrName !== ""){
                //     for(let i=0;i<res.data.result.rows.length;i++){
                //         if(usrName.toLowerCase() === res.data.result.rows.party.members[0].toLowerCase())
                //     }
                // }
                setContestProblems(res.data.result.problems)
                setcontestStandingData(res.data.result.rows)

                setLoadingStatus(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoadingStatus(false)
            })
    }

    function contestListHandler(){
        setLoadingStatus(true)
        axios.get(`https://codeforces.com/api/contest.list?`)
            .then( (res) =>{
                //console.log(res.data)
                setContestList(res.data.result.slice(0,10))
                setLoadingStatus(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoadingStatus(false)
            })
    }

    function fetchProfileHandler(){
        if(usrName === '') return;
        // console.log(usrName)
        setLoadingStatus(true)
        axios.get(`https://codeforces.com/api/user.info?handles=${usrName}`)
            .then( (res) =>{
                console.log(res.data)
                setData(res.data.result[0])
                setStatusData(res.data.status)
                setLoadingStatus(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoadingStatus(false)
            })
    }

    function contestInputHandler(event){
        if(event.target.id === 'h') setUsrName(event.target.value)
        else{
            setContestID(parseInt(event.target.value))
        }
    }

    function contestIDClickHandler(){
        if(contestID === 0 ) return;
        setLoadingStatus(true)
        axios.get(`https://codeforces.com/api/contest.status?contestId=${contestID}&handle=${usrName}&from=1&count=10`)
                .then( (res) =>{
                  // console.log(res.data.result.length)
                  setContestData(res.data.result)
                  setStatusContestData(res.data.status)
                  setLoadingStatus(false)
                })
                .catch((err)=>{
                  console.log(err)
                  setLoadingStatus(false)
                })
      }
    function positiveDelta(deltta){
        if(deltta>0) return "+";
        return ""
    }

    function make2(tt){
        if(tt<10) return '0'+tt;
        return tt;
    }
    function toHHMM(t){
        if(t === undefined) return t;
        return make2((t-t%3600)/3600)+':'+make2((t%3600-t%60)/60)
    
    }

    function contestUserDeltaClickHandler(){
        if(contestID === 0) return;
        setLoadingStatus(true)
        axios.get(`https://codeforces.com/api/contest.ratingChanges?contestId=${contestID}`)
                .then( (res) =>{
                //   console.log(res.data)
                //   setContestDelta(res.data.result)
                  for(let i=0;i<res.data.result.length;i++){
            
                    if((res.data.result[i].handle).toLowerCase() === usrName.toLowerCase()){
                        let gh = [
                            {
                                cid: res.data.result[i].contestId,
                                cname: res.data.result[i].contestName,
                                rank: res.data.result[i].rank,
                                handle: res.data.result[i].handle,
                                oldRating: res.data.result[i].oldRating,
                                newRating: res.data.result[i].newRating
                            }
                        ]
                        setContestDeltaUser(gh)
                        // setContestDelta([]);
                        break;
                    }
                }
                setLoadingStatus(false)
                })
                .catch((err)=>{
                  console.log(err)
                  setLoadingStatus(false)
                })
      
    }

    function ContestStandings(){
        if(contestStandingData.length === 0) return (<div></div>)
        return (<div style={{fontSize:"0.7rem"}} className="text-center overflow-scroll border table-auto m-auto">
        <table className="m-auto">
            <thead>
                <tr>
                <td className="border px-2 py-1">Rank</td>
                <td className="border px-2 py-1">handle</td>
                {contestProblems.map((value)=>{
                    return(
                        <td className="border px-2 py-1">{value.index}</td>
                    )
                })}
                <td className="border px-2 py-1">----*----</td>
                <td className="border px-2 py-1">points</td>
                </tr>
            </thead>
            <tbody>
            {contestStandingData.map((value,index)=>{
            return (
                <tr className={(index%2===1? "bg-gray-100":null)}>
                 <td className="border px-2 py-1">{value.rank}</td>
                <td className="border text-gray-700 font-medium px-2 py-1">{value.party.members[0].handle}</td>
                {value.problemResults.map((pr)=>{
                    return(
                        <td className="border font-bold text-green-700 px-2 py-1">{pr.points}
                        <br/>
                        <span className="text-gray-400 font-medium font-xs">
                            {toHHMM(pr.bestSubmissionTimeSeconds)}
                        </span>
                        </td>
                    )
                })}
                <td className="border px-2 py-1"></td>
                <td className="border px-2 font-bold py-1">{value.points}</td>
              </tr>
                        )
            })}

            </tbody>
        
        </table>
        </div>
        )
    }

    function ContestUserDelta(){
        //console.log(contestDelta)
        if(contestDeltaUser.length === 0) return (<div></div>)
        return (<div style={{fontSize:"0.7rem"}} className="text-center overflow-scroll border table-auto m-auto">
        <table className="m-auto">
            <thead>
                <tr>
                <td className="border px-2 py-1">Contest ID</td>
                <td className="border px-2 py-1">ContestName</td>
                <td className="border px-2 py-1">Rank</td>
                <td className="border px-2 py-1">handle</td>
                <td className="border px-2 py-1">oldRating</td>
                <td className="border px-2 py-1">newRating</td>
                <td className="border px-2 py-1 "> &Delta;</td>
                </tr>
            </thead>
            <tbody>
            {contestDeltaUser.map((value,index)=>{
            return (
                <tr className={(index%2===1? "bg-gray-100":null)}>
                 <td className="border px-2 py-1">{value.cid}</td>
                <td className="border px-2 py-1">{value.cname}</td>
                <td className="border px-2 py-1">{value.rank}</td>
                <td className="border px-2 py-1">{value.handle}</td>
                <td className="border px-2 py-1 font-medium">{value.oldRating}</td>
                <td className="border px-2 py-1 font-medium">{value.newRating}</td>
                <td style={{fontSize:"1rem"}} className={(value.newRating-value.oldRating>=0? "border px-2 py-1 text-green-500 font-bold":"border px-4 py-2 text-red-600 font-bold")}>{positiveDelta(value.newRating-value.oldRating)}{(value.newRating-value.oldRating)}</td>
                </tr>
                        )
            })}

            </tbody>
        
        </table>
    </div>)
    }

    function toHH(t){
        return ((t)/3600).toFixed(2) +'hrs'
    }

    function ContestList(){
        //console.log(contestList)
        if(contestList.length === 0) return (<div></div>)
        return (<div style={{fontSize:"0.7rem"}} className="border text-center">
            <table className="m-auto">
                <thead>
                    <tr>
                    <td className="border px-2 py-1">Contest ID</td>
                    <td className="border px-2 py-1">Name</td>
                    <td className="border px-2 py-1">Status</td>
                    <td className="border px-2 py-1">Duration</td>
                    <td className="border px-2 py-1">Type</td>
                    
                    </tr>
                </thead>
                <tbody>
                {contestList.map((value,index)=>{
                return (
                    <tr className={(index%2===1? "bg-gray-100":null)}>
                     <td className="border px-2 py-1">{value.id}</td>
                    <td className="border px-2 py-1">{value.name}</td>
                    <td className="border px-2 py-1">{value.phase}</td>
                    
                    <td className="border px-2 py-1">{toHH(value.durationSeconds)}</td>
                    <td className="border px-2 py-1">{value.type}</td>
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
          <div className="m-5 p-3 bg-indigo-100 border">
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
         <div style={{fontSize:"0.7rem"}} className="border">
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
            <Loading />
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
                <div id="result" className="font-medium text-gray-800 font-sans">
                    <UserData />
                </div>
            </section>


            <hr/><hr/><hr/><hr/><hr/><hr/>
            <br/>
            <hr/><hr/><hr/><hr/><hr/><hr/>

            <section className="m-4" id="profile-sub/rate">
                <h3>CF-Contest Submission/Rating Changes</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Please input handle/username that you have on codeforces</li>
                    <li>2. Then, please enter the contest ID in which you are taking part</li>
                    <li>3. (Optional) click 'fetch submission' button to display your profile info.</li>
                    <li>4. (Optional) click 'rating Change?' button to display your rating change info.</li>
                    <li>5. example: type handle = 'tourist' and contestID = 1500! see the result.</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
                    <input id='h' onChange={contestInputHandler} type="text" placeholder="handle" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    &ensp; 
                    <input id='c' onChange={contestInputHandler} type="decimal" placeholder="contestID" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    &ensp; <button onClick={contestIDClickHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ease-in-out duration-300 focus:outline-none">fetch submissions</button>
                    &ensp; <button onClick={contestUserDeltaClickHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ease-in-out duration-300 focus:outline-none">rating Change?</button>
                </div>
                <div id="result">
                    <ContestDataDisplay />
                </div>
                <div id="result" className="mt-3">
                        
                    <ContestUserDelta />
                </div>
            </section>
            
            <hr/><hr/><hr/><hr/><hr/>

            <br/>

            <hr/><hr/><hr/><hr/><hr/>

            <section className="m-4" id="contest-list">
                <h3>CF-Contest List</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Just Click "list Contest" to fetch the list of contests.</li>
                    <li>2. You can scroll throught the list.</li>
                    <li>2. Latest 10 Contest Listed.</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
        
                    <button onClick={contestListHandler} className="ease-in-out duration-300 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">list contest</button>
                </div>
                <div id="result">
                    <ContestList />
                </div>
            </section>

            <hr/><hr/><hr/><hr/><hr/>

            <br/>

            <hr/><hr/><hr/><hr/><hr/>

            <section className="m-4" id="contest-standings">
                <h3>CF-Contest Standings</h3>
                <small className="m-2 text-gray-600"> Instructions:
                <br/>
                <ol className="ml-4">
                    <li>1. Just Click "contest Standings" to fetch the list of contests.</li>
                    <li>2. You can go to next page.</li>
                    <li>3. 20 entries Listed per page.</li>
                    <li>4. By default page number = 1</li>
                </ol>
                 </small>
                <div className="mb-3 pt-0">
                <input id='c' onChange={contestStandingsHandler} type="decimal" placeholder="contestID" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    &ensp; 
                    <button id='btn' onClick={contestStandingsHandler} className="ease-in-out duration-300 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">contest Standings</button>
                </div>
                <div id="result center">
                <input id='pg' onChange={contestStandingsHandler} type="decimal" placeholder="#page" className="text-center rounded-full m-auto px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border shadow-md outline-none focus:outline-none"/>
                    <ContestStandings />
                </div>
            </section>

        </div>
    )
}

export default FunTools;