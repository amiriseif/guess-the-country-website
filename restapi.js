let countriesData = [];
let currentCountry;
let hintCount = 0;
let sc=0;
const resultContainer = id('result');
function loadCountryAPI(){
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countriesData = data;
            loadNextCountry();
        });
}
function loadNextCountry(){
    id('txt').classList.remove('hidden');
	id('nextButton').classList.add('hidden');
	id('checkButton').classList.remove('hidden');
	id('result').innerHTML = ''; 
    hintCount = 0;
    currentCountry = getRandomCountry(countriesData);
    displayFlag(currentCountry);
    id('countryname').value = '';
}

function getRandomCountry(countries){
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function displayFlag(country){
    const flagContainer = id('flag-container');
    const img = document.createElement('img');
    img.src = country.flags.png;
    img.alt = 'Country Flag';
    flagContainer.innerHTML = ''; 
    flagContainer.appendChild(img);
}

function checkGuess(){
    
	const userGuess = id('countryname').value.trim().toLowerCase();
    const checkButton = id('checkButton');
    const nextButton = id('nextButton');

if (userGuess === currentCountry.name.common.toLowerCase()) {
		sc++;
		score(sc);
		id('forfeit').classList.add('hidden');
		id('txt').classList.add('hidden');
		display(`Congratulations!You guessed it right! `);
		getCountryDetails(currentCountry);
		display(`Congratulations!You guessed it right! `);
        nextButton.classList.remove('hidden');
        checkButton.classList.add('hidden');
    } else {
        hintCount++;
		if(hintCount===1){
		display(`Wrong answer`);
		}
        switch (hintCount) {
            case 1:
                display(`Hint:Population - ${currentCountry.population}`);
                break;
            case 2:
                display(`Hint:Continent - ${currentCountry.region}`);
                break;
            case 3:
                display(`Hint:Capital - ${currentCountry.capital[0]}`);
                break;
            case 4:
                display(`Hint:First Letter - ${currentCountry.name.common[0]}`);
                break;
            default:
                display(`Oops! Wrong guess. do you want to forfeit?`);
                
                id('forfeit').classList.remove('hidden');
        }
    }
}

function display( contenu){
    
	let discontent = document.createElement('p');
    discontent.className = 'result';
    discontent.textContent = `${contenu}`;
    resultContainer.appendChild(discontent);
	
}

function forfeit(){
    sc=0;
	score(sc);
	id('txt').classList.add('hidden');
    resultContainer.innerHTML='';
	getCountryDetails(currentCountry);
    id('checkButton').classList.add('hidden');
	id('forfeit').classList.add('hidden');
    id('nextButton').classList.remove('hidden');
}

function score(sc){
	let s=id('score');
	s.textContent="score:"+sc;
}

function getCountryDetails(country){
    resultContainer.innerHTML= `
        <div class="country-details">
            <h2>${country.name.common}</h2>
            <hr>
            <h4>Population: ${country.population}</h4>
            <h4>Region: ${country.region}</h4>
            <h4>Capital: ${country.capital}</h4>
        </div>
    `;
}


loadCountryAPI();

function id(id) {
    return document.getElementById(id);
  }