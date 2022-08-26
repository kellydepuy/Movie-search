const baseUrl = "http://www.omdbapi.com/?"
const apiKey = "&apikey=b934e534"
let title = ""
let moviesIdArray = []
let moviesData = []
let currentWatchlist = []
let movieCardsHtml = []


function handleSearchClick(e) {
    e.preventDefault()
    title = document.getElementById("search-bar").value
    fetch(`${baseUrl}s=${title}${apiKey}`)
        .then(res => res.json())
        .then(data => {console.log(data); if (data.Error){
            document.getElementById("search-results-container").innerHTML = `<p class="missing white center">Sorry! There are no matching movies.</p>`
            document.querySelector("main").classList.remove("main-movie-icon")
        } else {
            for (let i = 0; i < data.Search.length; i++) {
                moviesIdArray.push(data.Search[i].imdbID)
            }
            fetchById()
            setTimeout(createMovieCardHtml, 500)
            document.getElementById("form").reset()
            createMovieCardHtml()
        }})
    }

function fetchById() {
    moviesIdArray.map((movie) => {
        fetch(`${baseUrl}i=${movie}${apiKey}`)
            .then(res => res.json())
            .then(data => moviesData.push(data))
    })
    }

function createMovieCardHtml() {
    document.querySelector("main").classList.remove("main-movie-icon")
    movieCardsHtml = moviesData.map((movie) => {
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
                <button class="card-btn add-to-watchlist" id=${movie.imdbID}>Add to Watchlist</button>
            </div>
            <div class="plot">
            <p>${movie.Plot}</p>
            </div>
        </div>
        </div>` )}
    ).join()
    document.getElementById("search-results-container").innerHTML = movieCardsHtml
    document.querySelectorAll(".add-to-watchlist").forEach(button => button.addEventListener("click", handleAddToWatchlist))
    title = ""
    moviesIdArray = []
    moviesData = []
    currentWatchlist = []
    movieCardsHtml = []
}

function handleAddToWatchlist(event) {
    const movieId = event.target.id
    moviesData.map((movie) => {if (movie.imdbID === movieId) {
        localStorage.setItem(movie.imdbID, JSON.stringify({Title: movie.Title,
                                                            Poster: movie.Poster,
                                                            imdbRating: movie.imdbRating, 
                                                            Runtime: movie.imdbRating,
                                                            Genre: movie.Genre,
                                                            imdbID: movie.imdbID,
                                                            Plot: movie.Plot
                                                        }))
    
    }})
    renderWatchlist()
}



document.getElementById("form").addEventListener("submit", handleSearchClick)




