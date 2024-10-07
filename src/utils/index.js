import toast from "react-hot-toast";

export function generateRandomRoomName(type = "roomName") {
    // Define the character pool for the room name
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Set the desired room name length
    const roomNameLength = type === "password" ? 8 : 4;

    // Create an empty string to store the room name

    let roomName = type === "password" ? "" : "room_";

    // Loop to generate random characters and build the room name
    for (let i = 0; i < roomNameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomName += characters.charAt(randomIndex);
    }

    // Return the generated room name
    return roomName;
}

export function generateRoomCode(length) {
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += digits[Math.floor(Math.random() * 10)];
    }
    return code;
}

const color = {
    'error' : 'red',
    'success' : 'green'
 }

export function showToast(type, message) {
    let style = {
        border: `1px solid ${color[type]}`,
        padding: ".5rem",
        color: "#000",
    };
    if (type === null) {
        toast(message, {
            icon: "",
            style: {
                ...style,
                color: "#fff",
                fontWeight: "200",
                background: "rgb(76 0 255 / 50%)",
            },
            position: "	bottom-right",
        });
    } else if (type === "info") {
        toast(message, {
            icon: "✨",
            // duration : 500,
            style: {
                ...style,
                color: "#000",
                fontWeight: "400",
                background: "#fff",
            },
            position: "bottom-right",
        });
    } else {
        toast[type](message, {
            duration: 5000,
            style: style,
            position: "bottom-right",
        });
    }
}

export const delay = async (cb, duration = 1000) => {
    // //("cab callend....")
    await new Promise((resoleve) => setTimeout(resoleve, duration));
    if (cb) cb();
};

export function getTime(time) {
    if (time === 0) {
        return {
            minute: 0,
            second: 0,
        };
    }
    let minute = Math.floor((time / 1000 / 60) % 60);
    let second = (time / 1000) % 60;
    return {
        minute,
        second,
    };
}
