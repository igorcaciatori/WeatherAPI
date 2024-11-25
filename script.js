document.getElementById("cityForm").addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const URL = ` http://api.weatherapi.com/v1/current.json?key=150cb0132d10454abd9192916242511&q=${city}&aqi=no&lang=pt`
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar o CEP");
        }
        const data = await response.json();
        if (data.erro) {
            alert("CEP não encontrado");
            return;
        }
        document.getElementById("name").textContent = `Cidade: ${data.location.name}`;
        document.getElementById("region").textContent = `Região: ${data.location.region}`;
        document.getElementById("lastUpdated").textContent = `Atualizado às ${data.current.last_updated}`;
        document.getElementById("weatherIcon").src = `${data.current.condition.icon}`;
        document.getElementById("condition").textContent = `Condição: ${data.current.condition.text}`;
        document.getElementById("humidity").textContent = `Umidade: ${data.current.humidity}%`;
        document.getElementById("heatIndexCelcius").textContent = `Temperatura: ${data.current.temp_c}°C`;
        document.getElementById("feelslikeCelcius").textContent = `Sensação térmica: ${data.current.feelslike_c}°C`;
        document.getElementById("windKph").textContent = `Vento: ${data.current.wind_kph} km/h`;
    } catch (e) {
        alert(`Erro: ${e.message}`)
    }
});