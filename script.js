const btnXHR = document.getElementById('xhrsearch');
const btnFetch = document.getElementById('fetchsearch');
const btnFetchAsyncAwait = document.getElementById('fetchAsyncAwaitSearch');

let searchQueryElem = document.getElementById('query');
let searchResult = document.getElementById('searchResult');

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '7qPoGJEYtEwizW2hlaMw51LYCXm5kVuD';


btnXHR.addEventListener('click', function(){
    searchResult.innerHTML = '';
    searchUsingXHR(searchQueryElem.value);
});

btnFetch.addEventListener('click', function (){
    searchResult.innerHTML = '';
    searchUsingFetch(searchQueryElem.value);
});

btnFetchAsyncAwait.addEventListener('click', async function(){
    searchResult.innerHTML = '';
    await searchUsingFetchAsyncAwait(searchQueryElem.value);
});

function searchUsingXHR(query){
    if(!query || query.trim().length === 0){
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function(){
        if(xhr.readyState === 4 && xhr.status === 200) {
            displayResult(JSON.parse(xhr.responseText));
        }
    });
    let params = 'api_key=' + API_KEY + "&q=" + query + "&limit=5&rating=g";
    xhr.open("GET", API_URL + '?' + params);
    xhr.send();
}

function searchUsingFetch(query){
    if(!query || query.trim().length === 0){
        return;
    }
    let params = 'api_key=' + API_KEY + "&q=" + query + "&limit=5&rating=g";
    fetch(API_URL + '?' + params, {method: "GET"})
    .then((response) => {
        return response.text();
    }).then((text) => {
        displayResult(JSON.parse(text));
    }).catch((error) => {
        console.log(error);
    });
}

async function searchUsingFetchAsyncAwait(query){
    if(!query || query.trim().length === 0){
        return;
    }
    let params = 'api_key=' + API_KEY + "&q=" + query + "&limit=5&rating=g";
    let response = await fetch(API_URL + '?' + params, {method: "GET"});
    let data = await response.json();
    displayResult(data);
}

function displayResult(respObject){
    for(let item of respObject.data){
        let imgElement = document.createElement('img');
        imgElement.src = item.images.fixed_height_downsampled.url;
        imgElement.alt = item.title;
        searchResult.appendChild(imgElement);
    }
}
