const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/howdyhack24', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));