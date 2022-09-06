const baseUrl = "http://www.omdbapi.com/?"
const apiKey = "&apikey=b934e534"
let title = ""
let moviesIdArray = []
let moviesData = []
let movieCardsHtml = []

document.getElementById("form").addEventListener("submit", handleSearchClick)

/* This function is called when the user clicks the search button. It stores the searched title in a variable and then fetches
the results from the imdb api. If no results are returned, the user is informed adn the background icon is removed. Otherwise,
a for loop goes over the data and pushes each movie's ID to an array. Because the data doesn't contain all the information needed, this function
calls fetchbyId to get more information. After a timeout, which allows the data collection to complete, createMovieCardHTML is
called to render the results to the page, and the input is reset for the user's next search*/

function handleSearchClick(e) {
    e.preventDefault()
    moviesData = []
    title = document.getElementById("search-bar").value
    fetch(`${baseUrl}s=${title}${apiKey}`)
        .then(res => res.json())
        .then(data => {if (data.Error){
            document.getElementById("search-results-container").innerHTML = `<p class="missing white center">Sorry! There are no matching movies.</p>`
            document.querySelector("main").classList.remove("main-movie-icon")
        } else {
            for (let i = 0; i < data.Search.length; i++) {
                moviesIdArray.push(data.Search[i].imdbID)
            }
            fetchById()
            setTimeout(createMovieCardHtml, 500)
            document.getElementById("form").reset()
        }})
    }

/* This function fetches all the data needed to create the movie cards and pushes it to an array. */

function fetchById() {
    moviesIdArray.map(movie => {
        fetch(`${baseUrl}i=${movie}${apiKey}`)
            .then(res => res.json())
            .then(data => moviesData.push(data))
    })
    }

/* This function removed the background image from the main page, and then it maps over the data to create the html
for each movie card. It then adds the html to the page so the cards can be displayed, and add and event listener
to the add to watch list button in each card. It finishes by resetting all the variable in preparation for the
next search.*/    

function createMovieCardHtml() {
    document.querySelector("main").classList.remove("main-movie-icon")
    movieCardsHtml = moviesData.map((movie) => {
        return (`<div class="card">
            <img class="movie-poster" src=${movie.Poster} />
            <div class="text-content">
                <div class="rating">
                    <h2>${movie.Title}</h2>
                    <img class="star" src="./icons/star.png">
                    <p>${movie.imdbRating}</p>
                </div>
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <button class="card-btn add-to-watchlist" id=${movie.imdbID}>Add to Watchlist</button>
                <div class="plot">
                    <p>${movie.Plot}</p>
                </div>
            </div>
        </div>`)}).join("")
    document.getElementById("search-results-container").innerHTML = movieCardsHtml
    document.querySelectorAll(".add-to-watchlist").forEach(button => button.addEventListener("click", handleAddToWatchlist))
    title = ""
    moviesIdArray = []
    movieCardsHtml = []
}

/* This function is called when the add to watch list button is pressed. It takes the data required for constructing
the card and saves it in an object to local storage.*/

function handleAddToWatchlist(event) {
    moviesData.map(movie => {
        if (movie.imdbID === event.target.id) {
        const movieObj = {
            Title: movie.Title,
            Poster: movie.Poster,
            imdbRating: movie.imdbRating, 
            Runtime: movie.Runtime,
            Genre: movie.Genre,
            imdbID: movie.imdbID,
            Plot: movie.Plot
        }
        localStorage.setItem(movie.imdbID, JSON.stringify(movieObj))
    }})
}



// function createMovieCardHtml() {
//     document.querySelector("main").classList.remove("main-movie-icon")
//     movieCardsHtml = moviesData.map((movie) => {
//         return (`<div class="card">
//         <img class="movie-poster" src=${movie.Poster} />
//         <div class="text-content">
//             <div class="title-rating">
//                 <h2>${movie.Title}</h2>
//                 <img class="star" src="./icons/star.png">
//                 <p>${movie.imdbRating}</p>
//             </div>
//             <div class="length-genre-watchlist">
//                 <p>${movie.Runtime}</p>
//                 <p>${movie.Genre}</p>
//                 <button class="card-btn add-to-watchlist" id=${movie.imdbID}>Add to Watchlist</button>
//             </div>
//             <div class="plot">
//             <p>${movie.Plot}</p>
//             </div>
//         </div>
//         </div>` )}
//     ).join()
//     document.getElementById("search-results-container").innerHTML = movieCardsHtml
//     document.querySelectorAll(".add-to-watchlist").forEach(button => button.addEventListener("click", handleAddToWatchlist))
//     title = ""
//     moviesIdArray = []
//     movieCardsHtml = []
// }


