import { temperatureInput } from "./htmlElements.js";
import { updateRecommendations } from "./updateRecommendations.js";

export function setTemperatureFilter() {
  temperatureInput.addEventListener("input", () => {
    updateRecommendations();
  });
}
