const fetchCategories = async () => {
    try {
        let res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        let data = await res.json();
        loadCategories(data.categories);
    }
    catch(error) {
        console.error(`Error happend: ${error}`)
    }
}

const loadCategories = (categories) => {
    let categoriesContainer = document.getElementById("categories-container");
    
    categories.forEach(item => {
        let categoryBtn = document.createElement('button');
        categoryBtn.innerText = item.category;
        categoryBtn.className = "btn bg-pri-clr text-white hover:bg-white hover:text-pri-clr hover:border-pri-clr";
        categoriesContainer.append(categoryBtn);
    })
    
}

fetchCategories()

