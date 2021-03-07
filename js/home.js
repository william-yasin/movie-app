"use strict";
{
    const URL = "https://thoughtful-equatorial-beech.glitch.me/movies"
    const OMDb_URL = "http://www.omdbapi.com/?"
    const OMDb_KEY = OMDb_API
    // const OMDb_Title_Search = `t=${$("#movie-search").keyup().val()}`
    // add some logic to determine "search criteria" and use correct endpoint (i.e ?t=, ?y=, ?type=)


    // This Function fetch all Movies and rendering them to HTML.
    const getMovies = fetch(URL)
        .then(response => response.json())
        .catch(console.error);


    const movieRendering = () =>
        fetch(URL)
            .then(response => response.json())
            .then(data => {
            // console.log(data);
            let html = "";
            for (const movie of data) {
                html+= `<div class="card mb-2 mr-1 ml-1 mt-2" style="width: 18rem;">`
                html += `<img src="${movie.Poster}" class="card-img-top" alt="moviePoster" style="height: 22em; width:100% ">`
                html += `<div class="card-body">`
                html += `<h5 id="movieCardTitle" class="card-title"><span>ID: ${movie.id} </span>${movie.Title}</h5>`
                html += `<p class="card-text"> ${movie.Plot}</p>`
                html += `</div>`
                html += `<ul class="list-group list-group-flush">`
                html += `<li class="list-group-item">${movie.imdbRating}</li>`
                html += `<li class="list-group-item">${movie.Genre}</li>`
                html += `</ul>`
                html += `</div>`
            }
            $("#loading").hide() // hides loading image
            $("#movies").html(html);
        });

    console.log(movieRendering());


    //This Function allow users to ADD new movies.
    $("#addMovie").click(() => {
        const movieTitle = $("#movieTitle").val();
        const movieRating = $("#movieRating").val();
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: movieTitle,
                imdbRating: movieRating
            })
        })
            .then(console.log(JSON.stringify({
                Title: movieTitle,
                imdbRating: movieRating
            })))
            .catch(console.error)
    });


    //This function allow us to search movie get from OMDB API to our movies JSON server and prepopulate the data on text box.

    // $("#movie-search-btn").click((e) => {
    //     e.preventDefault() //we dont want to submit button default value
    //     const OMDb_Title_Search = `t=${$("#movie-search").keyup().val()}`
    //     omdbQuery(OMDb_Title_Search)
    //         .then(data => postMovie(data)
    //             .then(getAndDisplayMovies));
    // });


    const checkDuplicateAndPost = () =>
        getMovies
            .then(data => {
                let isInDB = false;
                console.log(data.length);
                data.forEach((movie) => {
                    console.log(movie);
                    if (movie.Title.toLowerCase() === $("#movie-search").val().toLowerCase()) {
                        isInDB = true;
                        console.log("this matches something in the database");
                    }
                });
                if (!isInDB) {
                    const OMDb_Title_Search = `t=${$("#movie-search").val()}`
                    omdbQuery(OMDb_Title_Search)
                        .then(data => postMovie(data))
                        .then(getAndDisplayMovies)
                        .then(movieRendering);
                }

            });

    $("#movie-search-btn").click(checkDuplicateAndPost);

    const omdbQuery = (title) =>
        fetch(`${OMDb_URL}${title}${OMDb_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });

    const postMovie = (data) =>
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(movieRendering);

    const getAndDisplayMovies = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const movieTitleSearch = $("#movie-search").val();
                const movieTitleEdit = $("#movieTitleEdit");
                const movieRatingEdit = $("#movieRatingEdit");
                const movieId = $("#movieId")
                let html = "";
                for (let movie of data) {
                    if (movieTitleSearch.toLowerCase() === movie.Title.toLowerCase()) {
                        html += movieTitleEdit.val(movie.Title);
                        html += movieRatingEdit.val(movie.imdbRating)
                        html += movieId.val(movie.id)
                    }
                }
                movieTitleEdit.html(html);
            })
        // .then(data => {
        //     console.log(data);
        //     let html = "";
        //     for (const movie of data) {
        //         html += `<p><span><strong>ID:</strong> ${movie.id}</span> <strong>Movie Name:</strong> ${movie.Title} <span><strong>Movie Rating:</strong> ${movie.imdbRating}</span> </p>`
        //     }
        //     $("#movies").html(html);
        // })
    }

    //This function allow users to edit movie.
    $("#editMovie").click((e) => {
        e.preventDefault()
        getMovies.then(editMovie)
            // .then(data => console.log(`Success: edited ${JSON.stringify(data)}`))
            .then(movieRendering);
    });


    const editMovie = movie =>
        fetch(`${URL}/${$("#movieId").val()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: $("#movieTitleEdit").val(),
                imdbRating: $("#movieRatingEdit").val()
            })
        })



    //This function allow users to delete movie.
    $("#deleteMovie").click((e) => {
        e.preventDefault()
        getMovies.then(deleteMovie)
            .then(data => console.log(`Success: deleted ${JSON.stringify(data)}`))
            .then(movieRendering)
    });


    const deleteMovie = movie =>
        fetch(`${URL}/${$("#movieId").val()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });




}

