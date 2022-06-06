let table_sort_elements = document.querySelectorAll('.table_sort');
let tableBody = document.querySelector('.table-body')
const students = [
    {
        "id": 201002183,
        "name": "Golam Mostafa",
        "CGPA": 3.85,
        "Dept": "CSE"                
    },

    {
        "id": 201002182,
        "name": "Soikat",
        "CGPA": 3.75,
        "Dept": "BBA"
    },

    {
        "id": 201002093,
        "name": "Obydullah",
        "CGPA": 3.43,
        "Dept": "EEE"
    },

    {
        "id": 201002311,
        "name": "Rabbi",
        "CGPA": 2.85,
        "Dept": "LLB"
    },

    {
        "id": 201002096,
        "name": "Saoun",
        "CGPA": 3.22,
        "Dept": "JSM"
    }

]


updateTable()

tableBody.innerHTML = bodyData;

//add data into the table
function addRow(){

    // get input values
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var cgpa = document.getElementById('cgpa').value;
    var dept = document.getElementById('dept').value;
    var form = document.querySelector('.user-form')

    form.addEventListener('submit', e=>{
        e.preventDefault()
    })

    let newStudent = {
        "id": id,
        "name": name,
        "CGPA": cgpa,
        "Dept": dept
    }

    students.push(newStudent)
    updateTable()
}

function removeRow(e){
    let id = e.target.dataset.id
    let index = students.findIndex(student =>{
        return student.id == id
    })
    students.splice(index, 1)
    updateTable()
}




if(table_sort_elements)
{
    table_sort_elements = Array.isArray(table_sort_elements) ? table_sort_elements : Object.values(table_sort_elements);
    table_sort_elements.forEach(table_sort_element=>{
        let thead_cells = table_sort_element.querySelectorAll('thead>tr>*');
        if(thead_cells)
        {
            thead_cells = Array.from(thead_cells);

            thead_cells.forEach((thead_cell, index)=>{
                if(index == 0 || index == 2){
                    thead_cell.addEventListener('click', function(){
                        this.classList.toggle('asc');
                        sortTableByColumn(table_sort_element, index, !this.classList.contains('asc'));
                    });
                }
            });
        }
    });
}


function sortTableByColumn(table, column, desc=false) 
{
    let tbody = table.querySelector('tbody'),
        rows  = tbody.querySelectorAll('tr');

    rows  = rows.isArray ? rows : Object.values(rows);



    
    // Sort with merge sort
    //-----------------
    mergeSort(students, column, 0, students.length-1)

    if(desc){
        students.reverse()
    }

    let i = 0

    updateTable()
}

function updateTable(){
    let tbody = document.querySelector('tbody')
    bodyData = ''
    students.forEach(student =>{
        bodyData += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.CGPA}</td>
            <td>${student.Dept}</td>
            <td><button data-id="${student.id}" onclick="removeRow(event)">Delete</button></td>
        </tr>
        `
    })
    tbody.innerHTML = bodyData
}


// Merge Sort
//===========

function mergeSort(arr, column, left, right){
    let mid = Math.trunc((left + right) / 2)

    if(left < right){
        mergeSort(arr, column, left, mid);
        mergeSort(arr, column, mid + 1, right);
        merge(arr, column, left, mid, right);
    }
}

function merge(arr, column, left, mid, right){
    let n1 = mid - left + 1;
    let n2 = right - mid;

    // Temp Arrays
    let a = [n1]
    let b = [n2]

    for(let i=0; i<n1; i++){ // Initialize array a
        a[i] = arr[left+i];
    }
    for(let i=0; i<n2; i++){ // Initialize array b
        b[i] = arr[mid+1 + i];
    }

    let i=0, j=0, k=left;
    while(i<n1 && j<n2){
        let m, n;

        if(column == 0){
            m = a[i].id;
            n = b[j].id;
        }else if(column == 2){
            m = a[i].CGPA;
            n = b[j].CGPA;
        }

        if(m < n){
            arr[k++] = a[i++];
        }else{
            arr[k++] = b[j++];
        }
    }

    while(i<n1){
        arr[k++] = a[i++];
    }
    while(j<n2){
        arr[k++] = b[j++];
    }
}




/* html table filter javaScript code start */
function filterTable(This, table_id)
{
    let recordLists = document.querySelectorAll(`#${table_id}>*`);
    if(recordLists)
    {
        hide_tr(recordLists);
        recordLists.forEach(recordList=>{
            let str   = recordList.innerText.toLowerCase(),
                value = This.value.toLowerCase();

            if(str.indexOf(value)>=0)
            {
                recordList.style.display = '';
            }
        });
    }
}

function hide_tr(recordLists) {
    recordLists.forEach(recordList=>{
        recordList.style.display = 'none';
    });
}
/* html table filter javaScript code end */