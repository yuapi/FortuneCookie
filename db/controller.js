const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'fortune.db'); 
const db = new sqlite3.Database(DB_PATH);

module.exports = {
    saveFortune,
    getFortune,
    closeDatabase
};

function saveFortune(userid, content) {
    const sql = `
    INSERT INTO fortune (userid, content)
    VALUES (?, ?)
    `;
    db.run(sql, [userid, content], (error) => {
        if (error) {
            console.error(`Error saving fortune: ${error.message}`);
        } else {
            console.log('Fortune saved successfully');
        }
    });
}

function getFortune(userid) {
    const sql = `
    SELECT content FROM fortune WHERE userid = ? AND date = date('now', 'localtime')
    `;

    return new Promise((resolve, reject) => {
        db.get(sql, [userid], (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row ? row.content : null);
            }
        });
    })
}

function closeDatabase() {
    db.close((error) => {
        if (error) {
            console.error(`Error closing database: ${error.message}`);
        } else {
            console.log('Database closed successfully');
        }
    });
}