// START SERVER

require('dotenv').config();

const app = require("./src/app.js");
const connectToDB = require("./src/db/db.js");

connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App is live at port:", PORT);
});
