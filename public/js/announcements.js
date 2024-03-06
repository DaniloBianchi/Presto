const announcementsRow = document.getElementById('announcementsRow')
let filteringForm = document.getElementById('filteringForm');
let searchInput = document.getElementById('searchInput');
let maxPriceInput = document.getElementById('maxPriceInput');
let minPriceInput = document.getElementById('minPriceInput');
let categorySelect = document.getElementById('categorySelect');
let sortSelect = document.getElementById('sortSelect')


function creatAnnouncement(announcement) {

    let createdAt = new Date(announcement.createdAt)
    let divCol = document.createElement('div');
    divCol.className ='coll-12 col-md-6 col-xl-4 ';

    let divCard = document.createElement('div');
    divCard.className = 'card h-100';
    divCol.appendChild(divCard);

    let img = document.createElement('img');
    img.setAttribute('src', 'https://picsum.photos/640/480');
    img.className = 'card-img-top';
    divCard.appendChild(img);

    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCard.appendChild(divCardBody);

    let pPrice = document.createElement('p');
    pPrice.className = 'card-text text-primary fs-5 fw-semibold mb-0';
    pPrice.textContent = '€ '+ announcement.price;
    divCardBody.appendChild(pPrice);

    let h5 = document.createElement('h5');
    h5.className =  'card-title display-5 mb-0';
    h5.textContent = announcement.name;
    divCardBody.appendChild(h5);

    let pDescription = document.createElement('p');
    pDescription.className = 'card-text text-muted ';
    pDescription.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
    divCardBody.appendChild(pDescription);

    let divFooter = document.createElement('div');
    divFooter.className = ' card-footer d-flex justify-content-around p-3 bg-white text-primary ';
    divCard.appendChild(divFooter);

    let pLike = document.createElement('p');
    pLike.className = 'mb-0';
    divFooter.appendChild(pLike);
    let iLike = document.createElement('i');
    iLike.className = 'bi bi-heart-fill';
    pLike.appendChild(iLike);
    let spanLike = document.createElement('span');
    spanLike.textContent = ' ' + 'Like';
    pLike.appendChild(spanLike);

    let pCategory = document.createElement('p');
    pCategory.className = 'mb-0 ';
    divFooter.appendChild(pCategory);
    let iCategory = document.createElement('i');
    iCategory.className = 'bi bi-tag-fill';
    pCategory.appendChild(iCategory);
    let spanCategory = document.createElement('span');
    spanCategory.textContent = ' ' + announcement.category;
    pCategory.appendChild(spanCategory);

    let pCalendar = document.createElement('p');
    pCalendar.className = 'mb-0';
    divFooter.appendChild(pCalendar);
    let iCalendar = document.createElement('i');
    iCalendar.className = 'bi bi-calendar-fill';
    pCalendar.appendChild(iCalendar);
    let spanCalendar = document.createElement('span');
    spanCalendar.textContent =' '+ createdAt.toLocaleDateString();
    pCalendar.appendChild(spanCalendar);
    return divCol
    // announcementsRow.appendChild(divCol)

};

function ShowAnnouncements(announcements)  {
    while (announcementsRow.hasChildNodes()){
        announcementsRow.removeChild(announcementsRow.firstChild)
    }

    announcements.forEach((announcement) => {
        let col= creatAnnouncement(announcement);
        announcementsRow.appendChild(col)
    });
}

async function ReadAllAnnouncement() {
    let response = await fetch('/server/api/annunci.json');
    let announcements = await response.json();
    return announcements
}


filteringForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

    let search = searchInput.value.toLowerCase();
    let minPrice = minPriceInput.value;
    let maxPrice = maxPriceInput.value;
    let categoryImput = categorySelect.value;
    let sortBy = sortSelect.value
    let announcements  = await ReadAllAnnouncement()

    let filteredAnnouncements = announcements.filter((announcement)=>{

        let isAnnouncementRequired = true;
        // Filtri
        if (search.length > 0){
            isAnnouncementRequired = announcement.name.toLowerCase().includes(search)
        }
        if (minPrice.length > 0 && isAnnouncementRequired == true ){
            isAnnouncementRequired = announcement.price >= parseFloat(minPrice)
        }
        if (maxPrice.length > 0 && isAnnouncementRequired == true ){
            isAnnouncementRequired = announcement.price <= parseFloat(maxPrice)
        }
        if (categoryImput.length > 0  && isAnnouncementRequired == true ) {
            isAnnouncementRequired = announcement.category.toLowerCase().includes(categoryImput)
        }

        return isAnnouncementRequired
    })

    if (sortBy.length > 0 ){
        switch (sortBy) {
            case 'ascByPrice':
            filteredAnnouncements.sort((left, right) => {
                return parseFloat(left.price) - parseFloat(right.price)
            })
            break;
            case 'descByPrice':
            filteredAnnouncements.sort((left, right) => {
                return parseFloat(right.price) - parseFloat(left.price)
            })
            break;
            case 'ascByDate':
            filteredAnnouncements.sort((left, right) => {
                return left.createdAt - right.createdAt
            })
            break;
            case 'descByDate':
            filteredAnnouncements.sort((left, right) => {
                return right.createdAt - left.createdAt
            })
            break;
            case 'ascByAlpha':
            filteredAnnouncements.sort((left, right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase())
            })
            break;
            case 'descByAlpha':
            filteredAnnouncements.sort((left, right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase())
            })
            break;

        }
    }

    ShowAnnouncements(filteredAnnouncements)
})

function showCategories(announcements) {
    let uniqueCategory = new Set ();
    announcements.forEach((announcement)=>{
        uniqueCategory.add(announcement.category)
    });

    uniqueCategory.forEach((category)=>{
        let option = document.createElement('option');
        option.setAttribute('value', category.toLowerCase())
        option.textContent = category;
        categorySelect.appendChild(option)
    })
}



ReadAllAnnouncement()
.then((announcements)=>{
    showCategories(announcements)
    ShowAnnouncements(announcements)
})
.catch((error) => {
    console.log(error);
})