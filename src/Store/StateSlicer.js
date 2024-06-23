import { createSlice } from "@reduxjs/toolkit"

const initiateState = {
    loginState : "Login"
}

const Slicer = createSlice({
    name : "nTaskSlicer",
    initialState : initiateState,
    reducers : {
        setLoginState(state,action){
            state.loginState = action.payload;
        }
    }
})

export const {setLoginState} = Slicer.actions;
export default Slicer.reducer;