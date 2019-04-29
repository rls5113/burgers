var express = require("express");
var methodOverride = require("method-override");
var PORT = process.env.PORT || 8080;

var app = express();
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

var routes = require("./controllers/burgers_controller");
app.use(routes);

app.listen(PORT, () => {
    console.log("server listening on http://localhost:"+PORT);
});