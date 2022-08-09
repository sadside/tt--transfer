import "./applications.scss";

const Applications = () => {
  return (
    <div className={"applications-wrap"}>
      <div style={{ fontWeight: 400, marginBottom: 20 }}>Новые заявки</div>
      <ul>
        <li>
          <div className={"transfer-item"}>
            <div className="transfer-number">Трансфер №123</div>
            <div className="transfer-value">Оренбург - Москва</div>
          </div>
        </li>
        <li>
          <div className={"transfer-item"}>
            <div className="transfer-number">Трансфер №123</div>
            <div className="transfer-value">Оренбург - Москва</div>
          </div>
        </li>
        <li>
          <div className={"transfer-item"}>
            <div className="transfer-number">Трансфер №123</div>
            <div className="transfer-value">Оренбург - Москва</div>
          </div>
        </li>
        <li>
          <div className={"transfer-item"}>
            <div className="transfer-number">Трансфер №123</div>
            <div className="transfer-value">Оренбург - Москва</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Applications;
