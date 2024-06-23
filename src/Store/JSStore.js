import { configureStore } from "@reduxjs/toolkit";
import StateSlicer from "./StateSlicer";


export const store = configureStore({
    reducer : {
        slicer : StateSlicer
    }
})