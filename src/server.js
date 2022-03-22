const { PORT = 5000 } = process.env;

const app = require("./app");
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);

// const { PORT = 5000 } = process.env;

// const app = require("./app");
// const knex = require("./db/connection");

// knex.migrate
//   .latest()
//   .then((migrations) => {
//     console.log("migrations", migrations);
//     app.listen(PORT || 3000, listener);
//   })
//   .catch((error) => {
//     console.error(error);
//     knex.destroy();
//   });

// function listener() {
//   console.log(`Listening on Port ${PORT}!`);
// }
