const announcementsRow = document.getElementById('announcementsRow')


function creatAnnouncement(announcement) {

    let createdAt = new Date(announcement.createdAt)
    let divCol = document.createElement('div');
    divCol.className = 'coll-12 col-md-6 col-xl-4 ';

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
    pPrice.textContent = '€ ' + announcement.price;
    divCardBody.appendChild(pPrice);

    let h5 = document.createElement('h5');
    h5.className = 'card-title display-5 mb-0';
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
    spanCalendar.textContent = ' ' + createdAt.toLocaleDateString();
    pCalendar.appendChild(spanCalendar);
    return divCol
    // announcementsRow.appendChild(divCol)

};