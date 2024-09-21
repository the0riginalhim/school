require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

 
// User Model
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  major: String,
  university: String,
  year: String,
  bio: String,
  skills: [String],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Post Model
const Post = mongoose.model('Post', {
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Authentication Middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, major, university, year } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword, major, university, year });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

 // User Login
 app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
}); 


// Create Post
app.post('/posts', auth, async (req, res) => {
  try {
    const post = new Post({
      author: req.userId,
      content: req.body.content
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Posts
app.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt').populate('author', 'name');
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Connection
app.post('/connections', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.connections.push(req.body.connectionId);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Search Users and Posts
app.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { major: { $regex: query, $options: 'i' } },
        { university: { $regex: query, $options: 'i' } }
      ]
    }).select('name major university');

    const posts = await Post.find({
      content: { $regex: query, $options: 'i' }
    }).populate('author', 'name');

    res.send({ users, posts });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));