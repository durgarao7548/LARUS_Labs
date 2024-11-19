const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database configuration
const dbConfig = {
    server: 'localhost',
    database: 'UserLoginDB',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to the database
        let pool = await sql.connect(dbConfig);

        // Fetch user
        const result = await pool
            .request()
            .input('Username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Validate password (assuming plaintext for simplicity; use hashing in real scenarios)
            if (user.PasswordHash === password) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid password.' });
            }
        } else {
            res.json({ success: false, message: 'User not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
