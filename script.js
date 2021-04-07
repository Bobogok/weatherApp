window.onload = function() {
    let temperatureTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.degree');
    let temperatureDescription = document.querySelector('.description');
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');
    let weatherIcon = document.querySelector('.icon');
    // let city = prompt('Введите свой город...', '');
    let city = 'Москва';

    const proxy = 'http://cors-anywhere.herokuapp.com/'
    const url = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6cb7ba9fa0a38d642a3fa0570505731d`;

    fetch(url) // вызвать промис / это простой GET-запрос, скачивающий содержимое по адресу url
        .then(response => response.json()) // вызвать без await
        .then(data => {
            console.log(data);
            const main_temp = data.main.temp;
            const { description, main, icon } = data.weather['0'];
            const main_city = data.name;
            // Set Elements from the API
            temperatureDegree.textContent = main_temp;
            temperatureDescription.textContent = main + ' / ' + description;
            temperatureTimezone.textContent = main_city;
            // Set Icon
            setIcon(icon, weatherIcon);

            convertToClick(temperatureDegree, temperatureSpan, temperatureSection, main_temp);
        })
        .catch(err => alert(err));
};


function setIcon(icon, docIcon) {
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return docIcon.src = iconUrl;
};


/**
 * Convert celsius to fahrenheit and show value with sign.
 *
 * @param {number} temperatureValue tag HTML with value temperature.
 * @param {string} temperatureSign tag HTML with sign temperature, like C(celsius) or F(Fahrenheit).
 * @param {Objest} temperatureSign link on querySelector. 
 * @param {number} main_temp temp
 * @return {number} converted element.
 */
function convertToClick(temperatureValue, temperatureSign, section, main_temp) {

    let celsiusToFahrenheit = function(main_temp) {
        return (main_temp * (5 / 9)) + 32;
    };

    return section.addEventListener('click', () => {
        if (temperatureSign.textContent === 'C') {
            temperatureSign.textContent = 'F';
            temperatureValue.textContent = celsiusToFahrenheit(main_temp).toFixed(1);
        } else {
            temperatureSign.textContent = 'C';
            temperatureValue.textContent = main_temp.toFixed(1);
        }
    });
};