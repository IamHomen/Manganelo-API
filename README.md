<p align="center">
  <a href="https://github.com/riimuru/gogoanime">
    <img src="https://m.manganelo.com/themes/hm/images/logo.png" alt="Logo" width="85" height="85">
  </a>

  <h3 align="center">Manganelo API (Ongoing)</h3>

  <p align="center">
    <samp>A free manga reading restful API serving manga from <a href="https://m.manganelo.com/">Manganelo</a></samp>
    <br />
    <a href="#routes"><strong>Explore the api »</strong></a>
    <br />
    <br />
  </p>

<h1> Table of Contents </h1>

- [Installation](#installation)
  - [Local](#local)
  - [Heroku](#heroku)
  - [Render](#render)
  - [Railway](#railway)
- [Routes](#routes)
  - [Get Latest Update](#get-latest-update)
  - [Get Top Manga](#get-top-manga)
  - [Get New Manga](#get-new-manga)
  - [Get Manga Search](#get-manga-search)
  - [Get Top Completed Manga](#get-top-completed-manga)
  - [Get Manga Genre List](#get-manga-genre-list)
    - [Genres](#genres)
  - [Get Manga Details](#get-manga-details)
  - [Currently supported sites](#currently-supported-sites)
  - [How to get started?](#how-to-get-started)


## Installation

### Local
Run the following command to clone the repository, and install the dependencies:

```sh
git clone https://github.com/mrcainv1-3128/Manganelo-API.git
cd Manganelo-API
npm install #or yarn install
```

start the server with the following command:

```sh
npm start #or yarn start
```
Now the server is running on http://localhost:3000

This will start the server on port 3000. You can access the server at http://localhost:3000/, And can change the port by changing the -p option to `-p <port>:3000`.

You can add `-d` flag to run the server in detached mode.

### Heroku
Host your own instance of the api on heroku using the button below.

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/riimuru/gogoanime/tree/main)

### Render
Host your own instance of the api on render using the button below.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/riimuru/gogoanime-api)

### Railway
Host your own instance of the api on railway using the button below.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Lg6DEp?referralCode=dv4TuD)

## Routes
Below you'll find examples using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) but you can use any other http library out there.

### Get Latest Update

| Parameter    | Description                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page` (int) | **page limit: [1-1643].**                                                                                                                              |

```js
fetch("http://localhost:3000/latest-manga?page=1")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
    {
    "mangaId": "https://chapmanganelo.com/manga-uv135189",
    "mangaTitle": "Souiu Koto Nara, Watashi Ga.",
    "chapterNum": "Vol.1 Chapter 5",
    "views": "276",
    "mangaImg": "https://avt.mkklcdnv6temp.com/28/f/31-1694400532.jpg",
    "description": "\nI love you so much so just why do I have to wait until I turn 30!?Nagase Kana (28) is the daughter of a company president and she now works as an OL at the company. Kana is actually secretly dating her boss, Haruhiko (40) and her current source of worry is the fact that he still hasn't made a move on her.Meanwhile, Shindou Haruhiko decided on his own that, \"I won't lay a hand on you until \n"
  },
    {...},
    ...
]
```

### Get Top Manga

| Parameter    | Description         |
| ------------ | ------------------- |
| `page` (int) | page limit: [1-1643] |

```js
fetch("http://localhost:3000/top-manga?page=1")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
    {
    "mangaId": "https://chapmanganelo.com/manga-ax89091/chapter-452.5",
    "mangaTitle": "Tales Of Demons And Gods",
    "chapterNum": "Chapter 452.5",
    "views": "829.3K",
    "mangaImg": "https://avt.mkklcdnv6temp.com/19/v/1-1583464475.jpg",
    "description": "\nNie Li, one of the strongest Demon Spiritist in his past life standing at the pinnacle of the martial world , however he lost his life during the battle with Sage Emperor and the six deity ranked beast, his soul was then reborn back in time back to when he is still 13. Although he’s the weakest in his class with the lowest talent at only Red soul realm, with the aid of the vast knowledge whi \n"
  },
    {...},
    ...
]
```

### Get Manga Search

| Parameter       | Description         |
| --------------- | ------------------- |
| `keyw` (string) | anime title         |
| `page` (int)    | page limit may vary |

```js
fetch("http://localhost:3000/search?keyw=isekai&page=1")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
    {
    "mangaId": "https://chapmanganelo.com/manga-qm88732",
    "mangaTitle": "Mushoku Tensei - Isekai Ittara Honki Dasu",
    "author": "Rifujin Na Magonote, Fujikawa Yuka",
    "views": "334.5K",
    "mangaImg": "https://avt.mkklcdnv6temp.com/7/r/1-1583463967.jpg",
    "last_update": "Oct 13,2023 - 22:21"
  },
    {...},
    ...
]
```

### Get Top Completed Manga

| Parameter    | Description                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `page` (int) | page limit [1-393].                                                                                         |

```js
fetch("http://localhost:3000/top-completed-manga?page=1")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
  {
    "mangaId": "https://chapmanganelo.com/manga-yg89074/chapter-953.6",
    "mangaTitle": "Tomo-Chan Wa Onnanoko!",
    "chapterNum": "Chapter 953.6: Volume 8 Extras",
    "views": "269.6K",
    "mangaImg": "https://avt.mkklcdnv6temp.com/19/e/1-1583464448.jpg",
    "description": "\nTomo loves Jun, but she is really boyish (speaks like a boy, is the strongest karateka of her school...) and can't get him to think of her as a girl. Read the funny lives of Tomo, her best friend Misuzu and Jun! \n"
  },
    {...},
    ...
]
```

### Get New Manga

| Parameter    | Description                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `page` (int) | page limit [1-1644].                                                                                        |

```js
fetch("http://localhost:3000/new-manga?page=1")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
  {
    "mangaId": "https://chapmanganelo.com/manga-vr136437",
    "mangaTitle": "Kaoru On An Emotional Rollercoaster",
    "chapterNum": "",
    "views": "0",
    "mangaImg": "https://avt.mkklcdnv6temp.com/28/f/32-1699608345.jpg",
    "description": "\nnot found... \n"
  },
    {...},
    ...
]
```

### Get Manga Details

| Parameter      | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| `:id` (string) | **mangaId can be found in every response body as can be seen in the above examples** |

```js
fetch("https://gogoanime.consumet.stream/anime-details/naruto")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
{
  "mangaTitle": "Sokushi To Hametsu No Saijaku Majutsushi",
  "mangaImg": "https://avt.mkklcdnv6temp.com/13/n/32-1698117049.jpg",
  "authors": [
    {
      "authorName": "Agyou Ren"
    }
  ],
  "updatedOn": "Nov 13,2023 - 03:42 AM",
  "status": "Ongoing",
  "genres": [
    {
      "genreId": "https://m.manganelo.com/genre-2",
      "genreTitle": "Action"
    },
    {
      "genreId": "https://m.manganelo.com/genre-4",
      "genreTitle": "Adventure"
    },
    {
      "genreId": "https://m.manganelo.com/genre-12",
      "genreTitle": "Fantasy"
    },
    {
      "genreId": "https://m.manganelo.com/genre-14",
      "genreTitle": "Harem"
    },
    {
      "genreId": "https://m.manganelo.com/genre-33",
      "genreTitle": "Shounen"
    }
  ],
  "alternativeTitle": "Instant Death and Destruction of the Weakest Magician ; 即死と破滅の最弱魔術師",
  "synopsis": "Arc and Lean are aspiring adventurers. Upon appraisal, Lean is revealed to be on the level of a hero, with the level cap of 30 and the skills and ! However, Arc has an instant death magic with a level cap of... 1?!With his instant death magic, he'll becomes embroiled in a national crisis that shakes the world!",
  "chapterList": [
    {
      "chapterId": "https://chapmanganelo.com/manga-vb136069/chapter-4",
      "chapterTitle": "Chapter 4: Chapter 4",
      "chapterViews": "33",
      "chapterUploadTime": "Nov 13,23"
    },
        {...},
        ...
    ]
}
```

### Get Manga Genre List

| Parameter         | Description                           |
| ----------------- | ------------------------------------- |
| `:genre` (string) | [Genres are avaliable below](#genres) |

#### Genres
<details>
<summary>Genres list</summary>
</details>
&nbsp;

```js
fetch("http://localhost:3000/genre-list-manga")
  .then((response) => response.json())
  .then((mangalist) => console.log(mangalist));
```

Output >>

```json
[
  {
    "genreId": "https://m.manganelo.com/genre-all-update-latest",
    "genreTitle": "ALL"
  },
  {
    "genreId": "https://m.manganelo.com/genre-2",
    "genreTitle": "Action"
  },
  {
    "genreId": "https://m.manganelo.com/genre-3",
    "genreTitle": "Adult"
  },
  {
    "genreId": "https://m.manganelo.com/genre-4",
    "genreTitle": "Adventure"
  },
  {
    "genreId": "https://m.manganelo.com/genre-6",
    "genreTitle": "Comedy"
  },
  {
    "genreId": "https://m.manganelo.com/genre-7",
    "genreTitle": "Cooking"
  },
  {
    "genreId": "https://m.manganelo.com/genre-9",
    "genreTitle": "Doujinshi"
  },
  {
    "genreId": "https://m.manganelo.com/genre-10",
    "genreTitle": "Drama"
  },
  {
    "genreId": "https://m.manganelo.com/genre-11",
    "genreTitle": "Ecchi"
  },
  {
    "genreId": "https://m.manganelo.com/genre-48",
    "genreTitle": "Erotica"
  },
  {
    "genreId": "https://m.manganelo.com/genre-12",
    "genreTitle": "Fantasy"
  },
  {
    "genreId": "https://m.manganelo.com/genre-13",
    "genreTitle": "Gender bender"
  },
  {
    "genreId": "https://m.manganelo.com/genre-14",
    "genreTitle": "Harem"
  },
  {
    "genreId": "https://m.manganelo.com/genre-15",
    "genreTitle": "Historical"
  },
  {
    "genreId": "https://m.manganelo.com/genre-16",
    "genreTitle": "Horror"
  },
  {
    "genreId": "https://m.manganelo.com/genre-45",
    "genreTitle": "Isekai"
  },
  {
    "genreId": "https://m.manganelo.com/genre-17",
    "genreTitle": "Josei"
  },
  {
    "genreId": "https://m.manganelo.com/genre-44",
    "genreTitle": "Manhua"
  },
  {
    "genreId": "https://m.manganelo.com/genre-43",
    "genreTitle": "Manhwa"
  },
  {
    "genreId": "https://m.manganelo.com/genre-19",
    "genreTitle": "Martial arts"
  },
  {
    "genreId": "https://m.manganelo.com/genre-20",
    "genreTitle": "Mature"
  },
  {
    "genreId": "https://m.manganelo.com/genre-21",
    "genreTitle": "Mecha"
  },
  {
    "genreId": "https://m.manganelo.com/genre-22",
    "genreTitle": "Medical"
  },
  {
    "genreId": "https://m.manganelo.com/genre-24",
    "genreTitle": "Mystery"
  },
  {
    "genreId": "https://m.manganelo.com/genre-25",
    "genreTitle": "One shot"
  },
  {
    "genreId": "https://m.manganelo.com/genre-47",
    "genreTitle": "Pornographic"
  },
  {
    "genreId": "https://m.manganelo.com/genre-26",
    "genreTitle": "Psychological"
  },
  {
    "genreId": "https://m.manganelo.com/genre-27",
    "genreTitle": "Romance"
  },
  {
    "genreId": "https://m.manganelo.com/genre-28",
    "genreTitle": "School life"
  },
  {
    "genreId": "https://m.manganelo.com/genre-29",
    "genreTitle": "Sci fi"
  },
  {
    "genreId": "https://m.manganelo.com/genre-30",
    "genreTitle": "Seinen"
  },
  {
    "genreId": "https://m.manganelo.com/genre-31",
    "genreTitle": "Shoujo"
  },
  {
    "genreId": "https://m.manganelo.com/genre-32",
    "genreTitle": "Shoujo ai"
  },
  {
    "genreId": "https://m.manganelo.com/genre-33",
    "genreTitle": "Shounen"
  },
  {
    "genreId": "https://m.manganelo.com/genre-34",
    "genreTitle": "Shounen ai"
  },
  {
    "genreId": "https://m.manganelo.com/genre-35",
    "genreTitle": "Slice of life"
  },
  {
    "genreId": "https://m.manganelo.com/genre-36",
    "genreTitle": "Smut"
  },
  {
    "genreId": "https://m.manganelo.com/genre-37",
    "genreTitle": "Sports"
  },
  {
    "genreId": "https://m.manganelo.com/genre-38",
    "genreTitle": "Supernatural"
  },
  {
    "genreId": "https://m.manganelo.com/genre-39",
    "genreTitle": "Tragedy"
  },
  {
    "genreId": "https://m.manganelo.com/genre-40",
    "genreTitle": "Webtoons"
  },
  {
    "genreId": "https://m.manganelo.com/genre-41",
    "genreTitle": "Yaoi"
  },
  {
    "genreId": "https://m.manganelo.com/genre-42",
    "genreTitle": "Yuri"
  },
    {...},
    ...
```

### Get Streaming URLs

You might need the referer url to bypass 403 (Forbidden) HTTP code.

| Parameter      | Description                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `:id` (string) | episodeId. **To verify the id of each episode, look at the episodesList property in the [example above](#get-anime-details).** |

#### VIDCDN

```js
fetch("https://gogoanime.consumet.stream/vidcdn/watch/naruto-episode-220")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
{
  "headers": {
    "Referer": "https://gogoplay.io/"
  },
  "data": [
    {
      "file": "https://vidstreamingcdn.com/cdn34/a96411258da4b8a75319906d0cc507f7/EP.18.v0.1644104042.360p.mp4?mac=7GmeilE5nn5L7xGZqxt4YNTnzQ53eEazGha0ZBD15WU%3D&vip=&expiry=1644122389382",
      "label": "360 P",
      "type": "mp4"
    },
    {
      "file": "https://vidstreamingcdn.com/cdn34/a96411258da4b8a75319906d0cc507f7/EP.18.v0.1644104042.480p.mp4?mac=JBKmkO3IViHhGVSsXLekTDjhGICtfkmvXPuW7wEPGuw%3D&vip=&expiry=1644122389440",
      "label": "480 P",
      "type": "mp4"
    },
    ...
  ]
}
```

#### StreamSB

```js
fetch("https://gogoanime.consumet.stream/streamsb/watch/naruto-episode-220")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
{
  "headers": {
    "Referer": "https://sbplay2.xyz/e/84ob4f649y3j"
  },
  "data": [
    {
      "file": "https://delivery412.akamai-cdn-content.com/hls2/01/02251/84ob4f649y3j_,n,h,.urlset/master.m3u8?t=W6w3DBAuEd6Xc3cYAQiEy5rYqeqY84IBs1XeDkhdYxQ&s=1652035632&e=21600&f=11258098&srv=sto066"
    },
    {
      "backup": "https://delivery412.akamai-cdn-content.com/hls2/01/02251/84ob4f649y3j_,n,h,.urlset/master.m3u8?t=W6w3DBAuEd6Xc3cYAQiEy5rYqeqY84IBs1XeDkhdYxQ&s=1652035632&e=21600&f=11258098&srv=sto066"
    }
  ]
}
```

#### ~~Fembed~~ (DEPRECATED)

**Note: This is not available for all anime(s), so you might need to use another provider instead. VIDCDN and StreamSB are the most reliable**

```js
fetch("https://gogoanime.consumet.stream/fembed/watch/spy-x-family-episode-5")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
{
  "headers": {
    "Referer": "https://fembed-hd.com/v/nd27xs2gjrpjle8"
  },
  "data": [
    {
      "file": "https://fvs.io/redirector?token=aHp4NVZDV3FZcStXQlFsOFNFQ3VvQWhRNXlpVlFUNlNaZWFOTTVpb0FWZ3FKMEtRL25qTXQ1UCtqNi9DRENJTXA1dWFVSUJrRkNQMnVnd1FQcXBrYXR4T2F6U2ZZdXIrNkx2bEh5TjBjZEZmd3JQandURzJrMTIyQitjR3dyYTJYYkI4OXZXRVlqd2QwbkFhVVdLYzdHdkZJV2RYMHNTYjpua3lLQ2lrSGw4dXFob0I0WmtoYkxBPT01iA4",
      "label": "480p",
      "type": "mp4"
    },
    {
      "file": "https://fvs.io/redirector?token=Tkc1dHYvcTI5bFFwekcyZjVoWXRsa2VSd1lwOEVtMGNXbStMdUxWWWZNcHJaK3FvazhQMWhKelFmTWNMZEZlQVhLbGt1d3dTMXZiNkQ5WEdjdlhaSEE5dFVyR2diQkgvcjhxcVdkb2haa3B2a2NZNDQ3eW9RZyttU0REVW1kbXMwdDhLQ0RkSFovellYcmxjZHdyVm54NkJtTm5ZRmlncjp0ODdVNG01dDVyeFZMKzBjZ2N6WWVnPT0eCGY",
      "label": "720p",
      "type": "mp4"
    }
  ]
}
```

### ~~Get Download URLs~~ (DEPRECATED)

```js
fetch("https://gogoanime.consumet.stream/download-links/spy-x-family-episode-9")
  .then((response) => response.json())
  .then((links) => console.log(links));
```

Output >>

```json
{
    "headers": {
        "Referer": "https://goload.pro/"
    },
    "sources": [
        {
            "quality": "360p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.360p.mp4?token=EVLs0upbYa_U4gWKhjpMXQ&expires=1654561056&id=187373"
        },
        {
            "quality": "480p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.480p.mp4?token=Zp7sVEbb-JOYFBMEtJ_AzA&expires=1654561056&id=187373"
        },
        {
            "quality": "720p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.720p.mp4?token=vyq9wSLYVq_u8sWtLd7vkA&expires=1654561056&id=187373"
        },
        {
            "quality": "1080p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.1080p.mp4?token=2JKC_e7s5qc7fh1Yso94jA&expires=1654561056&id=187373"
        }
    ]
}
```
you can use the headers.referer to bypass the 403 error and download the file.
Or you can use the [download route](#download) to download the file.

#### Download
**Make sure to add `downloadLink` header to the headers**, which should contain the link received from the response above.

  ```js
  fetch("https://gogoanime.consumet.stream/download", {
    method: "GET",
    headers: {
      "downloadLink": "https://cdn34.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.360p.mp4?token=-Dgjd_aQz6aIQKwY7hZyLQ&expires=1654562557&id=187373",
    }
  })
  ```
Then it will start downloading the file.

### Get Episode Thread
| Parameter         | Description                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `:episodeId`      | episodeId. **To verify the id of each episode, look at the episodesList property in the [example above](#get-anime-details).** |
| `page` (optional) | page number. Default is 0.                                                                                                     |

```js
fetch("https://gogoanime.consumet.stream/thread/spy-x-family-episode-9?page=1")
  .then((response) => response.json())
  .then((thread) => console.log(thread));
```

Output >>
```json
{
    "threadId": "9201260224",
    "currentPage": "1",
    "hasNextPage": true,
    "comments": [
        {
            "editableUntil": "2022-06-11T15:50:14",
            "dislikes": 0,
            "thread": "9201260224",
            "numReports": 0,
            "likes": 75,
            "message": "<p>Like brother, like sister I guess. Neither of them could handle the kiss, but Yuri was the one to suffer for it. Poor guy looked like he needed a trip to the ER, lol</p>",
            "id": "5878499824",  // comment id
            "createdAt": "2022-06-04T15:50:14",
            "author": {
                "username": "Judgment526",
                "about": "",
                "name": "Judgment526",
                "disable3rdPartyTrackers": false,
                "isPowerContributor": false,
                "joinedAt": "2016-03-01T19:52:06",
                "profileUrl": "https://disqus.com/by/Judgment526/",
                "url": "https://myanimelist.net/profile/Judgment526",
                "location": "",
                "isPrivate": false,
                "signedUrl": "https://disq.us/?url=https%3A%2F%2Fmyanimelist.net%2Fprofile%2FJudgment526&key=1_hPDEw0NPhrhEqk1en2nA",
                "isPrimary": true,
                "isAnonymous": false,
                "id": "198796971",
                "avatar": {
                    "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                    "xlarge": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar200.jpg?1649817631"
                    },
                    "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar92.jpg?1649817631",
                    "large": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar92.jpg?1649817631"
                    },
                    "small": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar32.jpg?1649817631"
                    },
                    "isCustom": true
                }
            },
            "media": [],
            "isSpam": false,
            "isDeletedByAuthor": false,
            "isHighlighted": false,
            "hasMore": false,
            "parent": null,
            "isApproved": true,
            "isNewUserNeedsApproval": false,
            "isDeleted": false,
            "isFlagged": false,
            "raw_message": "Like brother, like sister I guess. Neither of them could handle the kiss, but Yuri was the one to suffer for it. Poor guy looked like he needed a trip to the ER, lol",
            "isAtFlagLimit": false,
            "canVote": false,
            "forum": "gogoanimetv",
            "depth": 0, // comment depth. 0 means top level comment (root)
            "points": 75,
            "moderationLabels": [],
            "isEdited": false,
            "sb": false
        },
        {...},
    ]
}
```
The `id`, `parent` and `depth` keys on the comments list can be used to determine the comment structure in your app.

## Contributing
1. [Fork the repository](https://github.com/mrcainv1-3128/Manganelo-API)
2. Clone your fork to your local machine using the following command **(make sure to change `<your_username>` to your GitHub username)**:
```sh
git clone https://github.com/<your-username>/Manganelo-API.git
```
3. Create a new branch: `git checkout -b <new-branch-name>` (e.g. `git checkout -b my-new-branch`)
4. Make your changes.
5. Stage the changes: `git add .`
6. Commit the changes: `git commit -m "My commit message"`
7. Push the changes to GitHub: `git push origin <new-branch-name>` (e.g. `git push origin my-new-branch`)
8. Open a pull request.

## Showcases
Projects using this api or smaller parts of it:
- [Anikatsu](https://github.com/shashankktiwariii/anikatsu) - Free Anime Streaming Website Made with PHP and Gogoanime API. No Video ads (zoro.to clone)
> For other projects that are using this api or smaller parts of it, please reach out to me at my [discord rem#1723](https://discord.gg/775082234507427890) or join the [discord server](https://discord.gg/sP2k8vhjdb) or make a pull request to add it to the list.

### Currently supported sites
<details>
<summary>Manga</summary>

- [Manganelo](https://m.manganelo.com/)


> ### Note:
> **Your feedback and suggestions are very welcome. Please [open an issue](https://github.com/mrcainv1-3128/Manganelo-API/issues/new) or join the [discord server](https://discord.gg/qTPfvMxzNH).**
> This project will still be maintained.

