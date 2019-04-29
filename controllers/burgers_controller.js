var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", (req,res) => {
    res.redirect("/burgers")
});
router.get("/burgers", (req,res) => {
    burger.all((data) => {
        res.render("index",{data: data});
    });
});

router.post("/burgers", (req,res) => {
   burger.create(["burger_name"],[req.body.burger_name],
    (result) => {
        res.redirect("/");
    });

});
router.put("/burgers/update", (req,res) => {
    var condition = "id="+req.params.id;
    burger.update(req.body.burger_id, (result) => {
            res.redirect("/");
    });
});
module.exports = router;
