function searchIpUser() {
    const url = `https://api.hgbrasil.com/weather?format=json-cors&key=SUA-CHAVE&city_name=porto_alegre,RS`;

    fetch(url, { 
        method : "GET",
    }) 
    .then(resp => resp.json())
    .then(data => {
        showResult(data);
        updateCurrentTime(); // Atualiza o horário atual ao carregar a página
    })
    .catch(error => console.error(error));
}

function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

function convertTo24HourFormat(time12h) {
    let [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier.toLowerCase() === 'pm' && hours !== '12') {
        hours = String(parseInt(hours) + 12);
    } else if (modifier.toLowerCase() === 'am' && hours === '12') {
        hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
}

const txtSearchCity = document.getElementById("txtSearchCity");

const btnSearch = document.getElementById("btnSearch");

function getData (data){
    fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=SUA-CHAVE&city_name=${data}`, { 
        method : "GET", // promise
        })
        .then(response =>response.json())
        .then(data=>{
            console.log(data);
            const { results } = data;
            
            if(data.by === 'default') {
                console.log("Default")
            alert('Por favor, digite um nome válido...');
            txtSearchCity.value='';
            const resultadoData = document.getElementById('result-data');
            resultadoData.innerHTML = '';
            }
        else {
            showResult(data)
        }        
        }).catch(erro=>{
                console.log(erro);
          });;
    }

function showResult(data) {
    console.log(data);
    const { results } = data;

    document.getElementById('city').innerHTML = `${results.city}`.toUpperCase();
    document.getElementById('temp').innerHTML = `${results.temp}`;
    document.getElementById('description').innerHTML = `${results.description}`;
    document.getElementById('rain').innerHTML = `${results.rain}`;
    document.getElementById('humidity').innerHTML = `${results.humidity}`;
    document.getElementById('cloudiness').innerHTML = `${results.cloudiness}`;
    document.getElementById('wind').innerHTML = `${results.wind_speedy}`;
    document.getElementById('sunrise').innerHTML = convertTo24HourFormat(results.sunrise);
    document.getElementById('sunset').innerHTML = convertTo24HourFormat(results.sunset);

    const conditionCode = results.condition_code;
    const musicUrl = weatherMusicMap[conditionCode] || "https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2?utm_source=generator"; // Música padrão caso não tenha mapeado // Here Comes the Sun - The Beatles

    const iframe = document.querySelector(".show-song iframe");
    iframe.src = musicUrl;
}

setInterval(updateCurrentTime, 60000); 

btnSearch.addEventListener('click', function(e){
        e.preventDefault();
        data=txtSearchCity.value;

        if(data===''){
            alert('Por favor, digite um nome válido...');
            txtSearchCity.value='';
            const resultadoData = document.getElementById('result-data');
            resultadoData.innerHTML = '';
        }else{
            getData(data);
            txtSearchCity.value='';
        }
    })
    btnSearch.addEventListener('keypress', function(e){
        
})

const weatherMusicMap = {
    "0": "https://open.spotify.com/embed/track/0nwTMzpatarzvLvtwwzdCt?utm_source=generator", // Tempestade forte // Thunderous - Stray Kids
    "1": "https://open.spotify.com/embed/track/6owwZC8gUvrBuygvOHaYXb?utm_source=generator", // Tempestade tropica // Mania de Você - Rita Lee
    "2": "https://open.spotify.com/embed/track/0Z7nGFVCLfixWctgePsRk9?utm_source=generator", // Furacão // Texas Hold'em - Beyoncé
    "3": "https://open.spotify.com/embed/track/5rTIpPWeO0IL4HWlGWrz5G?utm_source=generator", // Tempestades severas // Brianstorm - Arctic Monkeys
    "4": "https://open.spotify.com/embed/track/3hRV0jL3vUpRrcy398teAU?utm_source=generator", // Tempestades // The Night We Met - Lord Huron
    "5": "https://open.spotify.com/embed/track/75IQVo8hqI1iwVZyvkN2VT?utm_source=generator", // Misto de neve e chuva // Show Me How - Men I Trust
    "6": "https://open.spotify.com/embed/track/3HMY0r2BAdpasXMY8rseR0?utm_source=generator", // Misto chuva e gelo // Too Sweet - Hozier
    "7": "https://open.spotify.com/embed/track/5UXJzLFdBn6u9FJTCnoHrH?utm_source=generator", // Misto neve e gelo // Memories - Conan Gray
    "8": "https://open.spotify.com/embed/track/4zEvxRDaKDoFlHxK7Hy0wg?utm_source=generator", // Geada fina // Sunday - The Cranberries
    "9": "https://open.spotify.com/embed/track/6dBUzqjtbnIa1TwYbyw5CM?utm_source=generator", // Chuviscos // Lovers Rock - TV Girl
    "10": "https://open.spotify.com/embed/track/3jjsRKEsF42ccXf8kWR3nu?utm_source=generator", // Congelamento chuva // Washing Machine Heart - Mitski
    "11": "https://open.spotify.com/embed/track/6dOtVTDdiauQNBQEDOtlAB?utm_source=generator", // Alguns chuviscos // Birds of a Feather - Billie Eilish
    "12": "https://open.spotify.com/embed/track/6dOtVTDdiauQNBQEDOtlAB?utm_source=generator", // Alguns chuviscos // Birds of a Feather - Billie Eilish
    "13": "https://open.spotify.com/embed/track/3Ua0m0YmEjrMi9XErKcNiR?utm_source=generator", // Neve baixa // Like Crazy - Jimin
    "14": "https://open.spotify.com/embed/track/3HCah9Waf9Jby9gLIWN4MI?utm_source=generator", // Tempestade com neve // Eyes Without a Face - Billy Idol
    "15": "https://open.spotify.com/embed/track/3pm1X3oQBKQ4vcp3i9PWRg?utm_source=generator", // Ventania com neve // Things We Lost In The Fire - Bastille
    "16": "https://open.spotify.com/embed/track/5TTGoX70AFrTvuEtqHK37S?utm_source=generator", // Neve // No. 1 Party Anthem - Arctic Monkeys
    "17": "https://open.spotify.com/embed/track/3WSOUb3U7tqURbBSgZTrZX?utm_source=generator", // Granizo // Casual - Chapell Roan
    "18": "https://open.spotify.com/embed/track/2L7hSYdvF0CtaM6JisfKEG?utm_source=generator", // Gelo // Freeze - Stray Kids
    "19": "https://open.spotify.com/embed/track/210JJAa9nJOgNa0YNrsT5g?utm_source=generator", // Poeira // Gods - NewJeans
    "20": "https://open.spotify.com/embed/track/0uLI1jac8ZJSSRG4QJDo3J?utm_source=generator", // Neblina // Still Ill (2011 Remastered) - The Smiths
    "21": "https://open.spotify.com/embed/track/6cs7PMoobGoGVz8xZlAnXb?utm_source=generator", // Tempestade de areia // Worm Ride - Hans Zimmer
    "22": "https://open.spotify.com/embed/track/6qqdFWe7C4LsBjWbXQdsHA?utm_source=generator", // Fumacento // Dark Paradise - Lana Del Rey
    "23": "https://open.spotify.com/embed/track/0KeBzmNJR2kVbnEkSfIc36?utm_source=generator", // Vento acentuado // No Wind Resistance! - Kinneret
    "24": "https://open.spotify.com/embed/track/3ivdlmTbUSv5JN9W8Tk9V1?utm_source=generator", // Ventania // Brought the Heat Back - Enhypen
    "25": "https://open.spotify.com/embed/track/4atMrAadB7dS8xn9vfk9PQ?utm_source=generator", // Tempo frio // Fireside - Arctic Monkeys
    "26": "https://open.spotify.com/embed/track/5ji8WlqOBtVRCQK9HmHz2x?utm_source=generator", // Tempo nublado // A Little Death - The Neighbourhood
    "27": "https://open.spotify.com/embed/track/3RiPr603aXAoi4GHyXx0uy?utm_source=generator", // Tempo limpo // Hymn for the Weekend - Coldplay
    "28": "https://open.spotify.com/embed/track/5ji8WlqOBtVRCQK9HmHz2x?utm_source=generator", // Tempo nublado // A Little Death - The Neighbourhood
    "29": "https://open.spotify.com/embed/track/6C0T7QMpmeDoDkke32Ctqb?utm_source=generator", // Parcialmente nublado // Leaving Tonight - The Neighbourhood
    "30": "https://open.spotify.com/embed/track/6C0T7QMpmeDoDkke32Ctqb?utm_source=generator", // Parcialmente nublado // Leaving Tonight - The Neighbourhood
    "31": "https://open.spotify.com/embed/track/3RiPr603aXAoi4GHyXx0uy?utm_source=generator", // Tempo limpo // Hymn for the Weekend - Coldplay
    "32": "https://open.spotify.com/embed/track/0TD0ydYJuFPEaqshquDEpw?utm_source=generator", // Ensolarado // Valentina - The Hunts
    "33": "https://open.spotify.com/embed/track/0KojNZHxWdZsCHI8qvQUWD?utm_source=generator", // Estrelado // Moonstruck - Enhypen
    "34": "https://open.spotify.com/embed/track/4b4c0oH7PtrPsI86drzgFs?utm_source=generator", // Ensolarado com muitas nuvens // Chasing The Sun - The Wanted
    "35": "https://open.spotify.com/embed/track/0yljUudXzjVcGEoYmLB17X?utm_source=generator", // Misto chuva e granizo // Genesis - Grimes
    "36": "https://open.spotify.com/embed/track/2qSkIjg1o9h3YT9RAgYN75?utm_source=generator", // Ar quente // Espresso - Sabrina Carpenter
    "37": "https://open.spotify.com/embed/track/73CMRj62VK8nUS4ezD2wvi?utm_source=generator", // Tempestades isoladas // Set Fire to the Rain - Adele
    "38": "https://open.spotify.com/embed/track/6wVWJl64yoTzU27EI8ep20?utm_source=generator", // Trovoadas dispersas // Crying Lightning - Arctic Monkeys
    "39": "https://open.spotify.com/embed/track/6wVWJl64yoTzU27EI8ep20?utm_source=generator", // Trovoadas dispersas // Crying Lightning - Arctic Monkeys
    "40": "https://open.spotify.com/embed/track/5kBJH5gU89axZDauhfddpy?utm_source=generator", // Chuvas esparsas // Silent Cry - Stray Kids
    "41": "https://open.spotify.com/embed/track/0cQVqPuHQP4KEwc7ZUQmj6?utm_source=generator", // Pesados neve // Sweater Weather - The Neighbourhood
    "42": "https://open.spotify.com/embed/track/4vjvx7Zxkb4AltGcZ0BBvI?utm_source=generator", // Chuviscos com neve // Kyoto - Phoebe Bridgers
    "43": "https://open.spotify.com/embed/track/0cQVqPuHQP4KEwc7ZUQmj6?utm_source=generator", // Neve pesada // Sweater Weather - The Neighbourhood
    "44": "https://open.spotify.com/embed/track/2vPMoMDXxu9uX1igWZmXSG?utm_source=generator", // Sol com poucas nuvens // New Romantics (Taylor’s Version) - Taylor Swift
    "45": "https://open.spotify.com/embed/track/4sutLmjkVKRN6pOAMo2joC?utm_source=generator", // Chuva // Tom’s Diner - Suzanne Vega
    "46": "https://open.spotify.com/embed/track/7uoFMmxln0GPXQ0AcCBXRq?utm_source=generator", // Queda de neve // Snowman - Sia
    "47": "https://open.spotify.com/embed/track/5PxFv9yJEg9dxvbZggykro?utm_source=generator", // Tempestades isoladas // So It Goes… - Taylor Swift
    "48": "https://open.spotify.com/embed/track/0b0Dz0Gi86SVdBxYeiQcCP?utm_source=generator" // Serviço não disponível // Busy Woman - Sabrina Carpenter
  }
  

