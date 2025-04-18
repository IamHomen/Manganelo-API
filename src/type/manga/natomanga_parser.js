import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
dotenv.config();

const base_url = process.env.NATOMANGA_BASE_URL;
if (!base_url) {
  throw new Error('NATOMANGA_BASE_URL environment variable is not set');
}

console.log(base_url);

const mangaInfoBaseURL = `${base_url}manga/`;
const recent_release_url = `${base_url}manga-list/latest-manga?page=`;
const hot_url = `${base_url}manga-list/hot-manga?page=`;
const new_manga_url = `${base_url}manga-list/new-manga?page=`;
const search_url = `${base_url}search/story/`;
const completed_manga = `${base_url}manga-list/completed-manga?page=`;

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

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const currentPage = $('.panel_page_number .group_page a.page_select').text().trim();
            if (!currentPage) {
                throw new Error('Current page not found');
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty a').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                throw new Error('Total results not found');
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('div.list-truyen-item-wrap').each((_, el) => {
            const title = $(el).find("h3 a").text().trim();
            const cover = $(el).find(".list-story-item.bookmark_check.cover img").attr("data-src") || $(el).find("a.cover img").attr("src");
            const id = $(el).find("h3 a").attr("href").split('/').pop();
            const latest_chapter = $(el).find("a.list-story-item-wrap-chapter").text().trim();
            const latest_chapter_id = $(el).find("a.list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '';
            const views = $(el).find("div span.aye_icon").text().trim();
            mangaList.push({ title, cover, id, latest_chapter, latest_chapter_id, views });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};


export const scrapeHotManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${hot_url}${page}`);
        const $ = cheerio.load(html);

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const currentPage = $('.panel_page_number .group_page a.page_select').text().trim();
            if (!currentPage) {
                throw new Error('Current page not found');
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty a').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                throw new Error('Total results not found');
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            mangaList.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};

export const scrapeNewManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${new_manga_url}${page}`);
        const $ = cheerio.load(html);

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const currentPage = $('.panel_page_number .group_page a.page_select').text().trim();
            if (!currentPage) {
                throw new Error('Current page not found');
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty a').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                throw new Error('Total results not found');
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            mangaList.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};

export const scrapeSearch = async ({ keyw, page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${search_url}${keyw}?page=${page}`);
        const $ = cheerio.load(html);

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const currentPage = $('.panel_page_number .group_page .page_select').text().trim();
            if (!currentPage) {
                throw new Error('Current page not found');
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty div').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                throw new Error('Total results not found');
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('div.story_item').each((_, el) => {
            mangaList.push({
                title: $(el).find("div.story_item_right h3").text().trim(),
                cover: $(el).find("a img").attr("src"),
                id: $(el).find("a").attr("href").split('/').pop(),
                views: $(el).find("div.story_item_right span").last().text().replace('View :', '').trim(),
                updated: $(el).find("div.story_item_right span").eq(1).text().replace('Updated :', '').trim(),
            });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const scrapeCompletedManga = async ({ list = [], page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${completed_manga}${page}`);
        const $ = cheerio.load(html);

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const currentPage = $('.panel_page_number .group_page a.page_select').text().trim();
            if (!currentPage) {
                const currentPageDiv = $('.panel_page_number .group_page div.page_select');
                if (currentPageDiv.length > 0) {
                    currentPage = currentPageDiv.text().trim();
                } else {
                    throw new Error('Current page not found');
                }
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty a').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                const totalResultsDiv = $('.panel_page_number .group_qty div');
                if (totalResultsDiv.length > 0) {
                    const match = totalResultsDiv.text().trim().match(/Total: (\d+)/);
                    if (match) {
                        totalResults = match[1];
                    } else {
                        throw new Error('Total results not found');
                    }
                } else {
                    throw new Error('Total results not found');
                }
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            mangaList.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
    } catch (err) {
        throw err;
    }
};

export const scrapeGenreManga = async ({ genre, page = 1 }) => {
    try {
        const html = await getCachedOrFetch(`${base_url}genre/${genre}?page=${page}`);
        const $ = cheerio.load(html);

        const getTotalPages = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const totalPages = $(paginationLinks[paginationLinks.length - 1]).attr('href').match(/page=(\d+)/)[1];
            return parseInt(totalPages);
        };

        const getCurrentPage = ($) => {
            const paginationLinks = $('.panel_page_number .group_page a');
            if (paginationLinks.length === 0) {
                throw new Error('Pagination links not found');
            }
            const currentPage = $('.panel_page_number .group_page a.page_select').text().trim();
            if (!currentPage) {
                const currentPageDiv = $('.panel_page_number .group_page div.page_select');
                if (currentPageDiv.length > 0) {
                    currentPage = currentPageDiv.text().trim();
                } else {
                    throw new Error('Current page not found');
                }
            }
            return parseInt(currentPage);
        };

        const getTotalResults = ($) => {
            const totalResults = $('.panel_page_number .group_qty a').text().trim().match(/Total: (\d+)/)[1];
            if (!totalResults) {
                const totalResultsDiv = $('.panel_page_number .group_qty div');
                if (totalResultsDiv.length > 0) {
                    const match = totalResultsDiv.text().trim().match(/Total: (\d+)/);
                    if (match) {
                        totalResults = match[1];
                    } else {
                        throw new Error('Total results not found');
                    }
                } else {
                    throw new Error('Total results not found');
                }
            }
            return parseInt(totalResults);
        };

        const mangaList = [];
        $('.truyen-list .list-truyen-item-wrap').each((_, el) => {
            mangaList.push({
                title: $(el).find("h3 a").text().trim(),
                cover: $(el).find(".cover img").attr("src"),
                id: $(el).find("h3 a").attr("href").split('/').pop(),
                latest_chapter: $(el).find(".list-story-item-wrap-chapter").text().trim(),
                latest_chapter_id: $(el).find(".list-story-item-wrap-chapter").attr("href").match(/chapter-\d+/)?.[0] || '',
                views: $(el).find(".aye_icon").text().trim(),
                description: $(el).find("p").text().trim(),
            });
        });

        const totalPages = getTotalPages($);
        const currentPage = getCurrentPage($);
        const totalResults = getTotalResults($);

        const response = {
            currentPage: currentPage.toString(),
            totalResults: totalResults.toString(),
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            results: mangaList
        };

        return response;
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
                chapter_id: $(el).find("a").attr("href").match(/chapter-[\d.-]+/)?.[0] || '',
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

export const scrapeNatoMangaChapters = async ({ id, chapter_id }) => {
    try {
        const html = await getCachedOrFetch(`${mangaInfoBaseURL}${id}/${chapter_id}`);
        const $ = cheerio.load(html);

        const getTotalChapters = ($) => {
            const options = $('.navi-change-chapter:first option');
            return options.length;
        };

        const getCurrentChapter = ($) => {
            const selectedOption = $('.navi-change-chapter:first option[selected]');
            return selectedOption.text().trim();
        };

        const getMangaId = ($) => {
            const selectedOption = $('.navi-change-chapter:first option[selected]');
            const dataC = selectedOption.attr('data-c').trim();
            const parts = dataC.split('/');
            return parts[2];
        };

        const getHasNextChapter = ($) => {
            const nextLink = $('.btn-navigation-chap .back');
            return nextLink.length > 0;
        };

        const getHasPrevChapter = ($) => {
            const prevLink = $('.btn-navigation-chap .next');
            return prevLink.length > 0;
        };

        const getNextChapterLink = ($) => {
            const nextLink = $('.btn-navigation-chap .back');
            if (nextLink.length > 0) {
                const href = nextLink.attr('href');
                const parts = href.split('/');
                return `${parts[3]}`;
            }
            return null;
        };

        const getPrevChapterLink = ($) => {
            const prevLink = $('.btn-navigation-chap .next');
            if (prevLink.length > 0) {
                const href = prevLink.attr('href');
                const parts = href.split('/');
                return `${parts[3]}`;
            }
            return null;
        };

        const totalChapters = getTotalChapters($);
        const currentChapter = getCurrentChapter($);
        const mangaId = getMangaId($);
        const hasNextChapter = getHasNextChapter($);
        const hasPrevChapter = getHasPrevChapter($);
        const nextChapterLink = getNextChapterLink($);
        const prevChapterLink = getPrevChapterLink($);

        const chapterTitle = $('.info-top-chapter h2').text().trim();

        const chapterImages = [];
        $('.container-chapter-reader img').each((_, el) => {
            chapterImages.push({
                src: $(el).attr('src'),
                alt: $(el).attr('alt').replace(" - MangaNato", ""),
                title: $(el).attr('title').replace(" - MangaNato", ""),
            });
        });

        const response = {
            totalChapters: totalChapters.toString(),
            id: mangaId,
            chapterTitle,
            currentChapter: currentChapter,
            hasNextChapter: hasNextChapter,
            hasPrevChapter: hasPrevChapter,
            nextChapterId: nextChapterLink,
            prevChapterId: prevChapterLink,
            chapterImages: chapterImages,
        };

        return response;
    } catch (err) {
        throw err;
    }
};