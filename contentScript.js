const key = "f84711e766864207915a78deab30ff5a";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);
  pc.oaddIceCandidate = pc.addIceCandidate;
  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getlocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

const getlocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}&ip=${ip}`;
  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
      .............................
      Country: ${json.country_name}
      State: ${json.state_prov}
      City: ${json.city}
      District: ${json.district}
      LAT/LONG: (${json.latitude} , ${json.longitude})
      provider: ${json.isp}
      ..................................`;
      chrome.storage.sync.clear();
      chrome.storage.sync.set({
        cn: json.country_name,
        sn: json.state_prov,
        cit: json.city,
        dis: json.district,
        lat: json.latitude,
        lon: json.longitude,
        isp: json.isp,
      });
    })
  );
};
