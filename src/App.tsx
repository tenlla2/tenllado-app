import React from "react";
import { Table } from "tenllado-lib";
import useGetDataTable from "./hooks/useGetDataTable";
import "./App.css";
import logo from "./assets/logo.png";
import Modal from "./components/modal/Modal";

const App: React.FC = () => {
  const {
    COLUMNS,
    dataFixed,
    paginationConfig,
    handleCloseDetails,
    selectedPokemon,
  } = useGetDataTable();

  return (
    <div className="app">
      <img className="pokemon-logo" src={logo} alt="Pokemon Logo" />
      <div className="pokemon-table-container">
        <Table
          columns={COLUMNS}
          data={dataFixed}
          tableClassName="pokemon-table"
          pagination={paginationConfig}
        />
      </div>
      {selectedPokemon && (
        <Modal
          show={selectedPokemon !== null}
          onClose={handleCloseDetails}
          data={selectedPokemon}
        />
      )}
    </div>
  );
};

export default App;
