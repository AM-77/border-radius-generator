const scrap = require("./scrap")
const types = require("./types")
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');

app.use(cors())
dotenv.config()

const BASE_LINK = "https://www.azlyrics.com"
const SEARCH_LINK = "https://search.azlyrics.com/search.php?q="
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    scrap(BASE_LINK, types.HOME)
        .then((result) => {
            if (Object.keys(result).length === 0 && result.constructor === Object)
                res.status(200).json({
                    result: {}
                }).end()
            else
                res.status(200).json(result).end()
        })

})

app.get("/artists/:first_letter", (req, res) => {
    if (req.params.first_letter)
        scrap(`${BASE_LINK}/${req.params.first_letter}.html`, types.LIST_ARTISTS)
        .then((result) => {
            if (Object.keys(result).length === 0 && result.constructor === Object)
                res.status(200).json({
                    result: {}
                }).end()
            else
                res.status(200).json(result).end()
        })
    else
        res.status(200).json({
            error: "Unspecified artist's name."
        }).end()
})

app.get("/artist/:artist_name", (req, res, next) => {
    if (req.params.artist_name)
        scrap(`${BASE_LINK}/${req.params.artist_name.slice(0,1)}/${req.params.artist_name}.html`, types.ARTIST)
        .then((result) => {
            if (Object.keys(result).length === 0 && result.constructor === Object)
                res.status(200).json({
                    result: {}
                }).end()
            else
                res.status(200).json(result).end()
        })
    else
        res.status(200).json({
            error: "Unspecified artist's name."
        }).end()
})

app.get("/lyrics/:artist/:title", (req, res) => {
    if (req.params.artist && req.params.title)
        scrap(`${BASE_LINK}/lyrics/${req.params.artist.toLowerCase()}/${req.params.title.toLowerCase()}.html`, types.LYRICS)
        .then((result) => {
            if (Object.keys(result).length === 0 && result.constructor === Object)
                res.status(200).json({
                    result: {}
                }).end()
            else
                res.status(200).json(result).end()
        })
    else
        res.status(200).json({
            error: "Unspecified artist's name or track's title."
        }).end()
})

app.get("/search/:query", (req, res) => {
    let result = {}
    if (req.params.query)
        scrap(`${SEARCH_LINK}${encodeURI(req.params.query)}&w=albums&p=1`, types.SEARCH_ALBUMS)
        .then((albums_result) => {
            result.albums = albums_result

            scrap(`${SEARCH_LINK}${encodeURI(req.params.query)}&w=artists&p=1`, types.SEARCH_ARTISTS)
                .then((artists_result) => {
                    result.artists = artists_result

                    scrap(`${SEARCH_LINK}${encodeURI(req.params.query)}&w=songs&p=1`, types.SEARCH_TRACKS)
                        .then((tracks_result) => {

                            result.tracks = tracks_result
                            res.status(200).json(result).end()

                        })

                })

        })

    else
        res.redirect("/home")
})

app.listen(PORT, () => console.log(`Letra Server is running on port ${PORT} ...`));
