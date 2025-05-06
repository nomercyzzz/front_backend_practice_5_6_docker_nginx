const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// путь к файлу с товарами
const dataFilePath = path.join(__dirname, 'xxx.json');

// апи для получения товаров
app.get('/products', (req, res) => {
    if (fs.existsSync(dataFilePath)) {
        const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        res.json(products);
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log('Сервер каталога запущен на http://localhost:'+PORT);
});