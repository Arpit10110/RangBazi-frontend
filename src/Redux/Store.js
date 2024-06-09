import {configureStore} from "@reduxjs/toolkit"
import { gamblereducer } from "./Reducer"
const store= configureStore({
    reducer:{
        gambledeatil :gamblereducer
    }
})
export default store  