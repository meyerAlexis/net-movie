import React, { useEffect, useState } from 'react';
import '../styles/MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import movie1 from "../movie/sample-5s.mp4";
import movie2 from "../movie/sample-10s.mp4";
import movie3 from "../movie/sample-15s.mp4";


export default function MovieRow({ title, items, paramLocal, text }) {
    const [choiceMovie, setChoiceMovie] = useState(movie1);
    const [movieCoverGrey, setMovieCoverGrey] = useState("0");

    const [showMovie, setShowMovie] = useState(false);
    const [movieData, setMovieData] = useState();
    const [scrollx, setScrollx] = useState(0);
    const handleLeftArrow = () => {
        let x = scrollx + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollx(x);
    }
    const handleRightArrow = () => {
        let x = scrollx - Math.round(window.innerWidth / 2);
        let listw = items.results.length * 150;
        if ((window.innerWidth - listw) > x) {
            x = (window.innerWidth - listw) - 60;

        }
        setScrollx(x);
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        //Select random movie
        let tabMovie = [
            movie1, movie2, movie3
        ]
        setChoiceMovie(tabMovie[getRandomInt(3)]);

        const LoadAll = async () => {
            setMovieCoverGrey(await paramLocal.getParamMovieCoverGrey());
        }
        LoadAll();
    }, []);

    useEffect(() => {

    }, [window.innerWidth]);
    return (
        <div className="movieRow" >
            <h2>{title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className='movieRow--right' onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollx,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img className={movieCoverGrey === "1" ? "grey" : "color"} key={item.key}
                                title={item.title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}
                                onClick={() => {
                                    if (movieData !== item) {
                                        setShowMovie(true);
                                        setMovieData(item);
                                    } else {
                                        setShowMovie(false);
                                        setMovieData({});
                                    }
                                }} />
                        </div>
                    ))}

                    {showMovie ?
                        <div id="detail-movie" >
                            <article>

                                <IconButton
                                    className='closeDetail'
                                    onClick={() => { setShowMovie(false) }}
                                    sx={{
                                        color: "white",
                                        "&:hover": {
                                            cursor: "pointer",
                                            opacity: "0.8",
                                            color: " #ff0000",
                                            cursor: "default"
                                        }
                                    }}>
                                    <HighlightOffIcon sx={{ fontSize: "40px" }} />
                                </IconButton>

                                <video title={movieData.title} width="75%" height="55%" className='video' controls poster={`https://image.tmdb.org/t/p/w1280${movieData.poster_path}`}>
                                    <PlayCircleIcon />
                                    <source src={choiceMovie} type="video/mp4" />
                                    {text.browerKo}
                                </video>

                                <h4>
                                    {movieData.overview !== "" ? movieData.overview : "Description de la vidéo"}
                                </h4>

                            </article>
                        </div>

                        : <></>
                    }


                </div>
            </div>
        </div>
    );
}
