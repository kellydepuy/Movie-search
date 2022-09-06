/* This function retrieves the data needed to create the watch list cards from local storage. It starts by checking
if local storage has any data. If not, it tells the user to search for movies. If there is data, it creates a
list of keys adn then pulls the data by its key and creates the html for the card. At the end, it adds the html to the
page and add event listeners to each movie's remove button.*/

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
                            <div class="rating">
                                <h2>${movie.Title}</h2>
                                <img class="star" src="./icons/star.png">
                                <p>${movie.imdbRating}</p>
                            </div>
                            <p class="minutes">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                            <button class="card-btn remove-from-watchlist" id=${movie.imdbID + "remove"}>Remove Movie</button>
                            <div class="plot">
                                <p>${movie.Plot}</p>
                            </div>
                        </div>
                    </div>` } }
    
    document.getElementById("watchlist-container").innerHTML = list
    document.querySelectorAll(".remove-from-watchlist").forEach(button => button.addEventListener("click", handleRemoveFromWatchlist))
    }

//This function removes a move from local storage when the remove button is clicked and re-renders the page.

function handleRemoveFromWatchlist(event) {
    localStorage.removeItem(event.target.id.substr(0, 9))
    renderWatchlist()
}

renderWatchlist()