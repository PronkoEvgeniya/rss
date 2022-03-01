let url = 'https://api.unsplash.com/search/photos?query=random&per_page=9&client_id=mzcDkZWaae6dMf9WBa6DY8wWscDn-XiKjPX68dMrc1k',
input = document.querySelector('input'),
imageContainer = document.querySelector('.items'),
btn = document.querySelector('.btn-search'),
btnSpan = document.querySelector('.btn-search span');

input.addEventListener('change', (showNewData));
function showNewData() {
    imageContainer.innerHTML = "";
    url = 'https://api.unsplash.com/search/photos?query='+`${input.value}`+'&per_page=9&client_id=mzcDkZWaae6dMf9WBa6DY8wWscDn-XiKjPX68dMrc1k';
    getData();
    btnSpan.textContent = 'backspace';
    
}

btn.addEventListener('click', () => {
    btnSpan.textContent = 'search';
        input.value = "";
        url = 'https://api.unsplash.com/search/photos?query=random&per_page=9&client_id=mzcDkZWaae6dMf9WBa6DY8wWscDn-XiKjPX68dMrc1k'
        imageContainer.innerHTML = "";
        getData();
    })

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}
getData();

function showData(data) {
    console.log(data)
    data.results.map((elem) => {
        let imageSrc = elem.urls.regular;
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = `${imageSrc}`;
        img.alt = `image`;
        imageContainer.append(img);
    })
}