import React, {useEffect} from 'react';
import '../styles/featuredMovie.css';

export default function FeaturedMovie({ item, lang }) {

    let firstdate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }
    let description = item.overview;

    useEffect(() => {
        try {
            if (description.length > 200) {
                description = description.substring(0, 200) + '...';
            }
        } catch (error) {

        }

    }, []);
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className='featured--name'>{item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{item.vote_average} {lang.featuredPoints}</div>
                        <div className='featured--year'>{firstdate.getFullYear()}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} {lang.featuredSeasons}{item.number_of_seasons !== 1 ? 's' : ''}</div>
                        <div className='featured--description'>{description}</div>
                        <div className='featured--buttons'>
                            <a href={`/wath/${item.id}`} className='featured--watchbutton'>▶ {lang.featuredWatch}</a>
                            <a href={`/list/add/${item.id}`} className='featured--mylistbutton'>+ {lang.featuredMylist}</a>
                        </div>
                        <div className='featured--genres'><strong>{lang.featuredGenres}: </strong>{genres.join(', ')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}