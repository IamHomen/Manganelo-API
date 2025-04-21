import cors from 'cors';
import express from 'express';
import axios from 'axios';

import {
  scrapeHotManga,
  scrapeLatestManga,
  scrapeMangaDetails,
  scrapeNewManga,
  scrapeSearch,
  scrapeCompletedManga,
  scrapeGenreManga,
  scrapeNatoMangaChapters
} from './src/type/manga/natomanga_parser.js';

import {
  scrapeAsuraSortManga,
  scrapeAsuraSearchManga,
  scrapeAsuraMangaDetails,
  scrapeAsuraChapters
} from './src/type/manga/asurascans_parser.js';

import {
  scrapeAnisaLatestManga,
  scrapeAnisaSearchManga
} from './src/type/manga/anisascans_parser.js';

import {
  scrapeAltaySortManga
} from './src/type/manga/altayscans_parser.js';

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
  const routes = [
    // NatoManga
    { route: '/manga/natomanga/latest-manga', description: 'Get latest manga from NatoManga' },
    { route: '/manga/natomanga/hot-manga', description: 'Get hot manga from NatoManga' },
    { route: '/manga/natomanga/new-manga', description: 'Get new manga from NatoManga' },
    { route: '/manga/natomanga/search', description: 'Search manga on NatoManga' },
    { route: '/manga/natomanga/completed-manga', description: 'Get completed manga from NatoManga' },
    { route: '/manga/natomanga/details/:id', description: 'Get manga details from NatoManga' },
    { route: '/manga/natomanga/chapters/:id/:chapter_id', description: 'Get manga chapters from NatoManga' },
    
    // AsuraScans
    { route: '/manga/asurascans/sort-manga', description: 'Get sorted manga from AsuraScans' },
    { route: '/manga/asurascans/search', description: 'Search manga on AsuraScans' },
    { route: '/manga/asurascans/details/:id', description: 'Get manga details from AsuraScans' },
    { route: '/manga/asurascans/chapters/:id/:chapter_id', description: 'Get manga chapters from AsuraScans' },
    
    // AnisaScans
    { route: '/manga/anisascans/latest-manga', description: 'Get latest manga from AnisaScans' },
    { route: '/manga/anisascans/search', description: 'Search manga on AnisaScans' },
    
    // AltayScans
    { route: '/manga/altayscans/sort-manga/:sort?', description: 'Get sorted manga from AltayScans' },
    
    // Proxy Image
    { route: '/proxy-image', description: 'Proxy image' },
  ];

  const providers = [
    { name: 'NatoManga', routes: routes.filter(route => route.route.includes('natomanga')) },
    { name: 'AsuraScans', routes: routes.filter(route => route.route.includes('asurascans')) },
    { name: 'AnisaScans', routes: routes.filter(route => route.route.includes('anisascans')) },
    { name: 'AltayScans', routes: routes.filter(route => route.route.includes('altayscans')) },
  ];

  const message = {
    welcome: 'Welcome to the Homen API!',
    description: 'This API provides access to manga from various providers.',
    providers: providers.map(provider => ({
      name: provider.name,
      routes: provider.routes.map(route => ({ route: route.route, description: route.description })),
    })),
  };

  res.status(200).json(message);
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

// NatoManga
app.get('/manga/natomanga/latest-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeLatestManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /latest-manga:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/hot-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeHotManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /top-manga:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/new-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeNewManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /new-manga:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/search', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeSearch({ keyw: req.query.keyw, page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /search:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/completed-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeCompletedManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /top-completed-manga:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/genre/:genre', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeGenreManga({ page: req.query.page, genre: req.params.genre });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /genre:', err);
    throw err;
  }
}));

app.get('/manga/natomanga/details/:id', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeMangaDetails({ id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error in /manga/natomanga/manga-details/${req.params.id}:`, err);
    throw err;
  }
}));

app.get('/manga/natomanga/chapters/:id/:chapter_id', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeNatoMangaChapters({ id: req.params.id, chapter_id: req.params.chapter_id });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /chapters:', err);
    throw err;
  }
}));

// ====================================================================================== //
//AsuraScans
app.get('/manga/asurascans/sort-manga', asyncHandler(async (req, res) => {
  try {
    const sort = req.query.sort;
    const page = req.query.page;
    const data = await scrapeAsuraSortManga({ sort, page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /sort-manga:', err);
    throw err;
  }
}));

app.get('/manga/asurascans/search', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeAsuraSearchManga({ page: req.query.page, keyw: req.query.keyw });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /sort-manga:', err);
    throw err;
  }
}));

app.get('/manga/asurascans/details/:id', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeAsuraMangaDetails({ id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /sort-manga:', err);
    throw err;
  }
}));

app.get('/manga/asurascans/chapters/:id/:chapter_id', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeAsuraChapters({ id: req.params.id, chapter_id: req.params.chapter_id });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /chapters:', err);
    throw err;
  }
}));

// ====================================================================================== //
//AnisaScans
app.get('/manga/anisascans/latest-manga', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeAnisaLatestManga({ page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /latest-manga:', err);
    throw err;
  }
}));

app.get('/manga/anisascans/search', asyncHandler(async (req, res) => {
  try {
    const data = await scrapeAnisaSearchManga({ keyw: req.query.keyw, page: req.query.page });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /search:', err);
    throw err;
  }
}));

//=============ALTAYSCANS============//
//AsuraScans
app.get('/manga/altayscans/sort-manga/:sort?', asyncHandler(async (req, res) => {
  try {
    const sort = req.params.sort || 'update';
    const data = await scrapeAltaySortManga({ page: req.query.page, sort });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in /sort-manga:', err);
    throw err;
  }
}));

// ==============END=============== //

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

  // Determine appropriate Referer
  let referer = "";
  if (decodedUrl.includes("asuracomic")) {
    referer = "https://asuracomic.net/";
  } else if (decodedUrl.includes("2xstorage")) {
    referer = "https://www.natomanga.com/";
  }

  try {
    const response = await axios.get(decodedUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "Referer": referer,
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
  console.log(`🚀 HomenAPI is live on port ${port}`);
});
