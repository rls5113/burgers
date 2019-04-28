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
    update: (keyvalues, condition, cb) => {
        orm.updateOne("burgers",condition, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;