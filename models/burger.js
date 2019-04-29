var orm = require("../config/orm");

var burger = {
    all: (cb) => {
        orm.selectAll("burgers", (res) => {
            cb(res);
        });
    },
    create: (cols,vals,cb) => {
        orm.insertOne("burgers",cols,vals, (res) => {
            cb(res);
        });
    },
    update: (id, cb) => {
        var condition = "id="+id;
        orm.updateOne("burgers",{devoured: true},condition, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;