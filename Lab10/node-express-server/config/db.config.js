module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'BC6310',
    DATABASE: 'lab9',
    //MULTIPLESTATEMENTS: true,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
