import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./RyckYMorty.css";

const RickYMortyList = () => {
  const [list, setList] = useState([]);

  const GetRickYMortyList = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setList(response.results);
      });
  };

  useEffect(() => {
    GetRickYMortyList();
  }, []);

  return list?.map((item) => {
    return (
      <Card className="rickymorty-element" key={item.id}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
        </Card.Body>
      </Card>
    );
  });
};

export default RickYMortyList;
