const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
   // console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones =>{
    //console.log(phones);
    const phoneContainer = document.getElementById('phone_container');

    // clear card container cards before adding new card
    phoneContainer.textContent = '';



    // // //display show all buttons if there are more than 12 phones
    // const showAllContainer = document.getElementById('show_all_container');

    // if(phones.length > 12){
    // showAllContainer.classList.remove('hidden');}
    // else{
    //     showAllContainer.classList.add('hidden');
    // }

    // show only first 12 phones
    //phones = phones.slice(0,12);


    
    phones.forEach(phone =>{
        console.log(phone);

        // 2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-base-100 shadow-xl`;

        // 3.set inner html
        phoneCard.innerHTML = `  <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>`;

    // 4. append child
        phoneContainer.appendChild(phoneCard);
    })
}
    //handle search button
    const handleSearch = () =>{
    const searchField = document.getElementById('search_field') ;
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
    }
    // another search field
    const handleSearch2 = () =>{
        const searchField = document.getElementById('search_field2') ;
        const searchText = searchField.value;
       // console.log(searchText);
        loadPhone(searchText);
        }
//loadPhone();