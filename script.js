//selecting temperature,city,date,emoji,weather,searchfield and input form for manipulations.
const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span"); 
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");
// initially default the target ie the location is Mumbai.
let target="Mumbai";
// the api is called and location which user will provide is passed as a parameter target in the fetchData function.
const fetchData=async(target)=>{ // async await is used for implementing Asynchronus methods.
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;// the url ie the api is strored in url which will display the info related to target provided.
    const response =await fetch(url);// the response will be fetched from url.
    const data = await response.json(); // the data is converted to json.

    // Destructuring of data is done here
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },// from current part of the data the text,icon and temp_c are given.
      location: { name, localtime },// from location part the name of location and the localtime are given.
    } = data;// all this are part of data given by api.
    updateDom(temp_c,name,localtime,icon,text);// the updateDom function is provided all this parameters.
    } catch (error) {
        alert("Location Not Found!!");// if location is not present in the api or other such errors come then through catch we will alert the message on the screen.
    }
};

function updateDom(temperature,city,time,emoji,text){// the updateDom function takes all those parameter provided by fetchData function.
    temperatureField.innerText=temperature+"°";
    // the Dom manipulation in temperaturField cityField is done by taking data from fetchData function provided by Weather API. 
    cityField.innerText=city;
    const exactTime=time.split(" ")[1];// the exactTime and exactDate are stored .
    const exactDate=time.split(" ")[0];
    const exactDay= new Date(exactDate).getDay();// the data provided by exactDate is in form of YY:MM:DD format from which the integer value from 0 to 6 of day created through getDay function  is an integer value which is stored in exactDay.
    dateField.innerText=`${exactTime} - ${getDayFullName( exactDay)} ${exactDate}`;// the innerText of data field will have the time, The integer value of exactDay is converted to  Sunday or Monday or such days  belonging to the integer value is stored here with help of getDayFullName function. and the exactDate is also stored here. 
    emojiField.src=emoji;// the emoji for sunny, cloud provided by Api for a location is the src of image in emojiField.
    weatherField.innerText=text;// the innerText for weatherField is text like Mist,Sunny related to the weather provide by API key.
}


fetchData(target); // the fetchData function is called with this target value. To display the weather.


function getDayFullName(num){ // the integer value is converted to the day name here which is then returned to the dataField of updateDom function. 
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return"Invalid day";
    }
}

const search=(e)=>{ // the search function is called here e and preventdefault helps to avoid refresh of screen when user submits the text.
    e.preventDefault();
    target=searchField.value;// the text provided by user in the searchField is the target which will be provide to the fetchData function.
    fetchData(target);
}

form.addEventListener("submit",search)// the eventlistner for submit is provided to call the search function which will then call the fetchData function to get value from API key for getting the Weather Update.