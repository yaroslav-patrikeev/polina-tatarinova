import {
  checkbox,
  clothesElement,
  pictureElement,
  shoesElement,
  temperatureInput,
  titleHumidity,
  accessoriesElement,
} from "./htmlElements.js";
import { suggests } from "./suggests.js";
import {
  getTemperatureValue,
  getHumidityValue,
  getPrecipitationValue,
  isTemperatureValid,
  executeWithLoader,
  showResult,
  showError,
} from "./utils.js";

export function updateRecommendations() {
  executeWithLoader(() => {
    if (isTemperatureValid(temperatureInput.value)) {
      showRecommendation();
    } else {
      showError();
    }
  }, 300);
}

function showRecommendation() {
  const recommendation =
    suggests[getTemperatureValue(parseInt(temperatureInput.value))][
      getHumidityValue(titleHumidity.innerText)
    ][getPrecipitationValue(checkbox.checked)];
  clothesElement.textContent = recommendation.clothes;
  shoesElement.textContent = recommendation.shoes;
  accessoriesElement.textContent = recommendation.accessories;
  pictureElement.src = recommendation.picture;

  showResult();
}
