let amountOfObjects = 0;
let page = 1;
let planetObjects;

window.onload = function(){
    collectInformationAboutPlanets("https://swapi.dev/api/planets");
    addEventListeners();
}


function  collectInformationAboutPlanets(uri)
{
    const response = fetch  (uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(response => response.json())
        .then(data => displayData(data))


}


function getCurrentResidents(event)
{
    let residentsLink = planetObjects[event.currentTarget.id-1]['residents'];


}



function displayData(data) {
    console.log(data);
    planetObjects = data['results'];
    amountOfObjects = data.count;
    let planetCounter = 0;
    let row;
    let table = document.getElementById('table');
    data['results'].forEach(element => {
            row += `<tr>
                    <td>${element['name']}</td>
                    <td>${element['diameter']} km</td>
                    <td>${element['climate']}</td>
                    <td>${element['terrain']}</td>`
                    row+= (element['surface_water'] === 'unknown' ? `<td>${element['surface_water']} </td>` : `<td>${element['surface_water']} %</td>`)
                    row+= (element['population'] === 'unknown' ? `<td>${element['population']} </td>` : `<td>${convertPopulationNumber(element['population'])} people</td>`)
                    row+= (element['residents'].length === 0 ? `<td id ="${planetCounter+=1}">No residents</td>` :
                        `<td><button data-page='${page}' id ="${planetCounter+=1}" type="button" class="btn btn-outline-primary"> ${element['residents'].length} residents</button></td>`)
                    row+= `</tr>`
    })
    table.innerHTML = row;
    addEventListenersToResidentsButtons()

}

function convertPopulationNumber(population)
{
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    return internationalNumberFormat.format(population);
}

function addEventListeners()
{
    let uri;

    document.getElementById('next').addEventListener('click',function()  // refactor na query selector ???
    {
        checkPageAvailability("+");
        uri = `https://swapi.dev/api/planets/?page=${page}`;
        collectInformationAboutPlanets(uri);
    })
    document.getElementById('previous').addEventListener('click',function()  // refactor na query selector ???
    {
        checkPageAvailability("-");
        uri = `https://swapi.dev/api/planets/?page=${page}`;
        collectInformationAboutPlanets(uri);
    })

}

function addEventListenersToResidentsButtons()
{
    document.querySelectorAll(".btn.btn-outline-primary").forEach(item => {
        item.addEventListener('click',event => {
            getCurrentResidents(event);
        })
    })

}

function checkPageAvailability(operation)
{
    let objectsOnThePage = 10;
    let maxAmountOfPages = amountOfObjects/objectsOnThePage;
    if(operation === "-")
    {
        if(page - 1 >=1)
            page-=1;
    }
    else
    {
        if(page + 1 <= maxAmountOfPages)
            page+=1;
    }

}





