//const APP_ID = "788499ba";
//const APP_KEY = "7f4f98dffe8f38aba786c8a08271185f";

let searchButton = document.getElementById('search')
var queryAPI = document.getElementById('input')


//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})



//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    const recipeURL = 'https://api.edamam.com/search?app_id=788499ba&app_key=7f4f98dffe8f38aba786c8a08271185f&to=52&q=' + queryAPI.value
    console.log(recipeURL)
    const response = await fetch(recipeURL)
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
            <div class="col-lg-4 col-md-6">
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
    document.getElementById("results").innerHTML = recipeHTML
}
