import { useEffect, useRef, useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom";
import { login } from "./Axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "./Store/StateSlicer";


export function Login(){
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputColor = useRef(null);
    const buttonName = useRef(null);
    const navigate = useNavigate();
    const caMessage = useRef(null);
    const alterMessage = useRef(null);
    const [state,setState] = useState("");
    const [alert, setAlert] = useState(true);
    const loginState = useSelector((state)=>state.slicer.loginState);
    const dispatch = useDispatch();

    const alertPrompt = async()=>{
        await new Promise((resolve)=>{
            alterMessage.current.style.display = "block";
            setTimeout(()=>{
                alterMessage.current.style.display = "none";
                setAlert(false);
                dispatch(setLoginState("Login"));
                resolve();
            },3000);
        })
    }

    useEffect(()=>{
        setState(loginState);
        switch(state){
            case "Login" : {
                alterMessage.current.innerHTML = `<div className="alert-popUp">
                <p>Welcome</p>
                </div>`;
                break;
            }
            case "Validated" : {
                alterMessage.current.textContent = "Account Successfully Validate";
                break;
            }
            case "Created" : {
                alterMessage.current.innerHTML = `<div>
                <div>
                <p>Created Account Successfully</p>
                <h6>Click on Validation link Sent to Registered Mail Address</h6>
                </div>`;
                break;
            }
            case "PassReset" : {
                alterMessage.current.textContent = "Password Reset Successfully, please login :)";
                break;
            }
            case "KeySent" : {
                alterMessage.current.textContent = "Secret Key Link sent to Registered Mail Address";
                break;
            }
            case "logout" : {
                alterMessage.current.textContent = "Logged Out Successfully";
                break;
            }
        }
        alertPrompt();        
    },[state])


    const onInputChange = ()=>{
        caMessage.current.textContent = "Awesome day to Login In!";
        caMessage.current.classList.remove("error-message")
    }

    const loginClick = async(user,pass)=>{
        if(user === "" || pass === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const log = await login(user,pass);
            setIsLoading(false);
            switch(log){
                case 200 : {
                    navigate("/home", {state : {mail : user}});
                    return;
                }
                case 404 || 418: {
                    caMessage.current.textContent = "Invalid Credentials";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                case 412 : {
                    caMessage.current.innerHTML = `<p>User Not Validated Yet</p>`;
                    caMessage.current.classList.add("error-message")
                    return;
                }
                default : {
                    caMessage.current.textContent = "Something Weird Happened";
                    return;
                }
            }
        }
    }

    const createAccountClick = ()=>{
        navigate("/createUser")
    }

    return<>
        <div className={alert ? 'alert-loader' : "d-none"} >
            <div id='alert' ref={alterMessage}></div>
        </div>
        <div id="loader" className={isLoading ? "loader" : "d-none"}></div>
        <div className="form container-fluid">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input ref={inputColor} type="email" placeholder="Enter Registered Mail Address" value={user} 
                onChange={(event)=>{
                    onInputChange()
                    setUser(event.target.value)}}/></div>
                <div><input type="password" placeholder="Enter Your Password" value={pass} 
                onChange={(event)=>{
                    onInputChange()
                    setPass(event.target.value)}}/></div>
                <p className="d-flex justify-content-end align-items-center forgot"
                onClick={()=>{navigate("/forgot_pass")}}>Forgot Password?</p>
                <div className="d-flex justify-content-center align-items-center"><button className="btn btn-primary" ref={buttonName}
                onClick={()=>{loginClick(user,pass)}}>Login</button></div>
                <div className="d-flex justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={createAccountClick}>Create An Account</button></div>
                <p className="d-flex justify-content-center align-items-center"
                ref={caMessage}>Awesome day to Login In!</p>
            </div>
        </div>
    
    </>
}

