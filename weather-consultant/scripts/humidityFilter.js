import { updateRecommendations } from "./updateRecommendations.js";
import {
  humidityFilter,
  humidityFilterDropDown,
  humidityFilterOptions,
  titleHumidity,
} from "./htmlElements.js";

export function setHumidityFilter() {
  titleHumidity.addEventListener("click", () => {
    humidityFilterDropDown.classList.toggle("custom-select__options_visible");
    humidityFilter.classList.toggle("custom-select_opened");
  });

  humidityFilterOptions.forEach(function (listItem) {
    listItem.addEventListener("click", function () {
      titleHumidity.innerText = this.innerText;

      humidityFilter.classList.remove("custom-select_opened");
      humidityFilterDropDown.classList.remove("custom-select__options_visible");

      updateRecommendations();
    });
  });

  document.addEventListener("click", (evt) => {
    if (!evt.target.closest(".weather-characteristics__filter_type_humidity")) {
      humidityFilter.classList.remove("custom-select_opened");
      humidityFilterDropDown.classList.remove("custom-select__options_visible");
    }
  });
}
