import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import fs from 'node:fs';

const engine = new Liquid({
    extname: '.liquid'
});



const app = new App();

app
    .use(logger())
    .use('/', sirv('src'))
    .listen(7000);

app.get('/', async (req, res) => {
    const movieData = await getMovieDBData('https://api.themoviedb.org/3/trending/all/day?language=en-US');
    const upcomingData = await getMovieDBData('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
    return res.send(renderTemplate('views/index.liquid', { title: 'DownloadMovieGetVirus', movieData, upcomingData }));
});

app.get('/movie/:id/', async (req, res) => {
    const movieId = req.params.id;
    console.log("movieID", movieId)
    const movieDetail = await getMovieDBData('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US');
    return res.send(renderTemplate('views/detail.liquid', { title: 'DownloadMovieGetVirus', movieDetail }));
});


const getMovieDBData = async (url) => {
    const response = await fetch(`${url}&api_key=${process.env.API_KEY}`);
    const resultData = await response.json();
    console.log('resultData', resultData);
    return resultData;
}

const renderTemplate = (template, data) => {
    const templateData = {
        NODE_ENV: process.env.NODE_ENV || 'production',
        ...data
    };

    return engine.renderFileSync(template, templateData);
};
