import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://anisascans.in/page/";
const referrer = "https://anisascans.in/"
const info_base_url = `${referrer}manga/`;

const search_url = `${referrer}?s=`;
const advance_url = "post_type=wp-manga&op=&author=&artist=&release=&adult=";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "Referer": referrer,
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

export const scrapeAnisaLatestManga = async ({ page = 1 }) => {
    try {

        const url = `${base_url}${page}`;
        const html = await getCachedOrFetch(url);
        const $ = cheerio.load(html);

        const mangaList = [];
        $('div.col-6.col-md-3.badge-pos-1').each((_, el) => {
            const title = $(el).find("h3.h5 a").text().trim();
            const cover = $(el).find("img.img-responsive").attr("src");
            const id = $(el).find("div.item-thumb a").attr("href").match(/\/manga\/([^\/]+)/)[1];
            const rating = $(el).find("div.post-total-rating span.score").text().trim();
            const latestChapters = [];
            $(el).find("div.chapter-item").each((_, chapterEl) => {
                const chapterName = $(chapterEl).find("span.chapter a").text().trim();
                const chapterUrl = $(chapterEl).find("span.chapter a").attr("href").match(/chapter-([^-]+)/)[0].replace('/', '');
                latestChapters.push({ chapterName, chapterUrl });
            });
            mangaList.push({ title, cover, id, rating, latestChapters });
        });

        const response = {
            currentPage: page.toString(),
            hasNextPage: page < 126,
            hasPrevPage: page > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};

export const scrapeAnisaSearchManga = async ({ keyw, page = 1 }) => {
    try {

        const url = `${search_url}${keyw}&${advance_url}`;
        const html = await getCachedOrFetch(url);
        const $ = cheerio.load(html);

        const mangaList = [];
        $('div.c-tabs-item__content').each((_, el) => {
            const title = $(el).find("h3.h4 a").text().trim();
            const cover = $(el).find("img.img-responsive").attr("src");
            const id = $(el).find("h3.h4 a").attr("href").match(/\/manga\/([^\/]+)/)[1];
            const latestChapter = $(el).find("span.font-meta.chapter a").text().trim().replace("Chapter ", "");
            const latestChapterUrl = $(el).find("span.font-meta.chapter a").attr("href").match(/chapter-([^-]+)/)[0].replace('/', '');
            mangaList.push({ title, cover, id, latestChapter, latestChapterUrl });
        });

        const response = {
            currentPage: page.toString(),
            hasNextPage: page < 1,
            hasPrevPage: page > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};