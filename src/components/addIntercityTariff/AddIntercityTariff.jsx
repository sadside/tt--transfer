const AddIntercityTariff = ({ setTest }) => {
  return (
    <div className="scroll-table-tariff">
      <table>
        <thead>
          <tr>
            <th height="60">Типы услуг</th>
            <th height="60">Стандарт</th>
            <th height="60">Бизнес</th>
            <th height="60">Представительский</th>
            <th height="60">Минивен</th>
          </tr>
        </thead>
      </table>
      <div className="scroll-table-body-tariff">
        <table>
          <tbody>
            <tr>
              <td className={"region transferLink"} onClick={setTest}>
                <div className={"transferLink-item"}>Трансферы (руб.)</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div>Оренбург</div>
                <div>Оренбург, вокзал</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div>Оренбург</div>
                <div>Оренбург, вокзал</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div>Оренбург</div>
                <div>Оренбург, вокзал</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddIntercityTariff;
