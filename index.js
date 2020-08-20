const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

require('./routes/newsRoutes')(app); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server has started on port 5000");
});