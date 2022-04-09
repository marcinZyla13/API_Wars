let amountOfObjects = 0;
let page = 1;

window.onload = function(){
    collectInformationFromApi("https://swapi.dev/api/planets","planets");
    addEventListeners();
}


function  collectInformationFromApi(uri,flag)
{
    let currentPlanet;
    const response = fetch  (uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(response => response.json())
        .then(function(data){
            if(flag === "planets")
            {
                displayData(data);
            }
            else
            {
                collectInformationAboutResidents(data['residents']);
            }
        });



}

function collectInformationAboutResidents(residents)
{
    console.log(residents);

}

function getCurrentPlanet(event)
{
    collectInformationFromApi(`https://swapi.dev/api/planets/${event.target.id}?page=${event.target.getAttribute('data-page')}`,'residents');
}



function displayData(data) {
    console.log(data);
    let planetCounter = 0;
    amountOfObjects = data.count;
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
                    row+= (element['residents'].length === 0 ? `<td id ="${planetCounter+=1}">No residents</td>` : `<td><button data-page='${page}' id ="${planetCounter+=1}"type="button" class="btn btn-outline-primary"> ${element['residents'].length} residents</button></td>`)
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
        collectInformationFromApi(uri,"planets");
    })
    document.getElementById('previous').addEventListener('click',function()  // refactor na query selector ???
    {
        checkPageAvailability("-");
        uri = `https://swapi.dev/api/planets/?page=${page}`;
        collectInformationFromApi(uri,"planets");
    })

}

function addEventListenersToResidentsButtons()
{
    document.querySelectorAll(".btn.btn-outline-primary").forEach(item => {
        item.addEventListener('click',event => {
            getCurrentPlanet(event);
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





