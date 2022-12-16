import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "react-bootstrap/Table";
import "./InfiniteScrollC.css";

const InfiniteScrollC = () => {
  const [characters, setCharacters] = useState([]);
  const [infoPage, setInfoPage] = useState(null);

  const GetList = (page, url) => {
    let uri =
      page === null
        ? url
        : `https://rickandmortyapi.com/api/character/?page=${page}`;

    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        console.log("Se solicito informacion: ", data.results);
        let newData = characters.concat(data.results);
        setCharacters(newData);
        setInfoPage(data.info);
      });
  };

  useEffect(() => {
    GetList(1, null);
  }, []);

  return (
    <div className="infinite-scroll-container" id="infiniteScroll">
      {infoPage !== null ? (
        <InfiniteScroll
          dataLength={characters.length}
          next={() => {
            GetList(null, infoPage.next);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="infiniteScroll"
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Imagen </th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Genero</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        className="table-pagination-image"
                        alt="foto"
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
        </InfiniteScroll>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfiniteScrollC;
