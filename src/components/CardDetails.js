import React, { useEffect, useState } from "react";
import "./style.css";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD, DEL, REMOVE } from "../redux/actions/Action";

const CardDetails = () => {
  const { id } = useParams();
  const getData = useSelector((state) => state.cartreducer.carts);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    compare();
  }, [id]);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e?.id == id;
    });
    setData(compareData);
  };

  const del = (id) => {
    dispatch(DEL(id));
    history("/");
  };

  const addData = (e) => {
    dispatch(ADD(e));
  };

  const removeData = (e) => {
    if (e.qnty >= 2) {
      dispatch(REMOVE(e));
    } else {
      dispatch(DEL(e.id));
      history("/");
    }
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        {data.map((obj) => {
          return (
            <section className="container mt-3">
              <div className="iteamsdetails">
                <div className="items_img">
                  <img src={obj.imgdata} alt="" />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <strong>Restaurant</strong> : {obj.rname}
                        </p>
                        <p>
                          <strong>Price</strong> : ₹ {obj.price}
                        </p>
                        <p>
                          <strong>Dishes</strong> : {obj.address}
                        </p>
                        <p>
                          <strong>Total</strong> : ₹ {obj.price * obj.qnty}
                        </p>
                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            width: 100,
                            cursor: "pointer",
                            background: "#ddd",
                            color: "#111",
                          }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => removeData(obj)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span style={{ fontSize: 22 }}> {obj.qnty} </span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => addData(obj)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Rating</strong> :{" "}
                          <span
                            style={{
                              background: "green",
                              color: "#fff",
                              padding: "2px 5px",
                              borderRadius: "5px",
                            }}
                          >
                            {obj.rating} ★
                          </span>
                        </p>
                        <p>
                          <strong>Order Review</strong> :{" "}
                          <span>{obj.somedata}</span>
                        </p>
                        <p>
                          <strong>Remove</strong> :{" "}
                          <span>
                            <i
                              className="fas fa-trash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => del(obj.id)}
                            ></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default CardDetails;
