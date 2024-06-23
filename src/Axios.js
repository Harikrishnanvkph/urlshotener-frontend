import axios from "axios";


async function login(credential,password){
    const status = await axios(
        {
            url : "http://localhost:3000/login",
            method : "post",
            data : {
                mail : credential,
                password : password 
            }
        }
    )
    return status.data;
}

async function forgotPass(mail){
    const status = await axios({
        url : "http://localhost:3000/password_reset",
        method : "post",
        data : {
            mail : mail
        }
    })
    return status.data;
}

async function checkSecretKeyWeb(mail,webKey,secretKey){
    const status = await axios({
        url : "http://localhost:3000/checkKeyValidate",
        method : "post",
        data : {
            mail : mail,
            webKey :webKey,
            secretKey : secretKey
        }
    })
    return status.data;
}

async function checkSecretKey(mail,secretKey){
    const status = await axios({
        url : "http://localhost:3000/checkKey",
        method : "post",
        data : {
            mail : mail,
            secretKey : secretKey
        }
    })
    return status.data;
}

async function resetPass(mail,pass){
    const status = await axios({
        url : "http://localhost:3000/set/password",
        method : "post",
        data : {
            mail : mail,
            password : pass
        }
    })
    return status.data;
}

async function createAccount(mail,firstname,lastname,pass){
    const status = await axios({
        url : "http://localhost:3000/createUser",
        method : "post",
        data : {
            mail : mail,
            firstname : firstname,
            lastname : lastname,
            password : pass
        }
    })
    return status.data;
}

async function shortUrlClick(mail,pathname,search){
    const status = await axios({
        url : "http://localhost:3000/shortUrlClick",
        method : "post",
        data : {
            mail : mail,
            pathname : pathname,
            search : search
        }
    })
    return status.data;
}

async function getUrls(mail){
    const status = await axios({
        url : "http://localhost:3000/getUrls",
        method : "post",
        data : {
            mail : mail
        }
    })
    return status.data;
}

export {getUrls,shortUrlClick,checkSecretKeyWeb,createAccount,resetPass,forgotPass,login, checkSecretKey}