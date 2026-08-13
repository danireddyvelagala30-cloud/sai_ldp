const express = require('express');
const cors = require('cors');
const contractsRouter = require('./routes/contracts');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.set('etag', false);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use('/api/contracts', contractsRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend Mock Server running on http://localhost:${PORT}`);
  console.log(`📋 GET Contracts API: http://localhost:${PORT}/api/contracts`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use by another process.`);
  } else {
    console.error('Server error:', err);
  }
});

