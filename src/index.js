console.log('%c HI', 'color: firebrick')



function getImgs(){
  return fetch("https://dog.ceo/api/breeds/image/random/4")
  .then (res => res.json())
  .then (json => json.message)
}
function getBreeds(){
  return fetch('https://dog.ceo/api/breeds/list/all')
  .then(res => res.json())
  .then (json => json.message)
}

document.addEventListener('DOMContentLoaded', function (){
  getImgs().then(imgs => {
    imgs.forEach (element => {
      let list = document.createElement('div');
      list.innerHTML = `<img src=${element}></img>`
      document.querySelector('#dog-image-container').append(list)
    })
  })
  getBreeds().then(dogs => {
    Object.keys(dogs).forEach(element => {
      let list = document.createElement('li')
      list.innerHTML = `${element}`

      list.addEventListener('click', function(e){
        list.style.color = 'blue';
      })
      document.querySelector('#dog-breeds').append(list)
    });
  }).then(() => {
    const breedDrop = document.getElementById('breed-dropdown')
    let dogsList = document.querySelectorAll('#dog-breeds > li');
    breedDrop.addEventListener('change', (e)=>{
      let filter = e.target.value

      let filteredDogs = Array.from(dogsList).filter(element => element.innerHTML[0] === filter)
      
      document.querySelector('#dog-breeds').innerHTML = "";

      filteredDogs.forEach(dog => {
        document.querySelector('#dog-breeds').append(dog)
      })
    })
  })
})