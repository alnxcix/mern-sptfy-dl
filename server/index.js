const express = require("express");

const app = express();
const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      `[SUCCESS] Server is successfully running and listening on port ${PORT}.`
    );
  else console.log("[ERROR] Error occurred, server can't start.", error);
});
