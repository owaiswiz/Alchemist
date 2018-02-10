$(document).ready(function() {
    $('#reader').html5_qrcode(function (data) {
        // do something when code is read
        console.log(data);
    },
        function (error) {
            //show read errors 
        }, function (videoError) {
            //the video stream could be opened
        }
    );
});

