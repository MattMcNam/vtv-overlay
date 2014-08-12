$(document).ready(function() {
    nodecg.listenFor('staffUpdate', staffUpdate);

    var streamer = $('#streamer');
    var streamerLabel = $('#streamerLabel');
    var streamerImage = $('#streamerImage');

    var leftCaster = $('#lCaster');
    var leftCasterLabel = $('#lCasterLabel');
    var leftCasterImage = $('#lCasterImage');

    var rightCaster = $('#rCaster');
    var rightCasterLabel = $('#rCasterLabel');
    var rightCasterImage = $('#rCasterImage');

    function staffUpdate(data) {
        console.log(data);

        streamer.addClass('hidden');
        leftCaster.addClass('hidden');
        rightCaster.addClass('hidden');

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
});

