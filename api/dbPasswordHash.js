const path = require('path');

if (process.argv[process.argv.length - 1] == "dev") {
    require('dotenv').config({ path: path.join(__dirname, '.env') });
    console.log(process.argv[process.argv.length - 1])
} else {
    require('dotenv').config({ path: path.join(__dirname, '.env_test') });
}
const connection = require("./dbConnect");
const passwordEncrypt = require("./utils/passwordEncrypt").passwordEncrypt;

connection.query('SELECT * from tbl_adp', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    results.forEach(async element => {
        let hashedPassword = await passwordEncrypt(element.password);
        connection.query(`
        UPDATE tbl_adp
        SET tbl_adp.password="${hashedPassword}"
        WHERE tbl_adp.adp_id=${element.adp_id};`)
    });

    console.log("completed")

});