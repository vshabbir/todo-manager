const mongoose = require('mongoose');

connect().catch(error => console.log(error));

async function connect() {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI)
}

const database = mongoose.connection;
// console.log(database);

database.on('connected', () => {
    console.log('Database connected.', database.readyState);
});

database.on('connecting', () => {
    console.log('Trying to connect to database');
});


module.exports = mongoose;