var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", (req,res) => {
    burger.all((data) => {
        var obj = {
            burgers: data
        };
        console.log(obj);
        res.render("index",obj);
    });
});

router.post("/api/burgers", (req,res) => {
    burger.create(["burger_name"],[req.body.burger_name],
    (result) => {
        res.json({id: result.insertId});
    });

});
router.put("/api/burgers/:id", (req,res) => {
    var condition = "id="+req.params.id;
    burger.update({
          burger_name: req.body.burger_name
        },condition, (result) => {
            if(result.changedRows==0) {
                return res.status(404).end();
            }else{
                return res.status(200).end();
            }
    });
});
module.exports = router;
