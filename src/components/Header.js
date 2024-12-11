import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { DEL } from "../redux/actions/Action";

const Header = () => {
  const getData = useSelector((state) => state?.cartreducer?.carts);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const del = (id) => {
    dispatch(DEL(id));
    handleClose();
  };

  const total = () => {
    let price = 0;
    let priceMulti = 0;
    getData.map((obj, i) => {
      price += obj.price;
      priceMulti = obj.qnty;
    });
    priceMulti *= price
    setTotalPrice(priceMulti);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData?.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ widht: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photos</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((data) => {
                    return (
                      <tr key={data?.id}>
                        <td>
                          <NavLink
                            to={`/cart/${data?.id}`}
                            onClick={handleClose}
                          >
                            <img
                              src={data?.imgdata}
                              alt=""
                              style={{ width: "5rem", height: "5rem" }}
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{data?.rname}</p>
                          <p>Price: ₹ {data?.price}</p>
                          <p>Quantity: {data?.qnty}</p>
                          <p
                            onClick={() => {
                              del(data?.id);
                            }}
                          >
                            <i
                              className="fas fa-trash smalltrash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            ></i>
                          </p>
                        </td>
                        <td
                          className="mt=5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            del(data?.id);
                          }}
                        >
                          <i className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    );
                  })}
                  <p className="text-center">Total : {totalPrice}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 35,
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 22 }}>Your cart is empty</p>
              <img
                src="./cart.gif"
                alt="empty cart"
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
