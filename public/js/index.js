/*
//dichiaro gli elementi
let categoriesRow = document.getElementById('categoriesRow')
let divCol = document.createElement('div');
let divCard = document.createElement('div');
let a = document.createElement('a');
let divIcon = document.createElement('div');
let i = document.createElement('i');
let h3 = document.createElement('h3');
let p = document.createElement('p');
//assegno le classi
divCol.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3' );
divCard.classList.add('category-card');
a.classList.add('category-body', 'border-dashed');
a.href = '#'
divIcon.classList.add('rounded-icon-container');   // href="#" come lo metto ?
p.classList.add('category-description')
*/
//metto il contenuto
/*
i = i.classList.add(category.icons);
h3.textContent = category.name;
p.textContent = category.announcementsCount;
*/
//appendo i figli
/*
categoriesRow.appendChild(divCol)
divCol.appendChild(divCard);
divCard.appendChild(a);
a.appendChild(divIcon, h3, p);
divIcon.appendChild(i);
*/


let categoriesRow = document.getElementById('categoriesRow')
function creatCard(category) {


    let divCol = document.createElement('div');
    let divCard = document.createElement('div');
    let a = document.createElement('a');
    let divIcon = document.createElement('div');
    let i = document.createElement('i');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');

    divCol.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
    divCard.classList.add('category-card');
    a.classList.add('category-body', 'border-dashed');
    a.href = '#'; // metto href="#"
    divIcon.classList.add('rounded-icon-container');
    p.classList.add('category-description')


    i.classList.add(category.icon.split(' ')[0], category.icon.split(' ')[1] );
    h3.textContent = category.name;
    p.textContent = category.announcementsCount + ' Annunci';
    // categoriesRow.appendChild(divCol)
    divCol.appendChild(divCard);
    divCard.appendChild(a);
    a.appendChild(divIcon);
    a.appendChild(h3);
    a.appendChild(p);
    divIcon.appendChild(i);
    console.log(divCol);
    return divCol

};        //fine funzione


// creatCard(adfhb)

fetch('/server/api/categorie.json')
.then( (response) => {
    return response.json()
})
.then((categories) => {

    // let categoriesRow = document.getElementById('categoriesRow')

    categories.forEach(category => {
        let col = creatCard(category);
        categoriesRow.appendChild(col)
   });
})
.catch((error) => {
    console.log(error);
})

