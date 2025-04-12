import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://asuracomic.net/";
const sort_manga_url = `${base_url}series?page=`;
const sort_advance_url = "&genres=&status=-1&types=-1&order=";
const search_url = `${base_url}series?page=`;
const mangaInfoBaseURL = "https://asuracomic.net/series/"

const userAgents = [
    // Chrome User Agents
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/135.0.7049.83 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/135.0.7049.83 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPod; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/135.0.7049.83 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 Mobile Safari/537.36",

    // Firefox User Agents
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.7; rv:137.0) Gecko/20100101 Firefox/137.0",
    "Mozilla/5.0 (X11; Linux i686; rv:137.0) Gecko/20100101 Firefox/137.0",
    "Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/137.0 Mobile/15E148 Safari/605.1.15",
    "Mozilla/5.0 (iPad; CPU OS 14_7_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/137.0 Mobile/15E148 Safari/605.1.15",
    "Mozilla/5.0 (Android 15; Mobile; rv:137.0) Gecko/137.0 Firefox/137.0",

    // Safari User Agents
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1",

    // Yandex Browser User Agents
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 YaBrowser/25.2.5.940 Yowser/2.5 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 YaBrowser/25.2.5.940 Yowser/2.5 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 YaBrowser/25.4.0.1657 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 YaBrowser/25.4.0.1657 Mobile/15E148 Safari/605.1",
    "Mozilla/5.0 (Linux; arm_64; Android 15; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 YaBrowser/25.2.8.97 Mobile Safari/537.36"
];

const getRandomUserAgent = () => {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const headers = {
    "User-Agent": getRandomUserAgent(),
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

export const scrapeAsuraSearchManga = async ({ page = 1, keyw }) => {
    try {

        const url = `${search_url}${page}&name=${keyw}`;
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

export const scrapeAsuraMangaDetails = async ({ id }) => {
    try {
        const html = await getCachedOrFetch(`${mangaInfoBaseURL}${id}`);
        const $ = cheerio.load(html);

        const title = $("div.text-center .text-xl.font-bold").text().trim();
        const cover = $("div.col-span-full img").attr("src");
        const banner = $(".bigcover .ime").attr("src") || "https://i.ibb.co/sLWSbWs/dafault-cover1.jpg";
        const description = $("span.font-medium.text-sm").text().trim();
        const updated = $(".grid.grid-cols-1.gap-5.mt-8 > div:nth-child(5) > h3:nth-child(2)").text().trim();
        const status = $("div > div.flex.flex-row > div:nth-child(1) > h3:nth-child(2)").text().trim();
        const type = $(".text-sm.text-white.hover\\:text-themecolor.capitalize.cursor-pointer").text().trim();
        const rating = $(".ml-1.text-white.text-xs").text().trim();

        const genres = [];
        $(".text-white.hover\\:text-themecolor.text-sm.cursor-pointer.rounded-\\[3px\\].px-3.py-1.bg-\\[\\#343434\\]").each((_, el) => genres.push($(el).text().trim()));

        const author = $(".grid.grid-cols-1.gap-5.mt-8 > div:nth-child(2) > h3:nth-child(2)").text().trim() || "N/A";
        const serialization = "_";
        const artist = $(".grid.grid-cols-1.gap-5.mt-8 > div:nth-child(3) > h3:nth-child(2)").text().trim() || "N/A";

        const chapters = [];
        $(".pl-4.py-2.border.rounded-md.group.w-full.hover\\:bg-\\[\\#343434\\].cursor-pointer.border-\\[\\#A2A2A2\\]\\/20.relative").each((_, el) => {
            const chapterId = $(el).find("a").attr("href");
            const chapterName = $(el).find("h3.text-sm.text-white.font-medium").text().trim();
            const chapterDate = $(el).find("h3.text-xs.text-\\[\\#A2A2A2\\]").text().trim();
            const parts = chapterId.split("/");

            chapters.push({
                id: `${parts[0]}`,
                chapter_id: `${parts[2]}`,
                name: chapterName,
                date: chapterDate,
            });
        });

        const related_series = [];
        $(".grid.grid-cols-2.gap-3.p-4 > a").each((_, el) => {
            const title = $(el).find("div > h2.font-bold").text().trim();
            const cover = $(el).find("div > div > img").attr("src");
            const id = $(el).attr("href").split('/').pop();
            const latest_chapter = $(el).find("div > h2 > span").text().trim();
            const rating = $(el).find("div > div > span > label.ml-1").text().trim();
            const status = $(el).find("div > div > span.status").text().trim();

            related_series.push({
                title: title,
                cover: cover,
                id: id,
                latest_chapter: latest_chapter,
                rating: rating,
                status: status
            });
        });

        return {
            title,
            cover,
            banner,
            author,
            serialization,
            artist,
            updated,
            status,
            type,
            rating,
            genres,
            synopsis: description,
            chapters,
            related_series,
        };
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const scrapeAsuraChapters = async ({ id, chapter_id }) => {
    try {
        const url = `${mangaInfoBaseURL}${id}/chapter/${chapter_id}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const chapterLinks = $('.dropdown-content a');

        const currentChapterText = $('.dropdown-btn h2').text();
        const currentChapterNumber = parseInt(currentChapterText.replace('Chapter ', ''));

        const totalChapters = chapterLinks.length;

        const currentChapterPosition = Array.from(chapterLinks).findIndex(link => {
            const linkChapterText = $(link).find('h2').text();
            const linkChapterNumber = parseInt(linkChapterText.replace('Chapter ', ''));
            return linkChapterNumber === currentChapterNumber;
        }) + 1;

        const chapMatch = data.replace(/\\/g, '').match(/pages.*:(\[{['"]order["'].*?}\])/);
        if (!chapMatch) throw new Error('Parsing error');
        const chap = JSON.parse(chapMatch[1]);

        const chapterPages = chap.map((page, index) => ({
            page: index + 1,
            img: page.url,
        }));

        const paginationLinks = $('.flex.items-center.gap-x-3.flex-row.w-full.xs\\:w-40.justify-between.xs\\:self-end');
        const nextLink = paginationLinks.find('a:has(.lucide-chevron-right)');
        const prevLink = paginationLinks.find('a:has(.lucide-chevron-left)');

        const hasNextPage = nextLink.length > 0;
        const hasPrevPage = prevLink.length > 0;

        const nextChapterId = hasNextPage ? nextLink.attr('href').split('/chapter/')[1] : null;
        const prevChapterId = hasPrevPage ? prevLink.attr('href').split('/chapter/')[1] : null;

        const response = {
            id,
            currentChapterNumber,
            hasNextPage,
            hasPrevPage,
            nextChapterId,
            prevChapterId,
            chapterPages
        };

        return response;
    } catch (err) {
        throw err;
    }
};