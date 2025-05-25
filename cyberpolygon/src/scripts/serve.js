const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы из каталога build
app.use(express.static(path.join(__dirname, '../../build')));

// Все запросы, которые не обрабатываются статическими файлами,
// должны возвращать index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Открой в браузере: http://localhost:${PORT}`);
}); 