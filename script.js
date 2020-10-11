var current_page = 1;
var records_per_page = selectEntries();
var arr = [];
var resultData;
var sortedArray = [{ asc: false, desc: false }, { asc: false, desc: false }, { asc: false, desc: false }, { asc: false, desc: false }, { asc: false, desc: false }, { asc: false, desc: false }];
var isFixed = true;

function setPaginationList() {
    const dataListLength = resultData.length;
    const pageCount = dataListLength / records_per_page;
    arr = [];
    for (var i = 0; i < pageCount; i++) {
        var newArr = [];
        for (var j = records_per_page * i; j < records_per_page * (i + 1); j++) {
            newArr.push(resultData[j]);
        }
        arr.push(newArr);
    }
}


function createPaginationList() {
    var ul = document.getElementById('listParent');
    removeAllChildNodes(ul);
    for (var i = current_page; i < current_page + 6; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i);
        li.classList.add('without');
        li.id = `page_${i}`;
        ul.appendChild(li);
    }
}

function addCssClass() {
    var elements1 = document.getElementsByClassName("numberclass");
    for (var i = 0, len = elements1.length; i < len; i++) {
        elements1 [i].classList.remove("numberclass");
    }
    const element = document.getElementById(`page_${current_page}`);
    element.classList.add("numberclass");
}
window.addEventListener("input", updatePageSizeNumber);

function updatePageSizeNumber() {
    records_per_page = selectEntries();
    current_page = 1;
    setPaginationList();
    const data = arr[current_page - 1];
    getDataListWith(data);
    window.scrollTo(0, 0);
}

window.addEventListener('click', function (e) {
    var id = e.target.id || e.target.parentNode.id;
    if(id.includes('_arrow')){
      id = id.toString().split('_')[0];
    }
    if (id.includes('page_')) {
        current_page = Number(e.toElement.innerHTML);
        const data = arr[current_page - 1];
        getDataListWith(data);
        addCssClass();
        window.scrollTo(0, 0);
    }
    if (id === 'prevPage' || id === 'nextPage') {
        addCssClass();
    }
    if (id === 'name' || id === 'alpha3Code' || id === 'area' || id === 'demonym' || id === 'capital' || id === 'population') {
        var j;
        switch (id) {
            case 'name':
                j = 0;
                break;
            case 'alpha3Code':
                j = 1;
                break;
            case 'area':
                j = 2;
                break;
            case 'capital':
                j = 3;
                break;
            case 'demonym':
                j = 4;
                break;
            case 'population':
                j = 5;
                break;
            default:
                j = 6;
                break;
        }
        if (sortedArray[j].asc === true && sortedArray[j].desc !== true) {
            sortedArray[j].asc = false;
            sortedArray[j].desc = true;
            sortList(id, 'desc');
        } else if (sortedArray[j].desc === true && sortedArray[j].asc !== true) {
            sortedArray[j].asc = true;
            sortedArray[j].desc = false;
            sortList(id, 'asc');
        } else if (sortedArray[j].desc === false && sortedArray[j].asc === false) {
            sortedArray[j].asc = true;
            sortList(id, 'asc');
        }
        setPaginationList();
        const data = arr[current_page - 1];
        getDataListWith(data);
        window.scrollTo(0, 0);
    }
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getDataListWith(data) {
    var ul = document.getElementById("responsive-table");
    removeAllChildNodes(ul);
    for (var i = 0; i < data.length; i++) {
        var key1 = document.createElement("div");
        key1.className = 'col col-1';
        var key2 = document.createElement("div");
        key2.className = 'col col-2';
        var key3 = document.createElement("div");
        key3.className = 'col col-3';
        var key4 = document.createElement("div");
        key4.className = 'col col-4';
        var key5 = document.createElement("div");
        key5.className = 'col col-5';
        var key6 = document.createElement("div");
        key6.className = 'col col-6';
        key2.innerHTML = data[i].alpha3Code;
        key1.setAttribute('data-label','Country Name')
        key1.innerHTML = data[i].name;
        key2.setAttribute('data-label','Alpha3Code')
        key3.innerHTML = data[i].area;
        key3.setAttribute('data-label','Area')
        key4.innerHTML = data[i].demonym;
        key4.setAttribute('data-label','Demonym')
        key5.innerHTML = data[i].capital;
        key5.setAttribute('data-label','Capital Name')
        key6.innerHTML = data[i].population;
        key6.setAttribute('data-label','Population')
        var li = document.createElement("li");
        li.className = 'table-row';
        li.appendChild(key1);
        li.appendChild(key2);
        li.appendChild(key3);
        li.appendChild(key4);
        li.appendChild(key5);
        li.appendChild(key6);
        ul.appendChild(li);
    }
}



function prevPage() {
    if (current_page > 1) {
        current_page--;
        const data = arr[current_page - 1];
        getDataListWith(data);
        createPaginationList();
        window.scrollTo(0, 0);
    }
}

function nextPage() {
    const dataListLength = resultData.length;
    const pageCount = dataListLength / records_per_page;
    if (current_page < pageCount) {
        current_page++;
        const data = arr[current_page - 1];
        getDataListWith(data);
        createPaginationList();
        window.scrollTo(0, 0);
    }
}

function selectEntries() {
    const element = document.getElementById('mySelect')
    pazinationNumber = Number(element.options[element.selectedIndex].value);
    return pazinationNumber;
}
function selectHeader() {
    const element = document.getElementById('header')
    const type = element.options[element.selectedIndex].value;  
    if(type === 'Scroll'){
        isFixed = false;
    }else if(type === 'Fixed'){
        isFixed = true;
    }
}

function onSearch(input) {
    if (input.value == "") {
        const data = arr[current_page - 1];
        getDataListWith(data);
    }
    else {
        const value = input.value;
        const currentArr = arr[current_page - 1];
        let newArry = currentArr.filter(data => {
            if (data.alpha3Code.toString().toLowerCase() == value || data.name.toString().toLowerCase() == value || data.area == value || data.demonym.toString().toLowerCase() == value || data.capital.toString().toLowerCase() == value || data.population == value) {
                return data;
            }
        })
        getDataListWith(newArry);
    }

}

window.onload = async function () {
    resultData = await returnData();
    sortedArray[0].asc = true;
    sortList('name', 'asc');
    setPaginationList();
    createPaginationList();
    const data = arr[current_page - 1];
    getDataListWith(data);
    addCssClass();
};

async function returnData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all', {});
    const json = await response.json();
    return json;
}

function sortList(parameter, order) {
    resultData.sort((a, b) => {
        let comparison = 0;
        let varA = a[parameter];
        let varB = b[parameter]
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    });
}




window.onscroll = function () { myFunction() };

var header = document.getElementById('responsive-table_1');
var sticky = header.offsetTop;

function myFunction() {
    if(isFixed){
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}


