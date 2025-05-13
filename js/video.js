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
        <button id="btn-${item.category_id}"
                onclick="loadCategoryVideos(${item.category_id})"
                class="btn btn-sm active-btn-off active-btn">
                    ${item.category}
        </button>
        `;
        categoriesContainer.append(categoryBtnContainer);
    })

}

// show video details via modal
const showDetails = async (video_id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
    let res = await fetch(url);
    let data = await res.json();

    // show modal
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <img class="rounded-xl mb-3 w-full" src="${data.video.thumbnail}"/>
    <h2>${data.video.description}</h2>
    `
    details.showModal();
}

// load videos in UI
const loadVideos = (arr) => {
    let videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    if (arr.length === 0) {
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class="h-[60vh] flex flex-col gap-4 justify-center items-center">
            <img src="./assets/Icon.png"/>
            <h2 class="text-2xl font-bold">No content available in this category</h2>
        </div>
        `
    } else {
        videosContainer.classList.add("grid");

    }
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
                <button onclick="showDetails('${item.video_id}')" class="btn btn-xs bg-[#2b2d42] text-white hover:bg-white hover:text-[#2b2d42] hover:border-[#2b2d42]">Details</button>
            </div>
        </div>
        `;

        videosContainer.append(card);
    })
}

// load category videos
const loadCategoryVideos = async (id) => {
    // fetch videos by category id
    let res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    let data = await res.json();
    loadVideos(data.category);

    // remove active btn styles
    removeActiveBtnStyles();

    // add active btn styles
    const categoryButtons = document.getElementById(`btn-${id}`);
    categoryButtons.classList.add("active-btn-on");
    categoryButtons.classList.remove("active-btn-off");
};

const removeActiveBtnStyles = () => {
    let activeBtns = document.getElementsByClassName('active-btn');
    // console.log(activeBtns);
    for (let btn of activeBtns) {
        btn.classList.remove("active-btn-on");
        btn.classList.add("active-btn-off");
    }
}


fetchCategories();
fetchVideos();