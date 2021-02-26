"use strict";
{
    const url = "https://thoughtful-equatorial-beech.glitch.me/movies"

// Function fetch all data from json
    function onLoad() {
        return new Promise(((resolve, reject) => {
            resolve(fetch(url)
                .then(response => response.json())
                .then(data => console.log(data)));
                // .then($("#loading").hide())

            reject("Error")
        }))
    }

    onLoad().then(console.log);
    //
    // console.log(onLoad(false));


    const getAllMovies = () => fetch(url)
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


// const getMovie = id => fetch(`${url}/${id}`)
//     .then(response => response.json())
//     .catch(console.error);
//
// getMovie(2).then(movie => {
//     const [{rating, title}] = movie
//     document.write(`<h1>${title}: ${rating}</h1>`);
// })










}

