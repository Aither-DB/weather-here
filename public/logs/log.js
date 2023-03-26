const myMap = L.map("checkinMap").setView([0, 0], 2);
const attribution =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>";
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  for (const item of data) {
    const marker = L.marker([item.lat,item.lon]).addTo(myMap);
    const timestamp = new Date(item.timestamp).toLocaleString();
    let text = `Request made at ${timestamp}. <br><br> The weather here at ${item.lat}&deg;, ${item.lon}&deg; was ${item.weather.summary} with a temperature of ${item.weather.temperature}&deg; C. <br><br> `;

    if (item.air.value < 0) {
      text += ` No air quality reading.`
    } else {
      text += `The concentration of particulate matter ${item.air.parameter} is ${item.air.value} ${item.air.unit} last read on ${item.lastUpdated}.`
    }

     marker.bindPopup(text);
  };
  console.log(data);
};

    //   const root = document.createElement("p");
    //   const geo = document.createElement("div");
    //   const date = document.createElement("div");

    //   geo.textContent = `${item.lat}°, ${item.lon}°`;
    //   date.textContent = new Date(item.timestamp).toLocaleString();

    //   root.append( geo, date );
    //   document.body.append(root);
    // }
