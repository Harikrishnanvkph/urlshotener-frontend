import { useEffect, useRef, useState } from "react"
import "./index.css"
import { checkSecretKeyWeb, shortUrlClick } from "./Axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setLoginState } from "./Store/StateSlicer";
import { useDispatch } from "react-redux";


function useQuery(){
    return new URLSearchParams(useLocation().search)
}

export function Validate(){
    const [secretKey,setSecretKey] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const caMessage = useRef(null);
    const {mail} = useParams();
    const navigate = useNavigate();
    const query = useQuery();
    const webKey = query.get("webKey");
    const dispatch = useDispatch();
    const location = useLocation();

    const shortUrlTrigger = async()=>{
        await shortUrlClick(mail,location.pathname,location.search);
    }

    useEffect(()=>{
        shortUrlTrigger();
    },[])

    const validateKey = async()=>{
        if(secretKey === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            
            setIsLoading(true);
            const key = await checkSecretKeyWeb(mail,webKey,secretKey);
            setIsLoading(false);
            switch(key){
                case 200 : {
                    dispatch(setLoginState("Validated"));
                    navigate("/");
                    return;
                }
                case 404 : {
                    caMessage.current.textContent = "Invalid SecretKey";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                case 412 : {
                    caMessage.current.textContent = "Session Link Expired";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                default : {
                    caMessage.current.textContent = "Something Weird Happened!";
                    return;
                }
            }
        }
    }


    const onInputChange = ()=>{
        caMessage.current.textContent = "Enter Credentials to Create Account";
        caMessage.current.classList.remove("error-message")
    }

    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"}></div>
        <div className="form container-fluid validate">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input type="email" disabled value={mail} placeholder={mail}/></div>
                <div><input type="text" value={secretKey} 
                placeholder="Enter One Time SecretKey"
                onChange={(event)=>{
                    onInputChange();
                    setSecretKey(event.target.value)
                }}/></div>
                <div className="mt-3 d-flex justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={validateKey}>Validate</button></div>
                <p className="d-flex justify-content-center align-items-center"
                ref={caMessage}>Enter Secret Key to Validate!</p>
            </div>
        </div>
    </>
}