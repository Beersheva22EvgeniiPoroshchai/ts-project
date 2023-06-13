export default class MoviesPersistService {

#key;

    constructor(key){
        this.#key = key;
    }
   
    async getAllMovies(page=1) {
        const allMov = await fetch(this.#createUrl(page));
        return allMov.json();
    
    }
    
    #createUrl(page) {
        return `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${this.#key}`
    }

    async getMovieById (id){
        const urlForPartMovie = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.#key}`;
        const allMov = await fetch(urlForPartMovie);
        return await allMov.json();
    }


    async getGenres() {
        const urlForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.#key}`;
        const genres = await fetch (urlForGenres);
        return await genres.json();
    }

    async getFilteredMovies (obj, page = 1) {
        const urlFilteredMovies = `https://api.themoviedb.org/3/discover/movie?&with_genres=${obj.id}&page=${page}&api_key=${this.#key}`;
        const filteredMovies = await fetch (urlFilteredMovies);
        return await filteredMovies.json();
    }


}