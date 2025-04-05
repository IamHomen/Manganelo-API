import cors from 'cors';
import express from 'express';
import axios from 'axios';

import {
  scrapeGenreManga,
  scrapeHotManga,
  scrapeLatestManga,
  scrapeMangaDetails,
  scrapeNewManga,
  scrapeSearch,
  scrapeTopCompletedManga
} from './manga_parser.js';

const app = express();
const port = process.env.PORT || 3000;
// ✅ In-memory image cache
const imageCache = new Map(); // key: imageUrl, value: { data, contentType, timestamp }
const CACHE_TTL = 1000 * 60 * 60; // 1 hour TTL

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the NatoManga API made by Homen!' });
});

// Utility wrapper for async routes
const asyncHandler = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) =>
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
      message: err.message || 'Something went wrong',
    })
  );

// Routes
app.get('/latest-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeLatestManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /latest-manga:', err);
    throw err;
  }
}));

app.get('/hot-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeHotManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /top-manga:', err);
    throw err;
  }
}));

app.get('/new-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeNewManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /new-manga:', err);
    throw err;
  }
}));

app.get('/search', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeSearch({ keyw: req.query.keyw, page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /search:', err);
    throw err;
  }
}));

app.get('/top-completed-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeTopCompletedManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /top-completed-manga:', err);
    throw err;
  }
}));

app.get('/genre-list-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeGenreManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /genre-list-manga:', err);
    throw err;
  }
}));

app.get('/manga-details/:id', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeMangaDetails({ id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error in /manga-details/${req.params.id}:`, err);
    throw err;
  }
}));

// 🚀 Proxy Image with In-Memory Caching
app.get("/proxy-image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send("Missing image URL.");
  }

  const decodedUrl = decodeURIComponent(imageUrl);

  // ✅ Check in-memory cache
  const cached = imageCache.get(decodedUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("✅ Serving from memory cache:", decodedUrl);
    res.set("Content-Type", cached.contentType);
    return res.send(cached.data);
  }

  try {
    const response = await axios.get(decodedUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "Referer": "https://www.natomanga.com/",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // ✅ Store in memory cache
    imageCache.set(decodedUrl, {
      data: response.data,
      contentType: response.headers["content-type"],
      timestamp: Date.now(),
    });

    console.log("🚀 Fetching from source:", decodedUrl);
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error("❌ Error fetching image:", error.message);
    res.status(500).send("Error fetching image.");
  }
});

// ✅ Cleanup expired cache items (runs every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of imageCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      imageCache.delete(key);
      console.log("🗑️ Removed expired cache entry:", key);
    }
  }
}, 10 * 60 * 1000); // Every 10 minutes


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 NatoManga API is live on port ${port}`);
});
