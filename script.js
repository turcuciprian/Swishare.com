jQuery(document).ready(function() {
    function writeUserData(xKey) {
        database.ref(xKey + '/').set({
            "val": "Text from the iPhone Clipboard will show here...",
        });
        readUserData(xKey);
    }

    function readUserData(xKey) {
        var starCountRef = firebase.database().ref(xKey + '/');
        starCountRef.on('value', function(snapshot) {
            var returningData = snapshot.val().val;
            sResult = returningData;
            if ((returningData.indexOf('http') == 0) && (returningData.indexOf('://') >0)) {
                sResult = '<a href="' + returningData + '" target="_blank">' + returningData + '</a>';
            }
            codeCode.html(sResult);
        });
    }

    var sendCode = $("#sendCode");
    var getCode = $("#getCode");
    var codeCode = $('#codecode');
    var stringData = $("#stringData");
    var stringDataStr = '';

    //send the text
    if (sendCode[0]) {
        sendCode.click(function() {
            if (stringData[0]) {
                stringDataStr = stringData.val();
            }
            writeUserData(stringDataStr);

        });
    }
    //get the text

    if (getCode[0]) {
        getCode.click(function() {
            readUserData();

        });

    }

    //QR code generating code:

    // set unique number
    var d = new Date();
    var uniqueKey = d.getFullYear() + '' + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds() + '-' + Math.floor(Math.random() * (100 - 0)) + 0;

    // initialize and show QR code
    var qrcode = new QRCode("QRCode", {
        text: uniqueKey,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });


    writeUserData(uniqueKey);




});
