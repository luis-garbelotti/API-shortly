import { connection } from "../database.js";

export async function generateShorten(req, res) {

    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const url = req.body.url;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let short = '';
    let random;
    
    try {

        const user = await connection.query(`
            SELECT * FROM sessions WHERE token=$1
        `, [token])

        if(user.rowCount === 0) {
            res.sendStatus(401);
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        for (let i = 0; i < 8; i++) {
            random = getRandomInt(0, 62);
            short += characters[random]
        }

        const newUrl = {
            shortUrl: short
        }

        await connection.query(`
            INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
        `, [user.rows[0].userId, url, newUrl.shortUrl]);

        res.status(201).send(newUrl);
        
    } catch (error) {
        res.sendStatus(500)
    }


}