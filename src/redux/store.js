import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "./slice/gameSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    // devTools: import.meta.env.VITE_NODE_ENV === "production" ? false : true
});
