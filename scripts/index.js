import "./humidityFilter.js";
import "./precipitationCheckboxFilter.js";
import { setTemperatureFilter } from "./temperatureFilter.js";
import { updateRecommendations } from "./updateRecommendations.js";
import { setHumidityFilter } from "./humidityFilter.js";
import { setCheckboxFilter } from "./precipitationCheckboxFilter.js";

setTemperatureFilter();
setHumidityFilter();
setCheckboxFilter();
updateRecommendations();
