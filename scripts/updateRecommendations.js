import {
  checkbox,
  clothesElement,
  pictureElement,
  shoesElement,
  temperatureInput,
  titleHumidity,
  accessoriesElement,
  error,
  result,
} from "./htmlElements.js";
import { suggests } from "./suggests.js";

export function updateRecommendations() {
  if (
    temperatureInput.value !== "" &&
    parseInt(temperatureInput.value) > -40 &&
    parseInt(temperatureInput.value) < 40
  ) {
    const temperature = parseInt(temperatureInput.value);
    const humidity = titleHumidity.innerText;
    const precipitation = checkbox.checked;

    const temperatureValue = getTemperatureValue(temperature);
    const humidityValue = getHumidityValue(humidity);
    const precipitationValue = getPrecipitationValue(precipitation);

    const recommendation =
      suggests[temperatureValue][humidityValue][precipitationValue];

    clothesElement.textContent = recommendation.clothes;
    shoesElement.textContent = recommendation.shoes;
    accessoriesElement.textContent = recommendation.accessories;
    pictureElement.src = recommendation.picture;

    result.classList.remove("result_hidden");
    error.classList.remove("error_visible");
  } else {
    result.classList.add("result_hidden");
    error.classList.add("error_visible");
  }
}

const humidityMap = {
  низкая: "lowHumidity",
  средняя: "mediumHumidity",
  высокая: "highHumidity",
};

function getHumidityValue(humidity) {
  return humidityMap[humidity];
}

function getTemperatureValue(temperature) {
  if (temperature < -10) {
    return "cold";
  } else if (temperature < 10) {
    return "cool";
  } else if (temperature < 25) {
    return "warm";
  } else if (temperature < 40) {
    return "hot";
  }
}

function getPrecipitationValue(precipitation) {
  return precipitation ? "precipitation" : "noPrecipitation";
}
