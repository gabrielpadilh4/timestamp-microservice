var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
    app.use(function (req, res, next) {
        var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}

app.get("/api/:date?", function (req, res) {

    var requestDate = req.params.date ? req.params.date : new Date();

    var newDate = new Date(isNaN(requestDate) ? requestDate : Number(requestDate))

    if (newDate instanceof Date && !isNaN(newDate)) {
        res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString() })
    } else {
        res.json({ error: 'Invalid date' })
    }
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Node is listening on port ' + port + '...');
})