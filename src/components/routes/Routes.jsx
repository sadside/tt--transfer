import React from "react";
import { YMaps, Map } from "react-yandex-maps";

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  controls: [],
};

class Routes extends React.Component {
  constructor() {
    super();
    this.map = null;
  }

  onApiAvaliable(ymaps) {
    ymaps
      .route(
        [
          "Королев",
          { type: "viaPoint", point: "Мытищи" },
          "Химки",
          { type: "wayPoint", point: [55.811511, 37.312518] },
        ],
        {
          mapStateAutoApply: true,
        }
      )
      .then((route) => {
        route.getPaths().options.set({
          // в балуне выводим только информацию о времени движения с учетом пробок
          balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass(
            "$[properties.humanJamsTime]"
          ),
          // можно выставить настройки графики маршруту
          strokeColor: "0000ffff",
          opacity: 0.9,
        });

        // добавляем маршрут на карту
        this.map.geoObjects.add(route);
      });

    ymaps
      .route(["Южное Бутово", "Москва, метро Парк Культуры"], {
        multiRoute: true,
      })
      .done(
        function (route) {
          route.options.set("mapStateAutoApply", true);
          this.map.geoObjects.add(route);
        },
        function (err) {
          throw err;
        },
        this
      );
  }

  render() {
    return (
      <YMaps onApiAvaliable={(ymaps) => this.onApiAvaliable(ymaps)}>
        <Map
          state={mapState}
          instanceRef={(ref) => (this.map = ref)}
          width={"100%"}
          height={480}
        />
      </YMaps>
    );
  }
}

export default Routes;
