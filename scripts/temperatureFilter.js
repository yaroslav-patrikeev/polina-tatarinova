import { temperatureInput } from "./htmlElements.js";
import { updateRecommendations } from "./updateRecommendations.js";
import { debounce } from "./utils.js";

const debouncedUpdate = debounce(updateRecommendations, 500);

export function setTemperatureFilter() {
  temperatureInput.addEventListener("input", () => {
    debouncedUpdate();
  });
}
