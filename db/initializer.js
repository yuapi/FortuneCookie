const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/fortune.db');

const sql = `
CREATE TABLE fortune (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid CHAR(18) NOT NULL,
    date TEXT DEFAULT (date('now'm 'localtime')),
    content TEXT
);
`;

db.run(sql, (error) => {
    if (error) {
        console.error(`Error creating table: ${error.message}`);
    } else {
        console.log('Table created successfully');
    }
});

db.close();
