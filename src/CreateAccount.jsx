import { useEffect, useRef, useState } from "react"
import "./index.css"
import { createAccount } from "./Axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState } from "./Store/StateSlicer";

export function CreateAccount(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [mail,setMail] = useState("");
    const [pass,setPass] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const caMessage = useRef(null);
    const load = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createAccountClick = async()=>{
        if(lastName === "" || firstName === "" || mail === "" || pass === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const response = await createAccount(mail,firstName,lastName,pass);
            setIsLoading(false);
            switch(response){
                case 200 : {
                    dispatch(setLoginState("Created"));
                    navigate("/");
                    break;
                }
                case 404 : {
                    caMessage.current.textContent = "User Already Exists"
                    caMessage.current.classList.add("error-message")
                    break;
                }
            }
        }
    }

    const onInputChange = ()=>{
        caMessage.current.textContent = "Enter Credentials to Create Account";
        caMessage.current.classList.remove("error-message")
    }

    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"} ref={load}></div>
        <div className="form container-fluid">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input type="email" placeholder="Enter Your Mail Address" value={mail} 
                onChange={(event)=>{
                    onInputChange();
                    setMail(event.target.value)
                }}/></div>
                <div className="names"><input type="text" placeholder="Enter Your FirstName" value={firstName} 
                onChange={(event)=>{
                    onInputChange();
                    setFirstName(event.target.value)
                }}/>
                <input type="text" placeholder="Enter Your LastName" value={lastName} 
                onChange={(event)=>{
                    onInputChange();
                    setLastName(event.target.value)
                }}/>
                </div>
                <div><input type="password" placeholder="Enter Your Password" value={pass} 
                onChange={(event)=>{
                    onInputChange();
                    setPass(event.target.value)
                }}/></div>
                <div className="mt-3 d-flex justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={createAccountClick}>Sign Up</button></div>
                <p className="d-flex justify-content-center align-items-center"
                ref={caMessage} >Enter Credentials to Create Account</p>
            </div>
        </div>
    
    </>
}