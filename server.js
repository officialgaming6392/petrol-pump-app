require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Keep for backwards compatibility of old images

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('⚠️ WARNING: MONGODB_URI is not set. The app needs a database connection to work permanently.');
}

// Mongoose Schema for dynamic JSON collections
const AppDataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed }
}, { strict: false });

const AppData = mongoose.model('AppData', AppDataSchema);

// Cloudinary Configuration
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Storage strategy for uploaded photos (Cloudinary)
const storage = process.env.CLOUDINARY_CLOUD_NAME 
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'petrol_pump_uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
      }
    })
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
    });

const upload = multer({ storage });

const FILE_NAMES = [
  'settings', 'machineReadings', 'inventory', 
  'employees', 'customers', 'shifts', 
  'notifications', 'inventoryHistory'
];

// API: Get complete database
app.get('/api/db', async (req, res) => {
  try {
    if (!MONGODB_URI) return res.json({ empty: true });

    const docs = await AppData.find({});
    let db = {};
    
    if (docs.length === 0) {
      // MIGRATION: If DB is empty, try to import from local JSON files
      const DATA_DIR = path.join(__dirname, 'data');
      if (fs.existsSync(DATA_DIR)) {
        console.log('Migrating local JSON files to MongoDB...');
        for (const key of FILE_NAMES) {
          const filePath = path.join(DATA_DIR, `${key}.json`);
          if (fs.existsSync(filePath)) {
            try {
              const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              await AppData.findOneAndUpdate({ key }, { $set: { data: fileData } }, { upsert: true });
              db[key] = fileData;
            } catch(e) {
              console.error('Migration error for ' + key, e);
            }
          }
        }
      }
    } else {
      docs.forEach(doc => {
        db[doc.key] = doc.data;
      });
    }

    // If still empty, return empty indicating front end should init defaults
    if (Object.keys(db).length === 0) {
      return res.json({ empty: true });
    }
    res.json(db);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Save complete database
app.post('/api/db', async (req, res) => {
  try {
    const db = req.body;
    
    if (!db || typeof db !== 'object') {
      return res.status(400).json({ error: 'Invalid data' });
    }
    
    if (!MONGODB_URI) {
      return res.status(400).json({ error: 'MongoDB is not connected. Cannot save.' });
    }

    // Save each key into its own MongoDB document
    const updatePromises = [];
    for (const key of FILE_NAMES) {
      if (db[key] !== undefined) {
        updatePromises.push(
          AppData.findOneAndUpdate(
            { key: key },
            { $set: { data: db[key] } },
            { upsert: true, new: true }
          )
        );
      }
    }
    
    await Promise.all(updatePromises);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Image Upload
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // If using Cloudinary, the URL is in req.file.path. If local, we construct it.
  const photoUrl = process.env.CLOUDINARY_CLOUD_NAME 
    ? req.file.path 
    : '/uploads/' + req.file.filename;
    
  res.json({ url: photoUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
