const loadPhone = async (searchText,isShowall) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
   // console.log(phones);
    displayPhone(phones,isShowall);
}

const displayPhone = (phones,isShowall) =>{
      //console.log(phones);
      const phoneContainer = document.getElementById('phone_container');

      // clear card container cards before adding new card
      phoneContainer.textContent = '';

      //display show all buttons if there are more than 12 phones

      const showAllContainer = document.getElementById('show_all_container');

      if(phones.length > 12 && !isShowall){
      showAllContainer.classList.remove('hidden');}
      else{
          showAllContainer.classList.add('hidden');
      }
    
      // show only first 12 phones
      if(!isShowall){
        phones = phones.slice(0,12);
      }
    
    phones.forEach(phone =>{
        //console.log(phone);

        // 2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-base-100 shadow-xl`;

          // 3.set inner html
          phoneCard.innerHTML = `  <figure><img src="${phone.image}"/></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center mt-2">
              <button onclick="showDetailsBtn('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        </div>`;

    // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    toggoleLoadingSpinner(false);
}
    //handle search button
    const handleSearch = (isShowall) =>{
    toggoleLoadingSpinner(true);
    const searchField = document.getElementById('search_field') ;
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText,isShowall);
    }


    // another search field


    // const handleSearch2 = () =>{
    //   toggoleLoadingSpinner(true);
    //   const searchField = document.getElementById('search_field2') ;
    //   const searchText = searchField.value;
    //   // console.log(searchText);
    //   loadPhone(searchText);
    //   }



      // for loadingSpinner
      const toggoleLoadingSpinner = (isLoading) =>{
      const loadingSpinner = document.getElementById('loading_spinner');
      
      if(isLoading){
        loadingSpinner.classList.remove('hidden');
      }else{
        loadingSpinner.classList.add('hidden')
      }

        }

        // handle showDetails
        const showDetailsBtn = async(id) =>{
          console.log('showDetails',id);

          const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
          const data = await res.json();
          console.log(data);
          const phone = data.data;

          showPhoneDetails(phone);
        }

        // show phone details

        const showPhoneDetails = (phone) =>{
          console.log(phone);
          const phoneName = document.getElementById('show_details_phone_name');
          phoneName.innerText = phone.name;

          const showDetailsContainer = document.getElementById('show_details_container');
          showDetailsContainer.innerHTML = `
          <img src="${phone.image}" alt="">
            <p class=" text-xl">Brand:<span>${phone.brand}</span></p>
            <p class=" text-xl">Storage:${phone.mainFeatures?.storage}</p>
            <p class=" text-xl">DisplaySize:${phone.mainFeatures?.displaySize}</p>
            <p class=" text-xl">Chipset:${phone.mainFeatures?.chipSet}</p>
            <p class=" text-xl">Memory:${phone.mainFeatures?.memory}</p>
            <p class=" text-xl">Slug:${phone.slug}</p>
            
          `


          // show the modal
          show_details_modal.showModal();
        }


        //Handle show all button 
        const handleShowAll = () =>{
          handleSearch(true);
        }
loadPhone()