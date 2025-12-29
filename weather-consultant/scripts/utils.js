import { loading, result, error } from "./htmlElements.js";

function hideAll() {
  result.classList.add("result_hidden");
  error.classList.remove("error_visible");
  loading.classList.remove("loading_visible");
}

export function showLoading() {
  hideAll(); 
  loading.classList.add("loading_visible");
}

export function showResult() {
  hideAll();
  result.classList.remove("result_hidden");
}

export function showError() {
  hideAll();
  error.classList.add("error_visible");
}

export function debounce(func, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
}

export function getTemperatureValue(temperature) {
  if (temperature < -10) return "cold";
  if (temperature < 10) return "cool";
  if (temperature < 25) return "warm";
  if (temperature < 40) return "hot";
  return "hot";
}

export function getHumidityValue(humidity) {
  const humidityMap = {
    низкая: "lowHumidity",
    средняя: "mediumHumidity",
    высокая: "highHumidity",
  };
  return humidityMap[humidity];
}

export function getPrecipitationValue(precipitation) {
  return precipitation ? "precipitation" : "noPrecipitation";
}

export function isTemperatureValid(value) {
  if (value === "") return false;
  const num = parseInt(value);
  return num > -40 && num < 40;
}

export function executeWithLoader(callback, delay) {
  showLoading();
  setTimeout(() => {
    callback();
  }, delay);
}
