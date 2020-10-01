const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

require('./routes/newsRoutes')(app); 
require('./routes/usersRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/downloadRoutes')(app);
require('./routes/appointmentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will server aup production  assests 
    //like out main.js file or main.css file
    app.use(express.static('client/build'));


    // Express will serve up index.html file
    // if does not recognise the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const PORT = process.env.PORT || 5000;
app.listen(PORT);