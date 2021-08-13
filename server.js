const express = require("express")
// const bodyParser = require("body-parser");
const app = express();

app.use(express.static("./static"));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));


// app.get("/", (req, res) => {
//     res.send("Hello");
// })

app.listen(81, ()=> {
    console.log("Server started on port 3000");
})

