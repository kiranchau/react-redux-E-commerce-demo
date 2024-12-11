import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Carddata from "./CardData";
import "./style.css";

const Cart = () => {
  const [data, setData] = useState(Carddata);
  return (
    <div className="container mt-3">
      <h2 className="text-center">Add To Cart Projects</h2>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((cards, i) => {
          return (
            <>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-2 card_style"
                key={cards?.id}
              >
                <Card.Img
                  variant="top"
                  src={cards?.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{cards?.rname}</Card.Title>
                  <Card.Text>Price : ₹ {cards?.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button variant="primary" className="col-lg-12">Add To Cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
