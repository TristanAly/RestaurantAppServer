const express = require("express");
const cors = require("cors");
const bodyParser   = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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

require('dotenv').config()

const db = require('./app/config/db.config.js');
//  db.sequelize.sync({force: true})
//  .then(() => {
//  console.log('Drop and Resync with { force: true }');
// });
db.sequelize.sync()
// api routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Our App." });
});

console.log("Started fetching route ...")

/* AUTHENTICATION */
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);

require('./app/routes/manager.route.js')(app);
require('./app/routes/recipe.route.js')(app);
require('./app/routes/ingredient.route.js')(app);
require('./app/routes/ingredient.recipe.route.js')(app);

function initial() {
  Role.create({
      id: 1,
      name: "user"
  });
  Role.create({
      id: 2,
      name: "business"
  });
  Role.create({
      id: 3,
      name: "dev"
  });
}

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});