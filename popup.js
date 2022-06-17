let country = document.querySelector(".country");
let container = document.querySelector(".container");
let state = document.querySelector(".state");
let city = document.querySelector(".city");
let district = document.querySelector(".district");
let lon = document.querySelector(".lon");
let lat = document.querySelector(".lat");
let isp = document.querySelector(".isp");
let btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;

    let test = document.createElement("a");
    test.href = url;

    container.style.display = "block";
    async function get() {
      await chrome.storage.sync.get(
        ["cn", "sn", "dis", "lon", "lat", "isp", "cit"],
        function (res) {
          country.textContent = `Country : ${res.cn}`;
          state.textContent = `State name : ${res.sn}`;
          city.textContent = `City name : ${res.cit}`;
          lat.textContent = `Latitude : ${res.lat}`;
          lon.textContent = `Longitude : ${res.lon}`;
          isp.textContent = `Internet Provider : ${res.isp}`;
          district.textContent = `District : ${res.dis}`;
        }
      );
    }
    get();
  });
});
