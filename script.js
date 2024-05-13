/*Trabalho API

Estuando sobre Javascript assíncrono e sobre API's em geral, obtive alguns conhecimentos que não tinha antes sobre API's
e funções assincronas. Após estudar sobre isso, aprendi sobre Promises e funções que ajudam a trabalhar com elas, que no
caso são async e await.

Com base nos estudos realizados, desenvolvi um trabalho de estudo de API's utilizando Wheater API, que é uma API que fornce
dados do clima de várias cidades ao redor do mundo. Esse trabalho carrega os dados obtidos nessa API que no caso são:
Temperatuda, Umidade e Velocidade do Vento e mostra esses dados ao usuário, utilizando DOM para manipular e apresentar os 
dados.

Existem duas funções principais nesse trabalho, a primeira delas é o getWeatherData, que acessa a API em questão e trás os
dados gerados nela, utilizei um fetch para puxar os dados juntamente com await, pois é necessário carregar as informações
primeiro, para que nos retorne uma Promise. Após isso, atribuí à uma outra variavel as informações utilizando json, e por
fim retornando a variável com oos dados em questão.

A segunda função é a getWeatherData, que também usa async pois utiliza a primeira função que também é assincrona. Essa segunda
função serve para trabalhar os dados gerados pela API, e carregá-los na tela de exibição para o usuário.

Após isso, crio um evento no botão pesquisar para pegar o valor inserido no input text, que seria o nome da cidade, e fazer
a pesquisa dessa cidade na API, para isso basta chamar a função showWeatherData, antes dessa função exibir os dados ela 
chama a outra função que realiza a pesquisa e trás seus dados, e em seguida faz a exibição.
*/


const apiKey = "801ca6b3e47eb9bc4609291f8c8c11e7"
const cityInput = document.querySelector("#city-input")
const searchInput = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

//Funcções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove("hide")
}

//Eventos
searchInput.addEventListener('click', (evento) =>{
    evento.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
})

