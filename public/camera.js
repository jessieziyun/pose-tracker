// GET WEBCAM

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
    return isAndroid() || isiOS();
}

async function setupCamera(width, height) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const video = document.getElementById('video');
    video.width = width;
    video.height = height;

    const mobile = isMobile();
    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: mobile ? undefined : width,
            height: mobile ? undefined : height,
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

export async function loadVideo(width, height) {

    if (width !== undefined && height !== undefined) {
        const video = await setupCamera(width, height);
        video.play();
        return video;
    }
    if (width === undefined || height === undefined) {
        console.error("You are missing arguments. You must specify the width and height of the video to load");
    }
}