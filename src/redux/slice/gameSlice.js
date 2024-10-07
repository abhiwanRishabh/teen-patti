import {createSlice} from "@reduxjs/toolkit";
import { saveToSessionStorage } from "../../utils/storage";
// import { getSessionStorageItem, setSessionStorageItem } from "../../utils/sessionStorageUtils";

const initialState = {
    gameMode: null,
    gameType: null,
    gameObj: {
        players: [],
    },
    rooms: [],
    roomType: "silverRoom",
    roomAmount : 0,
    isConnected: false,
    roomProperties : null,
    userData: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setisConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        setRoomType: (state, action) => {
            state.roomType = action.payload;
            saveToSessionStorage('roomType', state.roomType);
        },
        setGameMode: (state, action) => {
            state.gameMode = action.payload;
            saveToSessionStorage('gameMode', state.gameMode);
        },
        setRoomAmount: (state, action) => {
            state.roomAmount = action.payload;
            saveToSessionStorage('roomAmount', state.roomAmount);
        },

        setGamePlayers: (state, action) => {
            state.gameObj = {...state.gameObj, players: action.payload};
        },

        setRoomProperties: (state, action) => {
            state.roomProperties = action.payload;
        },
        setUserData: (state, action) => {
            const payload = action.payload;
            if (payload === null) {
                state.userData = null;
                return;
            }

            state.userData = {
                ...state.userData,
                ...payload,
            };
        },
    },
});

export default gameSlice.reducer;
export const {setisConnected, setRoomType, setGameMode, setGamePlayers,setUserData,setRoomAmount,setRoomProperties} = gameSlice.actions;
