import { useRef, useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom";
import { forgotPass } from "./Axios";
import { useDispatch } from "react-redux";
import { setLoginState } from "./Store/StateSlicer";


export function ForgotPassword(){
    const [mail,setMail] = useState("");
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const caMessage = useRef(null);
    const dispatch = useDispatch();

    const onInputChange = ()=>{
        caMessage.current.textContent = "Awesome day to Login In!";
        caMessage.current.classList.remove("error-message")
    }

    const forgotClick = async()=>{
        if(mail === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const log = await forgotPass(mail);
            setIsLoading(false)
            switch(log){
                case 200 : {
                    dispatch(setLoginState("KeySent"));
                    navigate("/");
                    return;
                }
                case 404 : {
                    caMessage.current.textContent = "Invalid Credentials";
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


    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"}></div>
        <div className="form container-fluid">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input type="email" className="reset-input" placeholder="Enter Name or Mail" value={mail} 
                onChange={(event)=>{
                    onInputChange()
                    setMail(event.target.value)}}/></div>
                <div className="d-flex reset-button justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={forgotClick}>Sent Reset Link</button></div>
                <p className="d-flex reset-text justify-content-center align-items-center"
                ref={caMessage}>Password Reset Link will be sent to your Mail!</p>
            </div>
        </div>
    
    </>
}