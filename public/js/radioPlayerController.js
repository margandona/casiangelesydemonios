// File: radioPlayerController.js (Controller)
/*
 * This file serves as the controller that handles user interactions.
 * It contains event listeners for the play, pause, volume, and mute controls.
 */
$(document).ready(function () {
    // Retrieve audio object from the model
    const audio = RadioPlayerModel.getAudio();
    let lastVolume = RadioPlayerModel.getLastVolume();
    let isMuted = RadioPlayerModel.isMuted();

    // Play button event listener
    $('#playButton').on('click', function () {
        audio.play();
        RadioPlayerModel.setPlayingStatus(true);
        $('#visualizer').show();
    });

    // Pause button event listener
    $('#pauseButton').on('click', function () {
        audio.pause();
        RadioPlayerModel.setPlayingStatus(false);
        $('#visualizer').hide();
    });

    // Volume slider event listener
    $('#volumeSlider').on('input', function () {
        const volume = $(this).val() / 100;
        audio.volume = volume;
        if (volume === 0) {
            isMuted = true;
            RadioPlayerModel.setMuteStatus(true);
            $('#volumeIcon').removeClass('fa-volume-up').addClass('fa-volume-mute');
        } else {
            isMuted = false;
            lastVolume = volume;
            RadioPlayerModel.setLastVolume(volume);
            RadioPlayerModel.setMuteStatus(false);
            $('#volumeIcon').removeClass('fa-volume-mute').addClass('fa-volume-up');
        }
    });

    // Mute/unmute button event listener
    $('#volumeIcon').on('click', function () {
        if (isMuted) {
            // Unmute and restore last volume
            audio.volume = lastVolume;
            $('#volumeSlider').val(lastVolume * 100);
            isMuted = false;
            RadioPlayerModel.setMuteStatus(false);
            $('#volumeIcon').removeClass('fa-volume-mute').addClass('fa-volume-up');
        } else {
            // Mute and save current volume
            lastVolume = audio.volume;
            RadioPlayerModel.setLastVolume(audio.volume);
            audio.volume = 0;
            $('#volumeSlider').val(0);
            isMuted = true;
            RadioPlayerModel.setMuteStatus(true);
            $('#volumeIcon').removeClass('fa-volume-up').addClass('fa-volume-mute');
        }
    });

    // Update progress bar during playback
    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        $('#progressBarFill').css('width', progress + '%');
    });

    // Create visualizer bars dynamically
    for (let i = 0; i < 20; i++) {
        $('#visualizer').append('<div class="radio-player__bar"></div>');
    }

    // Animate visualizer bars to mimic music rhythm
    setInterval(function () {
        if (!audio.paused) {
            $('.radio-player__bar').each(function () {
                const height = Math.random() * 100;
                $(this).css('height', height + 'px');
            });
        } else {
            $('.radio-player__bar').css('height', '20px');
        }
    }, 200);

    // Hide visualizer initially
    $('#visualizer').hide();
});
