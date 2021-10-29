const db = require("../config/db");
const app = require("../app");
const { PORT } = require("../config/constants");

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`);
});
