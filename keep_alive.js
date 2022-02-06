const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('THE SUITS MUSIC-BOT FUNCIONANDO CORRECTAMENTE '));

app.listen(port, () => console.log(`TheSuitsMusicBot is listening to http://localhost:${port}`));