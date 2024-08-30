const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static('public')); // Додайте цей рядок для обслуговування статичних файлів

const port = 4000;

app.get("/", (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>Number generator</title>
        <link rel="stylesheet" href="/style.css">
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png">
        <link rel="manifest" href="favicons/site.webmanifest">
        <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#faebd6">
        <meta name="msapplication-TileColor" content="#faebd6">
        <meta name="theme-color" content="#faebd6">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    </head>
    <body>
        <form action="/" method="POST">
            <label for="min">Minimum number:</label>
            <input name='min' type='text' id="min" required>
            <label for="max">Maximum number:</label>
            <input name='max' type='text' id="max" required>
            <button type='submit'>Generate</button>
        </form>
    </body>
    </html>
    `;

    res.send(html);
});

app.post("/", (req, res) => {
    let { min, max } = req.body;
    min = parseInt(min);
    max = parseInt(max);

    if (min > max) {
        res.status(400);
        res.send("Ви неправильно вказали данні");
        return;
    }

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumber = randomNumber.toString();
    res.status(200);

    res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>Number generator</title>
        <link rel="stylesheet" href="/style.css">
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png">
        <link rel="manifest" href="favicons/site.webmanifest">
        <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#faebd6">
        <meta name="msapplication-TileColor" content="#faebd6">
        <meta name="theme-color" content="#faebd6">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    </head>
    <body>
        <form action="/" method="POST">
            <label class='titleResult'>Result</label>
            <p>${randomNumber}</p>
            <a class='btnBack' href='/'>Back</a>
        </form>
    </body>
    </html>
    `);

    // console.log(min, max);
    // console.log(typeof min, typeof max);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})