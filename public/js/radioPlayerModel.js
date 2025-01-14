// File: radioPlayerModel.js (Model)
/*
 * This file handles the data management for the radio player.
 * It defines the audio object, controls the volume, and manages mute status.
 */
const RadioPlayerModel = (function () {
    // Audio source URL, defined for security reasons
    const apiUrl = 'https://s57.radiolize.com/radio/8090/radio.mp3';
    let audio = new Audio(apiUrl);
    let lastVolume = 0.5;
    let isMuted = false;
    let isPlaying = false;

    // Ensure the audio continues playing in the background if not paused
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden' && isPlaying) {
            audio.play();
        }
    });

    // Public methods to interact with audio properties
    return {
        getAudio: () => audio,
        setLastVolume: (volume) => { lastVolume = volume; },
        getLastVolume: () => lastVolume,
        setMuteStatus: (muteStatus) => { isMuted = muteStatus; },
        isMuted: () => isMuted,
        setPlayingStatus: (playingStatus) => { isPlaying = playingStatus; },
        isPlaying: () => isPlaying
    };
})();