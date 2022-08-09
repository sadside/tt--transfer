import { useEffect, useState } from "react";

const TariffsTableComponent = ({ headers, body }) => {
  return (
    <div className={"table-wrap"}>
      <table className="table-component">
        <thead>
          <tr>
            {headers.map((header) => (
              <td>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((item) => {
            return (
              <tr>
                <td>{item.city}</td>
                <td>{item.name}</td>
                <td>{item.active}</td>
                <td>{item.firstField}</td>
                <td>{item.secondField}</td>
                <td>{item.changed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TariffsTableComponent;
