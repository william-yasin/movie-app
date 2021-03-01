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

    const getMovie = new Promise((resolve, reject) => {
        resolve(fetch(URL))
            .then(response => response.json());
        reject("Error")
            .catch(console.error);
    })

    getMovie.then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            for (const movie of data) {
                html += `<p>${movie.title} <span> ${movie.rating}</span></p>`;
            }
            $("#movies").html(html);
        })
    console.log(getMovie);


    //Allow users to add new movies

    $("#addMovie").click(() => {
        const movieTitle = $("#movieTitle").val();
        const movieRating = $("#movieRating").val();
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: movieTitle,
                rating: movieRating
            })
        })
            .then(console.log(JSON.stringify({
                title: movieTitle,
                rating: movieRating
            })))
            .catch(console.error)
    });

    //Allow users to edit existing movies

    $("#movie-search-btn").click(() => {
        // let movieTitleSearch = $("#movie-search").val();
        // let movieRating = $("#movieRatingEdit").val();
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                let movieTitleSearch = $("#movie-search").val();
                let movieTitleEdit = $("#movieTitleEdit");
                let movieRating = $("#movieRatingEdit");
                let html = "";

                for (let movie of data) {
                    if (movieTitleSearch.toLowerCase() === movie.title.toLowerCase()) {
                        console.log(movieTitleSearch);
                        console.log(movie);
                        html += movieTitleEdit.text(movieTitleSearch);
                    }
                }
                movieTitleEdit.html(html);
            })
        // .then(data => {
        //     console.log(`Successfully edited: ${JSON.stringify(data)}`);
        // });
    });


    // $("#movieSearch").click(() => {
    //     let movieTitle = $("#movieTitleEdit").val();
    //     let movieRating = $("#movieRatingEdit").val();
    //     fetch(URL, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             title: movieTitle,
    //             rating: movieRating
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             let movieTitleEdit = $("#movieTitleEdit");
    //             let movieRating = $("#movieRatingEdit").text();
    //             let movieTitleSearch = $("#movie-search").val();
    //             let html = "";
    //             for (let movie of data) {
    //                 if (movieTitleSearch.toLowerCase() === movie.title) {
    //                     console.log(movieTitleSearch);
    //                     console.log(movie.title);
    //                     html += movieTitleEdit.text(movieTitleSearch);
    //                 }
    //             }
    //             movieTitle.html(html);
    //         })
    //     // .then(data => {
    //     //     console.log(`Successfully edited: ${JSON.stringify(data)}`);
    //     // });
    // });

}

