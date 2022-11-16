const API_KEY = 'c72098891666b7528e61d504db42a1bf';
const API_BASE = 'https://api.themoviedb.org/3';


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    return await req.json();
}
export default class Tmdb {

    /**
     * Get movie with category original only
     * @param {*} langCode 
     * @param {*} text 
     * @returns 
     */
    getOriginal = async (langCode, text) => {
        return [
            {
                slug: 'originals',
                title: text.homeOriginals,
                items: await basicFetch(`/discover/tv?with_network=213&language=${langCode}&api_key=${API_KEY}`)
            }
        ];

    };

    /**
     * 
     * @param {*} langCode Code language of param site
     * @param {*} text Text of lang site
     * @returns 
     */
    getHomeList =  async (langCode, text, paramLocal) => {

        let paramLocalCatMovie = JSON.parse(await paramLocal.getParamCatMovie());
        let listHomeCat = [];

        try {
            if (  paramLocalCatMovie === null ) {
                paramLocalCatMovie = [
                    "1","1","1","1","1","1","1"
                ]
            }
            
            if (paramLocalCatMovie[0] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'originals',
                    title: text.homeOriginals,
                    items: await basicFetch(`/discover/tv?with_network=213&language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[1] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'trending',
                    title: text.homeTrending,
                    items: await basicFetch(`/trending/all/week?language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[2] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'toprated',
                    title: text.homeToprated,
                    items: await basicFetch(`/movie/top_rated?language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[3] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'action',
                    title: text.homeAction,
                    items: await basicFetch(`/discover/movie?with_genres=28&language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[4] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'comedy',
                    title: text.homeComedy,
                    items: await basicFetch(`/discover/movie?with_genres=35&language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[5] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'horror',
                    title: text.homeHorror,
                    items: await basicFetch(`/discover/movie?with_genres=27&language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[6] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'romance',
                    title: text.homeRomance,
                    items: await basicFetch(`/discover/movie?with_genres=10749&language=${langCode}&api_key=${API_KEY}`)
                }]
            }
            if (paramLocalCatMovie[7] === "1") {
                listHomeCat = [...listHomeCat, {
                    slug: 'documentary',
                    title: text.homeDocumentary,
                    items: await basicFetch(`/discover/movie?with_genres=99&language=${langCode}&api_key=${API_KEY}`)
                }]
            }


        } catch (error) {

            listHomeCat = [...listHomeCat, {
                slug: 'originals',
                title: text.homeOriginals,
                items: await basicFetch(`/discover/tv?with_network=213&language=${langCode}&api_key=${API_KEY}`)
            }]
        }

        return listHomeCat

    };

    getMovieInfo = async (movieId, type, langCode) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=${langCode}&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=${langCode}&api_key=${API_KEY}`)
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;

    }

}
