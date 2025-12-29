export const suggests = {
  hot: {
    lowHumidity: {
      noPrecipitation: {
        clothes:
          "Легкая дышащая одежда: хлопковые шорты, футболка, сарафан или платье.",
        shoes: "Открытая обувь — сандалии, босоножки, кроксы",
        accessories: "Солнцезащитные очки, панама или кепка.",
        picture: "../img/the_first_option.jpeg",
      },
      precipitation: {
        clothes:
          "Легкая одежда + ветровка: футболка с шортами и легкая куртка от дождя.",
        shoes: "Закрытая непромокаемая обувь — кеды, легкие кроссовки",
        accessories: "Зонт, головной убор от солнца.",
        picture: "../img/the_second_option.jpeg",
      },
    },
    mediumHumidity: {
      noPrecipitation: {
        clothes: "Легкая дышащая одежда с хорошей вентиляцией.",
        shoes: "Открытая обувь с вентиляцией",
        accessories: "Солнцезащитные очки, головной убор.",
        picture: "../img/the_fourth_option.jpeg",
      },
      precipitation: {
        clothes: "Легкая одежда с дождевиком.",
        shoes: "Непромокаемые сандалии",
        accessories: "Зонт, полотенце.",
        picture: "../img/the_third_option.jpeg",
      },
    },
    highHumidity: {
      noPrecipitation: {
        clothes:
          "Ультра-дышащая одежда: спортивные шорты, влагоотводящая футболка, легкое платье.",
        shoes: "Вентилируемая обувь — сандалии с перфорацией, mesh-кроссовки",
        accessories: "Солнцезащитные очки, легкая кепка, бутылка воды.",
        picture: "../img/option_seven.jpeg",
      },
      precipitation: {
        clothes:
          "Быстросохнущая одежда: спортивный костюм, футболка с шортами и дождевиком.",
        shoes: "Водостойкие сандалии или быстросохнущие кроссовки",
        accessories: "Компактный зонт, полотенце, сменная футболка.",
        picture: "../img/option_five.jpeg",
      },
    },
  },
  warm: {
    lowHumidity: {
      noPrecipitation: {
        clothes:
          "Удобные слои: джинсы/чиносы, футболка с рубашкой или легким свитером.",
        shoes: "Комфортная обувь — кроссовки, мокасины, лоферы",
        accessories: "Солнцезащитные очки по желанию, легкий шарф.",
        picture: "../img/option_eight.jpeg",
      },
      precipitation: {
        clothes:
          "Практичная одежда: джинсы, футболка с водонепроницаемой ветровкой.",
        shoes: "Непромокаемые кроссовки или ботинки",
        accessories: "Зонт, небольшая сумка для защиты вещей.",
        picture: "../img/option_nine.jpeg",
      },
    },
    mediumHumidity: {
      noPrecipitation: {
        clothes: "Легкие слои: футболка с рубашкой или тонким свитером.",
        shoes: "Кроссовки или туфли",
        accessories: "Солнцезащитные очки.",
        picture: "../img/option_ten.jpeg",
      },
      precipitation: {
        clothes: "Футболка с водонепроницаемой курткой.",
        shoes: "Непромокаемая обувь",
        accessories: "Зонт, легкая шапка.",
        picture: "../img/option_eleven.jpeg",
      },
    },
    highHumidity: {
      noPrecipitation: {
        clothes:
          "Дышащие материалы: льняные брюки, хлопковая рубашка, футболка с коротким рукавом.",
        shoes: "Кожаная обувь с вентиляцией — перфорированные туфли, кеды",
        accessories: "Легкий шарф, солнцезащитные очки.",
        picture: "../img/option_twelve.jpeg",
      },
      precipitation: {
        clothes:
          "Влагоотводящая одежда: быстросохнущие брюки, футболка с непромокаемой курткой.",
        shoes: "Непромокаемые кроссовки с Gore-Tex",
        accessories: "Дождевик, зонт, сменные носки.",
        picture: "../img/option_thirteen.jpeg",
      },
    },
  },
  cool: {
    lowHumidity: {
      noPrecipitation: {
        clothes:
          "Теплые слои: джинсы, рубашка с длинным рукавом, свитер или толстовка.",
        shoes: "Закрытая обувь — кроссовки, ботинки, оксфорды",
        accessories: "Легкие перчатки, шарф по необходимости.",
        picture: "../img/option_fourteen.jpeg",
      },
      precipitation: {
        clothes:
          "Непромокаемый комплект: утепленные брюки, свитер с водонепроницаемой курткой.",
        shoes: "Водоотталкивающие ботинки или сапоги",
        accessories: "Зонт, теплый шарф, головной убор.",
        picture: "../img/option_fifteen.jpeg",
      },
    },
    mediumHumidity: {
      noPrecipitation: {
        clothes: "Теплые слои: джинсы, свитер, ветровка.",
        shoes: "Закрытая обувь — ботинки, кроссовки",
        accessories: "Шарф, легкая шапка.",
        picture: "../img/option_sixteen.jpeg",
      },
      precipitation: {
        clothes: "Утепленная непромокаемая одежда.",
        shoes: "Непромокаемые ботинки",
        accessories: "Зонт, шапка, перчатки.",
        picture: "../img/option_seventeen.jpeg",
      },
    },
    highHumidity: {
      noPrecipitation: {
        clothes:
          "Плотные дышащие слои: утепленные брюки, флисовая кофта, ветровка.",
        shoes: "Непромокаемые ботинки с утеплением",
        accessories: "Шарф, шапка, перчатки от влажного холода.",
        picture: "../img/option_eighteen.jpeg",
      },
      precipitation: {
        clothes:
          "Полная защита от влаги: термобелье, флис, непромокаемая куртка и брюки.",
        shoes: "Водонепроницаемые ботинки с мембраной",
        accessories: "Непромокаемые перчатки, шапка, зонт.",
        picture: "../img/option_nineteen.jpeg",
      },
    },
  },
  cold: {
    lowHumidity: {
      noPrecipitation: {
        clothes:
          "Многослойность: термобелье, свитер, пуховик или зимняя куртка, утепленные брюки.",
        shoes: "Теплая зимняя обувь — утепленные ботинки, сапоги",
        accessories: "Шапка, шарф, теплые варежки.",
        picture: "../img/option_twenty.jpeg",
      },
      precipitation: {
        clothes:
          "Непромокаемая зимняя одежда: термобелье, свитер, непромокаемая куртка.",
        shoes: "Непромокаемые утепленные ботинки",
        accessories: "Водоотталкивающие перчатки, шапка, шарф.",
        picture: "../img/option_twenty-one.jpeg",
      },
    },
    mediumHumidity: {
      noPrecipitation: {
        clothes: "Теплые слои: термобелье, свитер, зимняя куртка.",
        shoes: "Утепленные ботинки",
        accessories: "Шапка, шарф, перчатки.",
        picture: "../img/option_twenty-two.jpeg",
      },
      precipitation: {
        clothes: "Непромокаемая утепленная одежда.",
        shoes: "Непромокаемые утепленные ботинки",
        accessories: "Шапка, шарф, непромокаемые перчатки.",
        picture: "../img/option_twenty-three.jpeg",
      },
    },
    highHumidity: {
      noPrecipitation: {
        clothes:
          "Защита от влажного холода: термобелье, флис, пуховик с влагозащитой.",
        shoes: "Непромокаемые утепленные ботинки с мембраной",
        accessories: "Шерстяная шапка, шарф, непромокаемые перчатки.",
        picture: "../img/option_twenty-four.jpeg",
      },
      precipitation: {
        clothes:
          "Максимальная защита: термобелье, несколько слоев флиса, непромокаемая зимняя куртка.",
        shoes: "Арктические ботинки с защитой от влаги",
        accessories: "Балаклава, непромокаемые варежки, теплый шарф.",
        picture: "../img/option_twenty-five.jpeg",
      },
    },
  },
};
