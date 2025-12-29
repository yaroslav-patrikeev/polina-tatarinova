import { checkbox } from "./htmlElements.js";
import { updateRecommendations } from "./updateRecommendations.js";

export function setCheckboxFilter() {
  checkbox.addEventListener("change", function () {
    updateRecommendations();
  });
}
