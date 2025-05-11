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
        loadVideos(data);
    }
    catch (error) {
        console.error(`Error happend: ${error}`)
    }
}

// load categories btn in UI
const loadCategories = (categories) => {
    let categoriesContainer = document.getElementById("categories-container");

    categories.forEach(item => {
        let categoryBtn = document.createElement('button');
        categoryBtn.innerText = item.category;
        categoryBtn.className = "btn bg-pri-clr text-white hover:bg-white hover:text-pri-clr hover:border-pri-clr";
        categoriesContainer.append(categoryBtn);
    })

}

// load videos in UI
const loadVideos = (obj) => {
    let videosContainer = document.getElementById("videos-container");

    obj.videos.forEach(item => {
        let card = document.createElement('div');
        card.className = "card"
        card.innerHTML = `
        <figure class="h-52">
            <img class="w-full h-full object-cover" src="${item.thumbnail}" alt="thumbnail" />
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




fetchCategories()
fetchVideos()