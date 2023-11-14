import axios from 'axios';
import cheerio from 'cheerio';

const base_url = `https://chapmanganelo.com/`;
const recent_release_url = `https://m.manganelo.com/genre-all-update-latest`;
const latest_nextpage = `https://m.manganelo.com/genre-all/`;
const top_url = `https://m.manganelo.com/genre-all/`;
const top_type = `?type=topview`;
const new_manga_url = `https://m.manganelo.com/genre-all/`;
const new_manga_type = `?type=newest`;
const search_url = `https://m.manganelo.com/search/story/`;
const top_completed_manga = `https://m.manganelo.com/advanced_search?s=all&sts=completed&orby=topview&page=`;

export const scrapeLatestManga = async ({ list = [], page = 1 }) => {
    try {
        if (page === 1) {
            const mainPage = await axios.get(recent_release_url);
            const $ = cheerio.load(mainPage.data);

            $('div.content-genres-item').each((i, el) => {
                list.push({
                    mangaId: $(el).find('.genres-item-img').attr('href'),
                    mangaTitle: $(el).find('div.genres-item-info > h3 > a').text(),
                    chapterNum: $(el).find('.genres-item-chap').text(),
                    views: $(el).find('.genres-item-view').text(),
                    mangaImg: $(el).find('a > img').attr('src'),
                });
            });
        } else {
            const mainPage = await axios.get(`${latest_nextpage}${page}`);
            const $ = cheerio.load(mainPage.data);

            $('div.content-genres-item').each((i, el) => {
                list.push({
                    mangaId: $(el).find('.genres-item-img').attr('href'),
                    mangaTitle: $(el).find('div.genres-item-info > h3 > a').text(),
                    chapterNum: $(el).find('.genres-item-chap').text(),
                    views: $(el).find('.genres-item-view').text(),
                    mangaImg: $(el).find('a > img').attr('src'),
                    description: $(el).find('.genres-item-description').text(),
                });
            });
        }
        return list;
    } catch (err) {
        throw err;
    }
};
export const scrapeTopManga = async ({ list = [], page = 1 }) => {
    try {
            const mainPage = await axios.get(`${top_url}${page}${top_type}`);
            const $ = cheerio.load(mainPage.data);

            $('div.content-genres-item').each((i, el) => {
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

export const scrapeNewManga = async ({ list = [], page = 1 }) => {
    try {
            const mainPage = await axios.get(`${new_manga_url}${page}${new_manga_type}`);
            const $ = cheerio.load(mainPage.data);

            $('div.content-genres-item').each((i, el) => {
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

export const scrapeSearch = async ({ list = [], keyw, page = 1 }) => {
    try {
     const searchPage = await axios.get(
      `${search_url}${keyw}?page=${page}`
     );
     const $ = cheerio.load(searchPage.data);
   
     $('div.search-story-item').each((i, el) => {
      list.push({
        mangaId: $(el).find('.item-img').attr('href'),
        mangaTitle: $(el).find('div.item-right > h3 > a').text(),
        author: $(el).find('.item-author').eq(0).text(),
        views: $(el).find('div.item-right > span').eq(2).text().replace('View : ', ''),
        mangaImg: $(el).find('.img-loading').attr('src'),
        last_update: $(el).find('div.item-right > span').eq(1).text().replace('Updated : ', ''),
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
            const mainPage = await axios.get(`${top_completed_manga}${page}`);
            const $ = cheerio.load(mainPage.data);

            $('div.content-genres-item').each((i, el) => {
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
     let genres = [];
     let chList = [];
     let authors = [];
   
     const animePageTest = await axios.get(`${base_url}${id}`);
   
     const $ = cheerio.load(animePageTest.data);
   
     const mangaTitle = $('div.story-info-right > h1').text();
     const mangaImage = $('div.story-info-left > span > img').attr('src');
     /*const author = $('table.variations-tableInfo > tbody > tr:nth-child(2) > td > a')
     .text();*/
     $('table.variations-tableInfo > tbody > tr:nth-child(2) > td > a.a-h').each((i, el) => {
        authors.push({
            authorName: $(el).text(),
        });
    });
     const desc = $('div.panel-story-info-description')
      .text()
      .replace('Description :', '');
     const updatedOn = $('div.story-info-right-extent > p:nth-child(1) > span')
      .text()
      .replace('Updated :', '');
     const status = $('table.variations-tableInfo > tbody > tr:nth-child(3) > td')
     .text()
     .replace('Status :', '');
     const alternativeTitle = $('table.variations-tableInfo > tbody > tr:nth-child(1) > td > h2')
      .text()
      .replace('Alternative :', '');
   
      $('table.variations-tableInfo > tbody > tr:nth-child(4) > td:nth-child(2) > a.a-h').each((i, el) => {
        genres.push({
            genreId: $(el).attr('href'),
            genreTitle: $(el).text(), // Splitting the genres here
        });
    });
   
    $('#row-content-chapter > li').each((i, el) => {
      chList.push({
       chapterId: $(el).find('a').attr('href'),
       chapterTitle: $(el).find('a').text(),
       chapterViews: $(el).find(`span.chapter-view`).text(),
       chapterUploadTime: $(el).find(`span.chapter-time`).text(),
      });
     });
   
     return {
      mangaTitle: mangaTitle.toString(),
      mangaImg: mangaImage.toString(),
      authors: authors,
      updatedOn: updatedOn.toString(),
      status: status.toString(),
      genres: genres,
      alternativeTitle: alternativeTitle,
      synopsis: desc.toString(),
      chapterList: chList,
     };
    } catch (err) {
     console.log(err);
     return { error: err };
    }
   };