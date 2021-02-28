"use strict";
{
    const URL = "https://thoughtful-equatorial-beech.glitch.me/movies"
    // const OMDb_URL = "http://www.omdbapi.com/"
    // const OMDb_KEY = OMDb_API
    // const OMDb_Title_Search = `?t=${$("#movie-search").val()}&${OMDb_KEY}`
    // add some logic to determine "search criteria" and use correct endpoint (i.e ?t=, ?y=, ?type=)


// Function fetch all data from json
//     function onLoad() {
//         return new Promise(((resolve, reject) => {
//             resolve(fetch(URL)
//                 .then(response => response.json())
//                 .then(data => console.log(data)));
//             reject("Error")
//         }))
//     }
//
//     onLoad().then(console.log);
//
//     const getAllMovies = () => fetch(URL)
//         .then(response => response.json())
//         .then(data => {
//             data.map(function (i) {
//                 return i
//             })
//             const [{title, rating}] = data;
//             document.write(`<h1>${title}: ${rating}</h1>`);
//         })
//         .catch(console.error);
//
//     console.log(getAllMovies());
//     // getAllMovies()
//     //     .then();
//     getAllMovies();
//
// // Retrieve movie by id (i= with OMDb)
//     const getMovieById = id => fetch(`${URL}/${id}`)
//         .then(response => response.json())
//         .catch(console.error);
//
//     getMovieById(2).then(movie => {
//         const [{rating, title}] = movie
//         document.write(`<h1>${title}: ${rating}</h1>`);
//     });
//
//     // Retrieve movie by title (t= with OMDb)
//     const getMovieByTitle = id => fetch(`${URL}/${id}`)
//         .then(response => response.json())
//         .catch(console.error);
//
//     getMovieByTitle(2).then(movie => {
//         const [{rating, title}] = movie
//         document.write(`<h1>${title}: ${rating}</h1>`);
//     });
//
//     // Retrieve movie by rating
//     const getMovieByRating = id => fetch(`${URL}/${id}`)
//         .then(response => response.json())
//         .catch(console.error);
//
//     getMovieByRating(2).then(movie => {
//         const [{rating, title}] = movie
//         document.write(`<h1>${title}: ${rating}</h1>`);
//     });
//
//     const editMovie = movie => fetch(`${URL}/${movie.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(movie)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(`Movie edit successful ${JSON.stringify(data)}`)
//         })
//         .catch(console.error);
//
//     const addMovie = movie => fetch(`${URL}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(movie)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(`Movie addition success ${JSON.stringify(movie)}`);
//             return movie.id;
//         })
//         .catch(console.error);


//Started Here
    //This Function fetch all Movies

    const getMovie = new Promise(((resolve, reject) => {
      resolve(fetch(URL));
      reject("Error")
    }))
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(console.error)

    //Allow users to add new movies

    const createMovie = movie => $("#addMovie").click(() =>{
        // const movieTitle = $("#movieTitle").val();
        // const movieRating = $("#movieRating").val();
        // const movieId = $("#movieId").val();
        fetch(URL, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie
                // {title: movieTitle,
                // rating: movieRating
                // id: movieId}
            )
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Successfully added ${JSON.stringify(data)}`);
            });
        });

    const movieTitle = $("#movieTitle").keyup().val();
    console.log(movieTitle);
    const movieRating = $("#movieRating").val();
    createMovie({title: movieTitle , rating:movieRating})


    //Allow users to edit existing movies

    const editMovie = movie => $("#editMovie").click (() => {
        const editMovieInput = $("#editMovieInput").val();
        const movieTitle = $("#movieTitle").text();
        const movieRating = $("#movieRating").text();
        // const movieId = $("#movieId").text();
        fetch(`${URL}/${editMovieInput}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: movieTitle,
                rating: movieRating
                // id: movieId
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Successfully edited: ${JSON.stringify(data)}`);
            });
    });







}

