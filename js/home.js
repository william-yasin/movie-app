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


    getMovies
        .then(data => {
            // console.log(data);
            let html = "";
            for (const movie of data) {
                html += `<p><span style="color: red"><strong>ID:</strong> ${movie.id}</span> <strong>Movie Name:</strong> ${movie.Title} <span><strong>Movie Rating:</strong> ${movie.imdbRating}</span> </p>`
            }
            $("#loading").hide() // hides loading image
            $("#movies").html(html);
        });

    // console.log(getMovies);


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


    //This function allow us to seached movie get from OMDB API to our movies JSON server and prepopulate the data on text box.

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
               console.log(data.length);
               data.forEach( (movie) => {
                   console.log(movie);
                   if (movie.Title.toLowerCase() === $("#movie-search").val().toLowerCase()){
                        console.log("this matches something in the database")
                    } else {
                       const OMDb_Title_Search = `t=${$("#movie-search").val()}`
                       omdbQuery(OMDb_Title_Search)
                           .then(data => postMovie(data))
                            .then(getAndDisplayMovies);
                    }
                })
            })

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
        });

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
            .then(data => console.log(`Success: edited ${JSON.stringify(data)}`))
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
        });



    //This function allow users to delete movie.
    $("#deleteMovie").click((e) => {
        e.preventDefault()
        getMovies.then(deleteMovie)
            .then(data => console.log(`Success: deleted ${JSON.stringify(data)}`))
    });


    const deleteMovie = movie =>
        fetch(`${URL}/${$("#movieId").val()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });


}

