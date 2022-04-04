window.onload = function(){
    collectInformationAboutPlanets();
}


function collectInformationAboutPlanets()
{

    const response = fetch  ("https://swapi.dev/api/planets", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(response => response.json())
        .then( data => displayData(data))


}

function displayData(data) {
    let row;
    let table = document.getElementById('table');
    let counter = 0;
    data['results'].forEach(element => {
            row += `<tr>
                    <td>${element['name']}</td>
                    <td>${element['diameter']} km</td>
                    <td>${element['climate']}</td>
                    <td>${element['terrain']}</td>\
                    <td>${element['surface_water']}</td>\
                    <td>${element['population']}</td>\
                    </tr>`
    })
    table.innerHTML = row;

}




