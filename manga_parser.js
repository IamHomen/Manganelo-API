import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://www.natomanga.com/";
const mangaInfoBaseURL = `${base_url}manga/`;
const recent_release_url = `${base_url}manga-list/latest-manga?page=`;
const hot_url = `${base_url}manga-list/hot-manga?page=`;
const new_manga_url = `https://www.natomanga.com/manga-list/new-manga?page=`;
const search_url = `${base_url}search/story/`;
const top_completed_manga = `https://m.manganelo.com/advanced_search?s=all&sts=completed&orby=topview&page=`;

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

export const scrapeLatestManga = async ({ list = [], page = 1 }) => {
    try {
        const url = `${recent_release_url}${page}`;
        const html = await getCachedOrFetch(url);
        const $ = cheerio.load(html);

        $('div.list-truyen-item-wrap').each((_, el) => {
            const title = $(el).find("h3 a").text().trim();
            const cover = $(el).find(".list-story-item.bookmark_check.cover img").attr("data-src") || $(el).find("a.cover img").attr("src");
            const id = $(el).find("h3 a").attr("href").split('/').pop();
            const latest_chapter = $(el).find("a.list-story-item-wrap-chapter").text().trim();
            const latest_chapter_id = $(el).find("a.list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '';
            const views = $(el).find("div span.aye_icon").text().trim();
            list.push({ title, cover, id, latest_chapter, latest_chapter_id, views });
        });

        return list;
    } catch (err) {
        throw err;
    }
};

export const scrapeHotManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${hot_url}${page}`);
        const $ = cheerio.load(html);

        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            list.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });
        return list;
    } catch (err) {
        throw err;
    }
};

export const scrapeNewManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${new_manga_url}${page}`);
        const $ = cheerio.load(html);

        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            list.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });
        return list;
    } catch (err) {
        throw err;
    }
};

export const scrapeSearch = async ({ list = [], keyw, page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${search_url}${keyw}?page=${page}`);
        const $ = cheerio.load(html);

        $('div.story_item').each((_, el) => {
            list.push({
                title: $(el).find("div.story_item_right h3").text().trim(),
                cover: $(el).find("a img").attr("src"),
                id: $(el).find("a").attr("href").split('/').pop(),
                views: $(el).find("div.story_item_right span").last().text().replace('View :', '').trim(), 
                updated: $(el).find("div.story_item_right span").eq(1).text().replace('Updated :', '').trim(),
            });
        });

        return list;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const scrapeTopCompletedManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${top_completed_manga}${page}`);
        const $ = cheerio.load(html);

        $('div.content-genres-item').each((_, el) => {
            list.push({
                mangaId: $(el).find('div.genres-item-info > a').attr('href'),
                mangaTitle: $(el).find('div.genres-item-info > h3 > a').text(),
                chapterNum: $(el).find('.genres-item-chap').text(),
                views: $(el).find('.genres-item-view').text(),
                mangaImg: $(el).find('a > img').attr('src'),
                description: $(el).find('.genres-item-description').text(),
            });
        });
        return list;
    } catch (err) {
        throw err;
    }
};

export const scrapeMangaDetails = async ({ id }) => {
    try {
        const html = await getCachedOrFetch(`${mangaInfoBaseURL}${id}`);
        const $ = cheerio.load(html);

        const title = $(".manga-info-text h1").text().trim();
        const cover = $(".manga-info-pic img").attr("src");
        const author = $(".manga-info-text li:contains('Author') a").text().trim() || "Unknown";
        const description = $("#contentBox").text().trim();
        const updated = $(".manga-info-text li:contains('Last updated')").text().replace("Last updated :", "").trim();
        const status = $(".manga-info-text li:contains('Status')").text().replace("Status :", "").trim();

        const genres = [];
        $(".manga-info-text li.genres a").each((_, el) => genres.push($(el).text().trim()));

        const chapters = [];
        $(".chapter-list .row").each((_, el) => {
            chapters.push({
                title: $(el).find("a").text().trim(),
                manga_id: $(el).find("a").attr("href").split("/")[4],
                chapter_id: $(el).find("a").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find("span:nth-child(2)").text().trim(),
                upload_time: $(el).find("span:nth-child(3)").attr("title") || $(el).find("span:nth-child(3)").text().trim(),
            });
        });

        return { title, cover, author, updated, status, genres, synopsis: description, chapters };
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const scrapeGenreManga = async ({ list = [] }) => {
    try {
        const html = await getCachedOrFetch(recent_release_url);
        const $ = cheerio.load(html);

        $('div.panel-genres-list > a').each((_, el) => {
            list.push({
                genreId: $(el).attr('href'),
                genreTitle: $(el).text(),
            });
        });
        return list;
    } catch (err) {
        throw err;
    }
};
