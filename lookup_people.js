const pg = require("pg");
const settings = require("./settings"); // settings.json
const [name] = process.argv.slice(2);
// console.log(name)

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name=$1", [name], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        console.log(result.rows)
        for (i = 0; i < result.rows.length; i++) {
            var eye = i + 1;
            var rowy = result.rows;
            var month = rowy[i].birthdate.getUTCMonth() + 1;
            var year = rowy[i].birthdate.getFullYear();
            var day = rowy[i].birthdate.getUTCDate();
            // console.log(month)
            console.log(`- ${eye}: ${rowy[i].first_name} ${rowy[i].last_name}, born ${year}-${month}-${day}`)
        }
        client.end();
    });
});



