function renderWatchlist() {
    let list = []
    if (localStorage.length < 1) {
        list = `<div class="center"><p class="missing white" >Your watchlist is looking a little empty...</p>
                <a href="./index.html"><button class="link-to-home white">Let's add some movies!</button></div></a>`
    } else {
        for (let i = 0; i < localStorage.length; i++){
            let movieImdbId = localStorage.key(i)
            let movie = JSON.parse(localStorage.getItem(movieImdbId))
            list += `<div class="card">
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
                                <button class="card-btn remove-from-watchlist" id=${movie.imdbID + "remove"}>Remove</button>
                            </div>
                            <div class="plot">
                            <p>${movie.Plot}</p>
                            </div>
                        </div>
                        </div>` } }
    
    document.getElementById("watchlist-container").innerHTML = list
    document.querySelectorAll(".remove-from-watchlist").forEach(button => button.addEventListener("click", handleRemoveFromWatchlist))
    }

function handleRemoveFromWatchlist(event) {
    localStorage.removeItem(event.target.id.substr(0, 9))
    renderWatchlist()
}

renderWatchlist()