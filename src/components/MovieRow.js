import React, {useEffect, useState } from 'react';
import '../styles/MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default function MovieRow({ title, items, paramLocal }) {
    const [movieCoverGrey, setMovieCoverGrey] = useState(false);

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

    useEffect(() => {
        const LoadAll = async () => {
            setMovieCoverGrey(await paramLocal.getParamMovieCoverGrey())
        }
        LoadAll();
    }, []);

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
                            <img className={movieCoverGrey === "1" ? "grey" : "color"} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}
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
                        <div id="detail-movie" onClick={() => { setShowMovie(false) }}>
                            <article>
                                <div>
                                    <img src={`https://image.tmdb.org/t/p/w1280${movieData.poster_path}`} alt={movieData.original_title} />

                                </div>
                                <h4>
                                    {movieData.overview}
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
