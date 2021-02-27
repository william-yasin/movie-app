"use strict";
{
    const URL = "https://thoughtful-equatorial-beech.glitch.me/movies"
    const OMDb_URL = "http://www.omdbapi.com/"
    const OMDb_KEY = OMDb_API
    const OMDb_Title_Search = `?t=${$("#movie-search").val()}&${OMDb_KEY}`
    // add some logic to determine "search criteria" and use correct endpoint (i.e ?t=, ?y=, ?type=)


// Function fetch all data from json
    function onLoad() {
        return new Promise(((resolve, reject) => {
            resolve(fetch(URL)
                .then(response => response.json())
                .then(data => console.log(data)));
            // .then($("#loading").hide())

            reject("Error")
        }))
    }

    onLoad().then(console.log);
    //
    // console.log(onLoad(false));


    const getAllMovies = () => fetch(URL)
        .then(response => response.json())
        .then(data => {
            data.map(function (i) {
                return i
            })
            const [{title, rating}] = data;
            document.write(`<h1>${title}: ${rating}</h1>`);
        })
        .catch(console.error);

    console.log(getAllMovies());
    // getAllMovies()
    //     .then();
    getAllMovies();

// Retrieve movie by id (i= with OMDb)
    const getMovieById = id => fetch(`${URL}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    getMovieById(2).then(movie => {
        const [{rating, title}] = movie
        document.write(`<h1>${title}: ${rating}</h1>`);
    });

    // Retrieve movie by title (t= with OMDb)
    const getMovieByTitle = id => fetch(`${URL}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    getMovieByTitle(2).then(movie => {
        const [{rating, title}] = movie
        document.write(`<h1>${title}: ${rating}</h1>`);
    });

    // Retrieve movie by rating
    const getMovieByRating = id => fetch(`${URL}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    getMovieByRating(2).then(movie => {
        const [{rating, title}] = movie
        document.write(`<h1>${title}: ${rating}</h1>`);
    });

    const editMovie = movie => fetch(`${URL}/${movie.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Movie edit successful ${JSON.stringify(data)}`)
        })
        .catch(console.error);

    const addMovie = movie => fetch(`${URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Movie addition success ${JSON.stringify(movie)}`);
            return movie.id;
        })
        .catch(console.error);








}

