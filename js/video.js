// fetch categories button
const fetchCategories = async () => {
    try {
        let res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        let data = await res.json();
        loadCategories(data.categories);
    }
    catch (error) {
        console.error(`Error happend: ${error}`)
    }
}

// fetch videos
const fetchVideos = async () => {
    try {
        let res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        let data = await res.json();
        loadVideos(data.videos);
    }
    catch (error) {
        console.error(`Error happend: ${error}`)
    }
}

// converting posted date into hr min and seconds
const postedDate = (num) => {
    let hour = parseInt(num / 3600);
    let remainingSec = num % 3600;
    let min = parseInt(remainingSec / 60);
    remainingSec = remainingSec % 60;
    return `${hour}hr ${min}m ${remainingSec}s ago`;
}


// load categories btn in UI
const loadCategories = (categories) => {
    let categoriesContainer = document.getElementById("categories-container");

    categories.forEach(item => {
        let categoryBtnContainer = document.createElement('div');
        categoryBtnContainer.innerHTML = `
        <button onclick="loadCategoryVideos(${item.category_id})" class="btn bg-pri-clr text-white hover:bg-white hover:text-pri-clr hover:border-pri-clr">${item.category}</button>
        `;
        categoriesContainer.append(categoryBtnContainer);
    })

}

// load videos in UI
const loadVideos = (arr) => {
    let videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";

    arr.forEach(item => {
        let card = document.createElement('div');
        card.className = "card"
        card.innerHTML = `
        <figure class="h-52 relative">
            <img class="w-full h-full object-cover" src="${item.thumbnail}" alt="thumbnail" />
            
            ${item.others.posted_date?.length === 0 ? "" : `<div class="absolute bottom-2 right-2 text-white bg-black p-1 rounded-lg text-xs">${postedDate(item.others.posted_date)}</div>`}
        </figure>
        <div class="flex py-5 gap-3">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}" alt="">
            </div>
            <div class="">
                <h2 class="font-bold">${item.title}</h2>
                <div class="flex items-center gap-1 text-gray-600">
                    <p>${item.authors[0].profile_name}</p>
                    ${item.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : ""}
                </div>
                <p class="text-gray-600">${item.others.views}</p>
            </div>
        </div>
        `;

        videosContainer.append(card);
    })
}

// load category videos
const loadCategoryVideos = (id) => {
    // fetch videos by category id
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => loadVideos(data.category))
    .catch(err => console.log(`erron happend ${err}`))
}


fetchCategories()
fetchVideos()