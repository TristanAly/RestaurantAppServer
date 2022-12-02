const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const db = require("./app/config/db.config");
const Role = db.role;

/* ROUTES */  
app.get('/', (request, response) => {
    response.json({ message: "Welcome at the API QRChef!" });
});

/* AUTHENTICATION */
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/manager.route')(app);

require('./app/routes/restaurant.route')(app);
require('./app/routes/recipe.route')(app);
require('./app/routes/ingredient.route')(app);
require('./app/routes/ingredient.recipe.route')(app);
require('./app/routes/recipe.restaurant.route')(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

// Creates 3 roles needed in db
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "resto"
    });
    Role.create({
        id: 3,
        name: "dev"
    });
}

    // execution de sequelize et création tables si 1ere fois
    // db.sequelize.sync();
db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and resync Db');
    initial();
});