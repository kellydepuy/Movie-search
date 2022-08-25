const baseUrl = "http://www.omdbapi.com/?"
const apiKey = "&apikey=b934e534"
let title = ""
let moviesIdArray = []
let moviesData = []
let currentWatchlist = []


function handleSearchClick(e) {
    e.preventDefault()
    title = document.getElementById("search-bar").value
    fetch(`${baseUrl}s=${title}${apiKey}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.Search.length; i++) {
                moviesIdArray.push(data.Search[i].imdbID)
            }
            fetchById()
            setTimeout(createMovieCardHtml, 800)
            console.log(moviesData)
        })
    }

function fetchById() {
    moviesIdArray.map((movie) => {
        fetch(`${baseUrl}i=${movie}${apiKey}`)
            .then(res => res.json())
            .then(data => moviesData.push(data))
    })
    }

function createMovieCardHtml() {
    const movieCardsHtml = moviesData.map((movie) => {
        return (`<div class="card">
        <img class="movie-poster" src=${movie.Poster} />
        <div class="text-content">
            <div class="title-rating">
                <h2>${movie.Title}</h2>
                <img class="star" src="./star.png">
                <p>${movie.imdbRating}</p>
            </div>
            <div class="length-genre-watchlist">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <button class="add-to-watchlist" id=${movie.imdbID}>Add to Watchlist</button>
            </div>
            <div class="plot">
            <p>${movie.Plot}</p>
            </div>
        </div>
        </div>` )}
    ).join()
    document.getElementById("search-results-container").innerHTML = movieCardsHtml
}

function handleAddToWatchlist(movieId) {
    console.log("button working")
    let watchlistMovieCardInfo = {}
    moviesData.map((movie) => {if (movie.imdbID === movieId) {watchlistMovieCardInfo = movie}})
    currentWatchlist = localStorage.getItem(JSON.parse(watchlist))
    currentWatchlist.push(watchlistMovieCardInfo)
    localStorage.setItem(JSON.stringify(currentWatchlist))

    renderWatchlist()
}

function renderWatchlist() {
const list = currentWatchlist.map((movie) => {
    return (`<div class="card">
    <img class="movie-poster" src=${movie.Poster} />
    <div class="text-content">
        <div class="title-rating">
            <h2>${movie.Title}</h2>
            <img class="star" src="./star.png">
            <p>${movie.imdbRating}</p>
        </div>
        <div class="length-genre-watchlist">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <button class="add-to-watchlist" id=${movie.imdbID + "remove"}>Remove</button>
        </div>
        <div class="plot">
        <p>${movie.Plot}</p>
        </div>
    </div>
    </div>` )}
).join()

document.getElementById("watchlist-container").innerHTML = list
}


//***** Event Listeners *****//
document.getElementById("form").addEventListener("submit", handleSearchClick)

document.getElementById(moviesIdArray[0]).addEventListener("click", (e) => console.log(e.target.id))
document.getElementById(`${moviesIdArray[1]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[2]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[3]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[4]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[5]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[6]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[7]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[8]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))
document.getElementById(`${moviesIdArray[9]}`).addEventListener("click", (e) => handleAddToWatchlist(e.target.id))


