import {io} from "socket.io-client";

// options
const option = {
    closeOnBeforeunload: false,
};

// //("process.env.REACT_APP_SOCKET_URL", import.meta.env.VITE_SOCKET_URL);

// have to use ENVCMD for import // import.meta.env.VITE_SOCKET_URL,
// ** socket client instance
const socket = io('https://multiplayerludo.betbyheart.com/', option);

async function sendRequest(key, dataToSend, callback) {
    socket.emit(key, dataToSend, callback);
}


// export
export {socket, sendRequest};
