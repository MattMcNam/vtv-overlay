$(document).ready(function() {
    nodecg.listenFor('update', update);

    nodecg.listenFor('fadeIn', function() {
        container.removeClass('hidden');
    });
    nodecg.listenFor('fadeOut', function() {
        container.addClass('hidden');
    });

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

    var customMessage = $('#customMessage');
    var specificEvent = $('#specificEvent');

    function update(data) {
        console.log(data);

        if (streamerLabel.text() !== data.camera.name)
            streamer.addClass('hidden');

        if (leftCasterLabel.text() !== data.leftCaster.name)
            leftCaster.addClass('hidden');

        if (rightCasterLabel.text() !== data.rightCaster.name)
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

        customMessage.text(data.general);
        specificEvent.text(data.specific);

        textFit(customMessage[0], {maxFontSize: 28});
        textFit(specificEvent[0], {maxFontSize: 36, alignVert: true, multiLine: true, detectMultiLine: true});
    }

    // Browser source sometimes loads with no text rendered, but is fixed when anything changes on screen
    // So, we run a staff animation for a fraction of a second and hide it again when the source first loads
    streamer.removeClass('hidden');
    setTimeout(function() { streamer.addClass('hidden'); }, 50);
});

