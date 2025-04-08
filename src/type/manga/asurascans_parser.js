import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://asuracomic.net/";
const sort_manga_url = `${base_url}series?page=`;
const sort_advance_url = "&genres=&status=-1&types=-1&order=";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "Referer": base_url,
    "Accept-Language": "en-US,en;q=0.9",
};

// 🧠 Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 mins

const getCachedOrFetch = async (url) => {
    const now = Date.now();
    if (cache.has(url)) {
        const { timestamp, data } = cache.get(url);
        if (now - timestamp < CACHE_TTL) {
            return data;
        }
    }

    const res = await axios.get(url, { headers });
    cache.set(url, { data: res.data, timestamp: now });
    return res.data;
};

export const scrapeAsuraSortManga = async ({ page = 1, sort = "update" }) => {
    try {
        const validSorts = ['update', 'asc', 'desc', 'rating', 'bookmarks'];
        if (!validSorts.includes(sort)) {
            throw new Error(`Invalid sort parameter: ${sort}. Expected one of: ${validSorts.join(', ')}`);
        }

        const url = `${sort_manga_url}${page}${sort_advance_url}${sort}`;
        const html = await getCachedOrFetch(url);
        const $ = cheerio.load(html);

        const mangaList = [];
        $('div.grid.grid-cols-2.sm\\:grid-cols-2.md\\:grid-cols-5.gap-3.p-4 > a').each((_, el) => {
            const title = $(el).find("span.block.text-\\[13\\.3px\\].font-bold").text().trim();
            const cover = $(el).find("img.rounded-md").attr("src");
            const id = $(el).attr("href").split('/').pop();
            const latest_chapter = $(el).find("span.text-\\[13px\\].text-\\[\\#999\\]").text().trim().replace("Chapter ", "");
            const rating = $(el).find("label.ml-1").text().trim();
            const status = $(el).find("span.status").text().trim();
            const type = $(el).find("span.text-\\[10px\\].font-bold.py-\\[2px\\].px-\\[7px\\]").text().trim();
            mangaList.push({ title, cover, id, latest_chapter, rating, status, type });
        });

        const response = {
            currentPage: page.toString(),
            hasNextPage: page < 18,
            hasPrevPage: page > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};