const tBody = document.querySelector('#table-body');
const formArray = Array.from(document.querySelector('#add-row').children);

formArray[3].addEventListener('click', () => addRow(getData()));


const backupArray = {
    'currentSort': 0,
    'defaultArray': [],
    'backup': function (array) {
        backupArray.currentSort = 0;
        backupArray.defaultArray = array;
    },
    'updateSort': function () {
        if (backupArray.currentSort < 1) backupArray.currentSort++;
        else backupArray.currentSort = -1;
    }
};

function sort(by) { // 0: firstName, 1: last name, 2: age
    let arr = getAllData(tBody);
    backupArray.updateSort();
    let sortFactor = backupArray.currentSort;

    removeRows();

    if (sortFactor != 0) {
        arr.sort((a, b) => {
            return sortFactor * (a.children[by].textContent.localeCompare(b.children[by].textContent));
        });
        displayRows(arr, 1);
    } else
        displayRows(backupArray.defaultArray, 1);
}

function removeRows() {
    Array.from(tBody.children).forEach(e => e.remove());
}

function displayRows(arr, page) {
    for (let index = (page - 1) * 10; index < page * 10; index++) {
        tBody.appendChild(arr[index]);
    }


}
/**
 * @returns {Array}
 * @param {HTMLElement} tBody 
 */
function getAllData(tBody) {
    return Array.from(tBody.children);
}

function getData() {
    let isEmpty = false;
    let arr = formArray.map(e => {
        //   if (e.value == '') isEmpty = true;

        return e.value;
    });
    arr[3] = 'Delete';
    return isEmpty ? null : arr;

}

function addRow(arr) {
    /*   if (arr == null) {
          console.log('invalid');
          return;
      } */

    let tr = document.createElement('tr');
    let tds = [document.createElement('td'), document.createElement('td'),
        document.createElement('td'), document.createElement('button')
    ];

    tds[3].addEventListener('click', (e) => tBody.removeChild(e.target.parentElement));

    tds.forEach((e, i) => {
        e.textContent = arr[i];
        tr.appendChild(e);
    })
    tBody.appendChild(tr);
    backupArray.backup(getAllData(tBody));
    updatePagination();
}

(function createPagination() {
    let css = ".center{text-align:center;}.pagination{display:inline-block;}.paginationa{color:black;float:left;padding:8px16px;text-decoration:none;transition:background-color.3s;border:1pxsolid#ddd;margin:04px;}.paginationa.active{background-color:#4CAF50;color:white;border:1pxsolid#4CAF50;}";
    let style = document.createElement('style');
    style.innerHTML += css;
    let outerDiv = document.createElement('div');
    outerDiv.id = 'outer-pagination';
    outerDiv.style.cssText = "text-align: center;";

    innerDiv = document.createElement('div');
    innerDiv.id = 'inner-pagination';
    innerDiv.style.cssText = "display: inline-block;";
    outerDiv.appendChild(innerDiv);
    (document.querySelector('body')).appendChild(outerDiv);


})();

function updatePagination() {
    let len = backupArray.defaultArray.length;
    console.log(len)
    let outerDiv = document.querySelector('#outer-pagination');
    let innerDiv = document.querySelector('#inner-pagination');
    innerDiv.remove();

    innerDiv = document.createElement('div');
    innerDiv.id = 'inner-pagination';
    innerDiv.style.cssText = "display: inline-block;";
    let i = 1;
    let a = document.createElement('a');


    a.innerHTML = '&laquo;';
    innerDiv.appendChild(a);
    do {
        a = document.createElement('a');
        a.textContent = i;
        innerDiv.appendChild(a);
        a.addEventListener('click', e => {
            goTo(i);
        });
        i++;
    } while (i < len / 10 + 1)
    a = document.createElement('a');

    a.innerHTML = '&raquo;';
    innerDiv.appendChild(a);
    outerDiv.appendChild(innerDiv);


}

function goTo(i) {
    removeRows();
    displayRows(getAllData(tBody), i);
}