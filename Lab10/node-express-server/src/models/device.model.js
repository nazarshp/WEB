const Sequelize = require("sequelize");
const db = require('./db');

const Device = db.define("shoes", {
    picture: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    instock: {
        type: Sequelize.BOOLEAN
    },
});

Device.sync().then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = Device;
