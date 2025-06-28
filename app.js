const firebaseConfig = {
  apiKey: "AIzaSyCDIVc7ey-MTLMJ2z8SivmF7N5r935DeDA",
  authDomain: "rastreio-motoboy-db827.firebaseapp.com",
  databaseURL: "https://rastreio-motoboy-db827-default-rtdb.firebaseio.com",
  projectId: "rastreio-motoboy-db827",
  storageBucket: "rastreio-motoboy-db827.firebasestorage.app",
  messagingSenderId: "710886207691",
  appId: "1:710886207691:web:dc7db2b7f49c1376286b4e",
  measurementId: "G-NF87X0HWF0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let map;
const markers = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -5.7945, lng: -35.211 },
    zoom: 13
  });

  db.ref('motoboys').on('value', snapshot => {
    const dados = snapshot.val();
    for (const key in dados) {
      const { latitude, longitude, nome } = dados[key];
      const pos = { lat: latitude, lng: longitude };

      if (markers[key]) {
        markers[key].setPosition(pos);
      } else {
        markers[key] = new google.maps.Marker({
          position: pos,
          map: map,
          title: nome
        });
      }
    }
  });
}
window.initMap = initMap;
