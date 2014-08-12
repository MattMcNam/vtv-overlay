$(document).ready(function() {
    nodecg.listenFor('staffUpdate', staffUpdate);
    nodecg.listenFor('fadeIn', fadeIn);
    nodecg.listenFor('fadeOut', fadeOut);

    // Only search for these elements once
    var streamer = $('#streamer');
    var streamerLabel = $('#streamerLabel');
    var streamerImage = $('#streamerImage');

    var leftCaster = $('#lCaster');
    var leftCasterLabel = $('#lCasterLabel');
    var leftCasterImage = $('#lCasterImage');

    var rightCaster = $('#rCaster');
    var rightCasterLabel = $('#rCasterLabel');
    var rightCasterImage = $('#rCasterImage');

    var container = $('#container');

    function staffUpdate(data) {
        console.log(data);

        streamer.addClass('hidden');
        leftCaster.addClass('hidden');
        rightCaster.addClass('hidden');

        // Hide animation is 0.5s long, so only change data after that duration
        setTimeout(function() {
            streamerLabel.text(data.camera.name);
            streamerImage.css('background-image', 'url(\''+ data.camera.avatar + '\')');

            leftCasterLabel.text(data.leftCaster.name);
            leftCasterImage.css('background-image', 'url(\''+ data.leftCaster.avatar + '\')');

            rightCasterLabel.text(data.rightCaster.name);
            rightCasterImage.css('background-image', 'url(\''+ data.rightCaster.avatar + '\')');

            if (data.camera.name !== "NONE")
                streamer.removeClass('hidden');

            if (data.leftCaster.name !== "NONE")
                leftCaster.removeClass('hidden');

            if (data.rightCaster.name !== "NONE")
                rightCaster.removeClass('hidden');
        }, 550);
    }

    function fadeIn() {
        container.removeClass('hidden');
    }

    function fadeOut() {
        container.addClass('hidden');
    }

    // Browser source sometimes loads with no text rendered, but is fixed when anything changes on screen
    // So, we run a staff animation for a fraction of a second and hide it again when the source first loads
    streamer.removeClass('hidden');
    setTimeout(function() { streamer.addClass('hidden'); }, 50);
});

