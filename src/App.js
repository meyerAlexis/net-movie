import React, { useEffect, useState } from "react";
import Tmdb from './Tmdb';

//Style
import './styles/App.css';

//Component
import FeaturedMovie from "./components/FeaturedMovie";
import MovieRow from './components/MovieRow';
import Header from "./components/Header";
import Footer from "./components/Footer";

import LanguageApp from "./class/Language";
import ParamLocal from './class/ParamLocal';

import loader from "./img/loader.gif"

export default () => {

  const [paramLocal, setParamLocal] = useState(new ParamLocal());
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  let lang = new LanguageApp();


  useEffect(() => {
    const LoadAll = async () => {
      try {
        lang.setLang(await paramLocal.getParamLang())
        // getting the full list of movies
        let list = await Tmdb.getHomeList(lang.getLangCode(), lang.getHome(), paramLocal);
        setMovieList(list);

        //getting the Featured
        let originals = await Tmdb.getOriginal(lang.getLangCode(), lang.getHome());
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv', lang.getLangCode());
        setFeaturedData(chosenInfo);

      } catch (error) {

      }
    }
    LoadAll();
  }, []);
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (

    <div className="page" >

      <Header black={blackHeader} text={lang.getHome()} paramLocal={paramLocal} />

      {featuredData !== null ?
        <FeaturedMovie item={featuredData} lang={lang.getHome()} />
        :
        <div className="loading">
          <img src={loader} alt="carregando" />
        </div>
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>


      {movieList.length <= 0 &&
        <div className="loading">
          <img src={loader} alt="carregando" />
        </div>
      }

      <Footer black={blackHeader} textFoot={lang.getFooter()} />
    </div>

  );
}