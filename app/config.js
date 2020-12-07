
//GET API ----- 
const doGet = (url) =>{
  const promiseCallback = (resolve, reject) =>{
    fetch(url)
      .then((response) =>{
        if(!response.ok) throw new Error('API ERROR ' + response.status );
          return response.json();
      })
      .then(resolve)
      .catch(reject);
  }
  return new Promise(promiseCallback)
}

//CEP DADOS ------
function cepcalc() {

  var cep = document.getElementById("inputcep");
  var cepform = document.getElementById("cepform")
  if (cep.value != "") {
    doGet('https://brasilapi.com.br/api/cep/v1/'+cep.value).then((data)=>{
      cepform.innerHTML = '\
      <tr>\
          <li class="list-group-item"> Estado: ' + data.state + '</li>\
          <li class="list-group-item"> Cidade: ' + data.city + '</li>\
          <li class="list-group-item"> Vizinhança: ' + data.neighborhood + '</li>\
          <li class="list-group-item"> Rua: ' + data.street + '</li>\
      </tr>';
    }).catch(cepform.innerHTML = '<li class="list-group-item">Erro ao localizar CEP</li>')
  }

}
//DOLAR PREÇO---------------
  doGet('https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL').then((data)=>{
  b = data.BTC.low
  bitcoin = parseFloat(b).toFixed(0);
  d = data.USD.low
  dolar = parseFloat(d).toFixed(2);
  e = data.EUR.low
  euro = parseFloat(e).toFixed(2);
  document.getElementById("btc").innerHTML = bitcoin
  document.getElementById("usd").innerHTML = dolar
  document.getElementById("eur").innerHTML = euro
  }).catch()


//SERVIÇO IP ---------
ip_key = 'b22291d6fa162c8c8dc896306108da7a'

fetch('https://api.ipify.org/?format=json')
	.then(results => results.json())
	.then(data => {
		doGet('http://api.ipstack.com/'+data.ip+'?access_key='+ip_key).then((data)=>{
      var userIP = document.getElementById("userIP");
      userIP.innerHTML = data.ip
      document.getElementById("continente").innerHTML = data.continent_name
      document.getElementById("pais").innerHTML = data.country_name
      document.getElementById("bandeira").src = data.location.country_flag;
      document.getElementById("estado").innerHTML = data.region_name
      document.getElementById("cidade").innerHTML = data.city
      //mapa------
      var map = L.map('map').setView([data.latitude,data.longitude], 14);
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wYuPziHl6FIHlRKu1MIP',{
      attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map)
      var marker = L.marker([data.latitude, data.longitude]).addTo(map);
      //--------
  }).catch()
	});
//-------