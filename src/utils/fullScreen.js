// Utility function to enter fullscreen mode
export const enterFullScreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
         // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { 
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { 
        // IE/Edge
        element.msRequestFullscreen();
    }
};

// Utility function to exit fullscreen mode
export const exitFullScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
         // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
        // IE/Edge
        document.msExitFullscreen();
    }
};