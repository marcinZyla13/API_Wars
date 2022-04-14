let amountOfObjects = 0;
let page = 1;
let planetObjects;

window.onload = function(){
    collectInformationAboutPlanets("https://swapi.dev/api/planets");
    addEventListenersToMenuButtons();
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

function  collectInformationAboutResidents(uri)
{
    const response =  fetch  (uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(response => response.json())
        .then(data => displayResidents(data))

}

function displayResidents(data) {
    let row;
    let modalBody = document.getElementById("residentsTable");

    row = `
        <td class ="modalText">${data['name']}</td>
        <td class ="modalText">${data['height']}</td>
        <td class ="modalText">${data['mass']}</td>
        <td class ="modalText">${data['hair_color']}</td>
        <td class ="modalText">${data['skin_color']}</td>
        <td class ="modalText">${data['eye_color']}</td>
        <td class ="modalText">${data['birth_year']}</td>
        <td class ="modalText">${data['gender']}</td>        
       `
    modalBody.innerHTML += row;
}

function getResidentsApiAddresses(event)
{

    $("#myModal").modal();
    let residentsLink = planetObjects[event.currentTarget.id-1]['residents'];
    for(let x=0;x<residentsLink.length;x++)
    {
        collectInformationAboutResidents(residentsLink[x]);
    }

}

function ClearModal()
{
    let modalTable = document.getElementById('residentsTable');
    modalTable.innerHTML='';

}


function displayData(data) {
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

function addEventListenersToMenuButtons()
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


    document.querySelectorAll(".btn.btn-secondary.btn-sm").forEach(item => {
        item.addEventListener('click',event => {
            generateModal(event.currentTarget.id);
        })
    })
}


function addEventListenersToResidentsButtons()
{
    document.querySelectorAll(".btn.btn-outline-primary").forEach(item => {
        item.addEventListener('click',event => {
            ClearModal();
            getResidentsApiAddresses(event)
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


function generateModal(modalType)
{

    let registerLoginModalContent = document.getElementById("loginRegisterContent");
    let row =`<form id ="form">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
          </div>`
    if(modalType === "register")
    {
            row += `<div class="mb-3">
                    <label for="passwordConfirmation" class="form-label">Confirm password</label>
                    <input type="password" class="form-control" id="passwordConfirmation">
                    </div>`

    }
    row +=` </div>
            <button type="submit" class="btn btn-primary">Submit</button>
             </form>`;
    registerLoginModalContent.innerHTML = row;
    $("#loginRegister").modal();

}


