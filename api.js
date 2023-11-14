import express from 'express';
import cors from 'cors';

import { scrapeLatestManga,
         scrapeTopManga,
         scrapeNewManga,
         scrapeSearch,
         scrapeTopCompletedManga,
         scrapeMangaDetails
 } from './manga_parser.js';

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  port: port,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Welcome to the Manga API made by MrCain!');
});

app.get('/latest-manga', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeLatestManga({ page: page });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err.message, // Change this to err.message to provide better error information
    });
  }
});

app.get('/top-manga', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeTopManga({ page: page });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err.message, // Change this to err.message to provide better error information
    });
  }
});
app.get('/new-manga', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeNewManga({ page: page });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err.message, // Change this to err.message to provide better error information
    });
  }
});
app.get('/search', async(req, res) => {
  try {
      const keyw = req.query.keyw;
      const page = req.query.page;

      const data = await scrapeSearch({ keyw: keyw, page: page });

      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({
          status: 500,
          error: 'Internal Error',
          message: err,
      });
  }
});
app.get('/top-completed-manga', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeTopCompletedManga({ page: page });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err.message, // Change this to err.message to provide better error information
    });
  }
});

app.get('/manga-details/:id', async(req, res) => {
  try {
      const id = req.params.id;

      const data = await scrapeMangaDetails({ id: id });

      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({
          status: 500,
          error: 'Internal Error',
          message: err,
      });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
  });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});