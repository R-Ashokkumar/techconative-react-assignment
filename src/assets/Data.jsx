const locationData = [
  {
    lat: "11.0018115",
    long: "76.9628425",
  },
  {
    lat: "10.7860267",
    long: "79.1381497",
  },
  {
    lat: "10.804973",
    long: "78.6870296",
  },
  {
    lat: "9.9261153",
    long: "78.1140983",
  },
  {
    lat: "9.2844657",
    long: "79.3125553",
  },
  {
    lat: "28.6517178",
    long: "77.2219388",
  },
  {
    lat: "22.5414185",
    long: "88.35769124388872",
  },
  {
    lat: "19.0785451",
    long: "72.878176",
  },
  {
    lat: "12.9767936",
    long: "77.590082",
  },
];
window.navigator.geolocation.getCurrentPosition((position) => {
  locationData.unshift({
    lat: position.coords.latitude.toString(),
    long: position.coords.longitude.toString(),
  });
  console.log("Outside component - " + locationData.length);
});

export default locationData;
