const loadPhone = async (searchText ,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
    
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new  cards
    phoneContainer.textContent ='';
    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('Show-all-container')
    if (phones.length >12 && !isShowAll) {
      showAllContainer.classList.remove('hidden')
    } else {
      showAllContainer.classList.add('hidden');
    }
    console.log('is show all' ,isShowAll)

    //display only first 12 phones if not showall
    if(!isShowAll){
      phones = phones.slice(0,12);

    }
   

    phones.forEach(phones =>{
        console.log(phones)
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card  bg-base-300 p-4 shadow-xl` ;
        phoneCard.innerHTML =`
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title justify-center">${phones.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phones.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        //4 append child
        phoneContainer.appendChild(phoneCard);
    })
    //hide loading spinner
    toggleLoadingSpinner(false);

}
//
const handleShowDetail = async (id) =>{
  console.log('show details' ,id)
  //load phone data
  const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  console.log(data);
}

//handle search button
const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true);
  const searchField =document.getElementById('Search-field');
  const searchText = searchField.value;
  console.log(searchText)
  loadPhone(searchText, isShowAll )
}

const toggleLoadingSpinner =(isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () =>{
  handleSearch(true);
}
// loadPhone();