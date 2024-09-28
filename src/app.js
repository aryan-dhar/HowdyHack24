const express = require('express');
const app = express();
const port = 3000;
const chatbotRoutes = require('./routes/chatbot');

app.get('/', (req, res) => {
  res.send('Mental Health Support Bot is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use('/api/chatbot', chatbotRoutes);
