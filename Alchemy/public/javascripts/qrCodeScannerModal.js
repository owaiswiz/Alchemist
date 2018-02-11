$(document).ready(function() {
    $('#reader').html5_qrcode(function (data) {
        // do something when code is read
        console.log(data);
        // setTimeout()
        Capsule.buy_medicine(parseInt(data),web3.eth.accounts[1],web3.eth.accounts[2],{from:web3.eth.accounts[2],gas:3000000});
        $("#qrCodeScannerModal").modal("hide");
    },
        function (error) {
            //show read errors 
        }, function (videoError) {
            //the video stream could be opened
        }
    );
});

