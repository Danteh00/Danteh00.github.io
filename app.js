const searchInput = document.querySelector('#marvel-input');
const searchBtn = document.querySelector('.btn-search');
const marvelContainer = document.querySelector('.marvel-container');

const colors = {
    Anti_Hero: '#fddfdf',
    Hero: '#DEFDE0',
    Not_Hero: '#f8d5d4'

};

const marvelCount = 64;

const initMarvel = async () => {
    for (let i = 1; i <= marvelCount; i++) {
        await getMarvel(i);
    }
};

const getMarvel = async (id) => {
    let url = `http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY&callback=callback_param=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
    let res = await fetch(url)
    let data = await res.json();
    createMarvelBox(data);
};


const createMarvelBox = (Marvel) => {
    const name = marvel.name[0].toUpperCase() + marvel.name.slice(1);
    const id = marvel.id.toString().padStart(3, '0');
    const weight = marvel.weight;
    const type = marvel.types[0].type.name;
    const color = colors[type];

    const marvelEl = document.createElement("div");
    marvelEl.classList.add('marvel-box');
        marvelEl.style.backgroundColor = `${color}`;

    marvelEl.innerHTML = `
    <img 
            src="/Deadpool${id}.png" 
            alt="${name} image"
        />
        <h4 class="marvel-name">${name}</h4>   
        <p class="marvel-id">#${id}</p>    
        <p class="marvel-type">Type: ${type}</p>
    `;

    marvelContainer.appendChild(marvelEl)

};

initMarvel();

searchInput.addEventListener("input", function(e){
    const marvelNames = document.querySelectorAll('.marvel-name');
    const search = searchInput.value.toLowerCase();
    

    

    marvelNames.forEach((marvelName) => {
        marvelName.parentElement.style.display = 'block';

        if(!marvelName.innerHTML.toLowerCase().includes(search)){

            marvelName.parentElement.style.display = 'none';
        }
    });
});
