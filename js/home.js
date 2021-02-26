"use strict";
{
    const url = "https://thoughtful-equatorial-beech.glitch.me/movies"

//Function fetch all data from json
    const isLoading = true;
    function onLoad(isLoading) {
        return new Promise(((resolve, reject) => {
            if (Promise === "pending"){
                resolve("Loading")
            } else {
                reject("Error")
            }
        }))
    }
    onLoad().then(console.log);
    console.log(onLoad(true));




}