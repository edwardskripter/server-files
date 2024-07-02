const mysql = require("mysql");

module.exports = {
    Pool: null,
    Connect: function(callback) {
        this.Pool = mysql.createPool({
            host: "mysql host",
            user: "mysql user",
            password: "mysql pass",
            database: "mysql database"
        });

        this.Pool.getConnection((err, conn) => {
            if (!err) {
                console.log("[Levels] Connected to database.");
                callback();
            } else {
                console.log(`[Levels Init Error] ${err.message}`);
            }

            conn.release();
        });
    }
};