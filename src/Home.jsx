import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { getUrls } from "./Axios";
import "./index.css";
import { useDispatch } from "react-redux";
import { setLoginState } from "./Store/StateSlicer";

export function Home(){
    const [urlArray, setUrlArray] = useState([]);
    const [urlToday, setURLToday] = useState(0);
    const [urlMonth, setURLMonth] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {mail} = location.state || {};

    const getUrl = async()=>{
        const urls = await getUrls(mail);
        setUrlArray(urls ? urls : []);
    }
    const setURLCounts = ()=>{
        let today = 0;
        let month = 0;
        urlArray[0]?.shortUrls?.map((it)=>{
            const stamp = Math.floor((new Date().getTime() - it.dateCreated)/(24*60*60*1000));
            if(stamp == 0){
                ++today;
                ++month;
            }else{
                ++month;
            }
        })
        setURLToday(today);
        setURLMonth(month);
    }

    useEffect(()=>{
        getUrl();
    },[mail])

    useEffect(()=>{
        setURLCounts();
    },[urlArray])


    return<>
        <div className="Full-Moon">
            <div className="d-flex justify-content-end mx-3 py-2">
                <button className="btn btn-primary" onClick={()=>{
                    dispatch(setLoginState("logout"));
                    navigate("/");
                }}>Log Out</button>
            </div>
            <p className="url-show"><b>URL Creation DATA</b></p>
            <div className="url-Cards">
                <div className="card">
                    <p className="url-title">Today URL</p>
                    <p className="url-count">{urlArray[0]?.shortUrlCount}</p>
                </div>
                <div className="card">
                    <p className="url-title">Created Today</p>
                    <p className="url-count">{urlToday}</p>
                </div>
                <div className="card">
                    <p className="url-title">Created This Month</p>
                    <p className="url-count">{urlMonth}</p>
                </div>
            </div>
            <p className="table-show"><b>URL TABLE</b></p>
            <div className="div-table">
                <table className="table table-striped table-bordered table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>URL Path</th>
                            <th>Click Count</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      urlArray[0]?.shortUrls?.map((it,index)=>(
                        <tr key={index}>
                            <th>{it.url}</th>
                            <th>{it.click}</th>
                            <th>{
                            Math.floor((new Date().getTime() - it.dateCreated)/(24*60*60*1000)) === 0 ?
                        "Today" : Math.floor((new Date().getTime() - it.dateCreated)/(24*60*60*1000)) === 1 ? 
                        "Yesterday" : `${Math.floor((new Date().getTime() - it.dateCreated)/(24*60*60*1000))} days ago`}</th>
                        </tr>
                      ))  
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}