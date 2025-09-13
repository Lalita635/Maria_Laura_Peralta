const APP_ID = '4090239d69cdb3874de692fd18539299';

// Función para obtener el clima a partir de la ubicación
const fetchData = position => {
    const { latitude, longitude } = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(err => {
            document.getElementById("location").innerHTML = "❌ Error al obtener datos del clima";
            console.error("Error en fetch:", err);
        });
};

// Función para mostrar los datos del clima en la página
const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    };

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    document.getElementById("loader").style.display = "none";
    document.getElementById("container").style.display = "block";
};

// Manejo de errores de geolocalización
const errorCallback = error => {
    let msg = "⚠️ Error obteniendo ubicación";
    if (error.code === error.PERMISSION_DENIED) msg = "📍 Permiso de ubicación denegado";
    if (error.code === error.POSITION_UNAVAILABLE) msg = "📡 Ubicación no disponible";
    if (error.code === error.TIMEOUT) msg = "⏳ Tiempo de espera agotado";

    document.getElementById("loader").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("location").textContent = msg;

    console.error("Geolocation error:", error);
};

// Formatear la fecha
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

// Función que se ejecuta al cargar la página
const onLoad = () => {
    document.getElementById("container").style.display = "none";
    document.getElementById("loader").style.display = "block";

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(fetchData, errorCallback, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    } else {
        document.getElementById("loader").style.display = "none";
        document.getElementById("container").style.display = "block";
        document.getElementById("location").textContent = "❌ Geolocalización no soportada";
    }
};
