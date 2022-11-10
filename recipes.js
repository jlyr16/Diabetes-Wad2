const APP_ID = "788499ba";
const APP_KEY = "7f4f98dffe8f38aba786c8a08271185f";

let searchButton = document.querySelector("#search")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    //e.preventDefault()
    //searchQuery = e.target.querySelector('input').value
    sendApiRequest()
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    const recipeURL = 'https://api.edamam.com/search?app_id=788499ba&app_key=7f4f98dffe8f38aba786c8a08271185f&q=healthy'
    const response = await fetch(recipeURL);
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){
    let recipeHTML = ''
    
    data.hits.map(result => {
        let carbQty = result.recipe.totalNutrients.CHOCDF.quantity.toFixed(2)
        recipeHTML += `  
            <div class="g-col-4">
                <div class="card h-100">
                    <img src="${result.recipe.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${result.recipe.label}</h5>
                        <p class="carbs">Carbohydrates: ${carbQty}${result.recipe.totalNutrients.CHOCDF.unit}</p>
                        <p class="dietLabel">Diet Label: ${result.recipe.dietLabels}</p>
                    </div>
                    <div class="card-footer">
                        <a href="${result.recipe.url}" class="btn btn-primary">View Recipe</a>
                    </div>
                </div>
            </div>
        
            
    `
    })
    document.querySelector("#results").innerHTML = recipeHTML
}

/*
<div class="card" style="width: 18rem;">
    <img src="${data.hits[1].recipe.image}" class="card-img-top" alt="">
    <div class="card-body">
        <h5 class="card-title">${data.hits[1].recipe.label}e</h5>
        <p class="carbs">Carbohydrates: ${data.hits[2].recipe.totalNutrients.CHOCDF.quantity}${data.hits[2].recipe.totalNutrients.CHOCDF.unit}</p>
        <a href="${data.hits[1].recipe.url}" class="btn btn-primary">View Recipe</a>
    </div>
</div>

<div class="card" style="width: 18rem;">
    <img src="${data.hits[2].recipe.image}" class="card-img-top" alt="">
    <div class="card-body">
        <h5 class="card-title">${data.hits[2].recipe.label}</h5> 
        <p class="carbs">Carbohydrates: ${data.hits[2].recipe.totalNutrients.CHOCDF.quantity}${data.hits[2].recipe.totalNutrients.CHOCDF.unit}</p>
        <a href="${data.hits[2].recipe.url}" class="btn btn-primary">View Recipe</a>
    </div>
</div>

*/