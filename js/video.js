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
    
    categories.forEach(data => {
        console.log(data.category);
    })
    
}

fetchCategories()

