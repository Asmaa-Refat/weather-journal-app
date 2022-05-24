
let d = new Date();
//since getMonth() start counting from 0, I incremented it
let newDate = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();

//fullURL = 'https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=2b5cda6634cf7f227279759059289c06&units=metric';

// Event listener to perform generateData() when the button is clicked /
// to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateData);

/* Function to POST data */
/* Function called by event listener */
async function generateData () 
{
    //getting the zip code from user and storing it in zip
    const zip = document.getElementById('zip').value; 
    //getting the feeling from the user and storing it in feelings
    const feelings = document.getElementById('feelings').value;
    
    try {
        //storing the temperature sent by the API in temp
        const temp = await getWeatherFromAPI(zip);
        //storing all the data ( temp from API + feeling from user + date) in overAllData
        const overAllData = await postData(temp , feelings);
        console.log(overAllData);
        // printing all the data to the HTML page 
        updataUI(overAllData);
    }
    catch(error) {
        console.log(error);
    }

};

 //fetch data from API
 /* Function to GET Web API Data*/
async function getWeatherFromAPI(zip) 
{
    try 
    {  
        const data = await (await fetch(baseURL + zip + apiKey)).json();
        //taking the tempreture only from the data sent by the API
        const temp = data.main.temp;
        return temp;
    } 
    catch(error) 
    {
        console.log(error);
    }
};

/* Function to POST data */
const postData = async (temp , feelings) => 
{
    await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  
            temp,         //temp: temp     (from API)
            feelings,    //feelings: feelings    (from user)
            date: newDate 
        })
    });

    try {
        const overAllData = await (await fetch('/all')).json();
        return overAllData;
    } 
    catch(error) {
        console.log(error);
    }
};

//function to update the UI by the project data 
/* Function to GET Project Data */
const updataUI = async (overAllData)=> {
    try {
        document.getElementById('date').innerHTML = `Date: ${overAllData.date}`;
        document.getElementById('temp').innerHTML = `tempreture: ${overAllData.temp}`;
        document.getElementById('content').innerHTML = `I feel: ${overAllData.feelings}`;
    }
    catch(error) {
        console.log(error);
    }
};