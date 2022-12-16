import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "./TablePagination.css";

const TablePagination = () => {
  const [characters, setCharacters] = useState([]);
  const [infoPage, setInfoPage] = useState({});
  const [itemPagination, setItemPagination] = useState([]);

  const GetList = (page, url) => {
    let uri =
      page === null
        ? url
        : `https://rickandmortyapi.com/api/character/?page=${page}`;

    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfoPage(data.info);
      });
  };

  useEffect(() => {
    GetList(0, null);
  }, []);

  useEffect(() => {
    let items = [];
    for (let i = 1; i < infoPage.pages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={(e) => {
            GetList(parseInt(e.target.text), null);
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
    setItemPagination(items);
  }, [infoPage]);

  return (
    <div className="table-pagination-container">
      <Table striped bordered hover className="table-pagination-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Genero</th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt="foto"
                    className="table-pagination-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.species}</td>
                <td>{item.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (infoPage.prev === null) {
                GetList(0, null);
              } else {
                GetList(null, infoPage.prev);
              }
            }}
          />
          {itemPagination.map((item) => {
            return item;
          })}
          <Pagination.Next
            onClick={() => {
              if (infoPage.next === null) {
                GetList(0, null);
              } else {
                GetList(null, infoPage.next);
              }
            }}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
