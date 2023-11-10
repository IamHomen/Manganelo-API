<p align="center">
  <a href="https://github.com/riimuru/gogoanime">
    <img src="https://m.manganelo.com/themes/hm/images/logo.png" alt="Logo" width="85" height="85">
  </a>

  <h3 align="center">Manganelo API</h3>

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
  - [Get Anime Movies](#get-manga-search)
  - [Get Top Airing](#get-top-airing)
  - [Get Anime Genres](#get-anime-genres)
    - [Genres](#genres)
  - [Get Anime Details](#get-anime-details)
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
    "animeTitle": "Naruto",
    "type": "TV Series",
    "releasedDate": "2002",
    "status": "Completed",
    "genres": ["Action", "Comedy", "Martial Arts", "Shounen", "Super Power"],
    "otherNames": "ナルト",
    "synopsis": "...",
    "animeImg": "https://gogocdn.net/images/anime/N/naruto.jpg",
    "episodesAvaliable": "220",
    "episodesList": [
        {
            "episodeId": "naruto-episode-220",
            "episodeNum": "220",
            "episodeUrl": "https://www1.gogoanime.cm//naruto-episode-220"
        },
        {...},
        ...
    ]
}
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
1. [Fork the repository](https://github.com/riimuru/gogoanime)
2. Clone your fork to your local machine using the following command **(make sure to change `<your_username>` to your GitHub username)**:
```sh
git clone https://github.com/<your-username>/gogoanime.git
```
3. Create a new branch: `git checkout -b <new-branch-name>` (e.g. `git checkout -b my-new-branch`)
4. Make your changes.
5. Stage the changes: `git add .`
6. Commit the changes: `git commit -m "My commit message"`
7. Push the changes to GitHub: `git push origin <new-branch-name>` (e.g. `git push origin my-new-branch`)
8. Open a pull request.

## Showcases
Projects using this api or smaller parts of it:
- [Animeflix](https://github.com/chirag-droid/animeflix) - A streaming service made with NextJs and TailwindCSS. It lets you search, watch animes without any ads with a beautiful ui. It can be self hosted or deployed online.

- [miru](https://github.com/Dank-del/miru) - A cross platform anime streaming app made using flutter.

- [AnimeEZ](https://github.com/dhvitOP/AnimeEZ) - A Website Made using html and express as its server for streaming anime without any ads.

- [Gogoanime Clone](https://github.com/shashankktiwariii/gogoanime-clone) - PHP clone of GogoAnime Website (No Video Ads) | Anime Website

- [Anikatsu](https://github.com/shashankktiwariii/anikatsu) - Free Anime Streaming Website Made with PHP and Gogoanime API. No Video ads (zoro.to clone)
> For other projects that are using this api or smaller parts of it, please reach out to me at my [discord rem#1723](https://discord.gg/775082234507427890) or join the [discord server](https://discord.gg/sP2k8vhjdb) or make a pull request to add it to the list.

## NEW API (v2) 🎉
I have made a new [api](https://github.com/consumet/consumet-api) and a [nodejs library](https://github.com/consumet/consumet.ts) (called consumet) for developers to use in their projects. This new api/library is able to support any piracy site that is for anime, manga, books, light novels, movie/tvshows, comics, and even personal meta providers like mapping anilist -> gogoanime -> kitsu, or tmbd -> movie-database.

### Currently supported sites
<details>
<summary>Anime</summary>

- [9Anime](https://9anime.to/)
- [AniMixPlay](https://animixplay.to)
- [AnimeFox](https://animefox.tv)
- [AnimePahe](https://animepahe.com/)
- [Enime](https://enime.moe)
- [Gogoanime](https://gogoanime.lu/)
- [Zoro.to](https://zoro.to/)

</details>
<details>
<summary>Manga</summary>

- [MangaDex](https://mangadex.org/)
- [MangaHere](https://mangahere.cc/)
- [MangaKakalot](https://mangakakalot.com/)
</details>

<details>
<summary>Books</summary>

- [Libgen](https://libgen.rs)
</details>

<details>
<summary>Light Novels</summary>

- [Read Light Novels](https://readlightnovels.net/)
</details>

<details>
<summary>Movie/TV Shows</summary>

- [FlixHQ](https://flixhq.to/)
</details>

<details>
<summary>Comics</summary>

- [GetComics](https://getcomics.info/)
</details>

<details>
<summary>Personal Meta Providers</summary>

- [Anilist](https://anilist.co/) - Mapping anilist -> (piracy anime source) -> kitsu (for episode images, and description)
</details>

### How to get started?
- [Rest API Documentation](https://docs.consumet.org/), [Rest API Repository](https://github.com/consumet/consumet-api#table-of-contents)
- [NodeJS Package Documentation](https://github.com/consumet/consumet.ts#readme): where most of the development is happening.

Join the [discord server](https://discord.gg/sP2k8vhjdb) for support and help.

<a href="https://discord.gg/qTPfvMxzNH">
   <img src="https://discordapp.com/api/guilds/987492554486452315/widget.png?style=banner2">
</a>
<br />
<br />


> ### Note:
> **Your feedback and suggestions are very welcome. Please [open an issue](https://github.com/consumet/consumet-api/issues/new/choose) or join the [discord server](https://discord.gg/qTPfvMxzNH).**
> This project will still be maintained.

