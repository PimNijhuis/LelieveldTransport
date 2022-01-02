import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "../components/Table";
import {
  setOrderId,
  setHubId,
  setDeliveryDate,
} from "../services/order/actions";
import axios from "axios";
import { formatPrice } from "../utils/priceUtil";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function SingleOrder(props) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    fetchData();
    // disable fetchAll dependency warning
    // eslint-disable-next-line
  }, [props.orderId]);

  const fetchData = async () => {
    var requestData;
    switch (props.currentType) {
      // Hub
      case "Pickup":
      case "HubOrders":
        setHeader([
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          { name: "Leverancier", dataName: "supplier" },
          { name: "Eenheid", dataName: "package" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Prijs", dataName: "salesprice" },
        ]);
        requestData = {
          id: props.orderId,
        };

        return axios
          .post("/hub_order", requestData)
          .then((response) => {
            const response_data = response.data; // debug voor te veel producten. We moeten pagina's inbrengen.
            setOrder(response_data);
            setLoading(false);
          })
          .catch((err) => {
            // console.log("Fetching order data in SingleOrder.js went wrong... ");
          });

      case "HubOrdersSuppliers":
        setHeader([
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          { name: "Leverancier", dataName: "supplier" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Prijs", dataName: "salesprice" },
          { name: "Amount", dataName: "amount" }, // TODO dit moet package zijn, maar zit niet in API
        ]);
        requestData = {
          delivery_date: props.deliveryDate,
          id: props.orderId,
          hub: props.hubId,
        };

        return axios
          .post("/hub_orders_leverancier", requestData)
          .then((response) => {
            const response_data = response.data; // debug voor te veel producten. We moeten pagina's inbrengen.
            setOrder(response_data);
            setLoading(false);
          })
          .catch((err) => {
            // console.log("Fetching order data in SingleOrder.js went wrong... ");
          });

      // Supplier
      case "Orders":
      case "SuppliersOrders":
        setHeader([
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          { name: "Package", dataName: "package" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Prijs", dataName: "salesprice" },
        ]);

        requestData = {
          order_id: props.orderId,
        };

        return axios
          .post("/order", requestData)
          .then((response) => {
            const response_data = response.data; // debug voor te veel producten. We moeten pagina's inbrengen.
            setOrder(response_data);
            setLoading(false);
          })
          .catch((err) => {
            // console.log("Fetching order data in SingleOrder.js went wrong... ");
          });

      default:
        break;
    }
  };

  switch (props.currentType) {
    case "Orders":
    case "SuppliersOrders":
      return (
        <>
          <h2>{order.supplier}</h2>
          <h2>{order.note}</h2>
          <h2>{"Afleverdatum: " + order.delivery_date}</h2>
          <h2>{"Order status: " + order.order_status}</h2>
          {!loading && <Table body={order.rows} header={header} />}
        </>
      );
    case "Pickup":
      return (
        <>
          <h2>{order.customer}</h2>
          <h2>{"Bedrag: " + formatPrice(order.amount)}</h2>
          <h2>{"Afleverdatum: " + order.delivery_date}</h2>
          {!loading && <Table body={order.rows} header={header} />}
          <br />
          <div align="center">
            <Link to="/sign-order" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="contained">
                {"Order afmelden"}
              </Button>
            </Link>
          </div>
        </>
      );
    case "HubOrders":
      return (
        <>
          <h2>{order.customer}</h2>
          <h2>{"Bedrag: " + formatPrice(order.amount)}</h2>
          <h2>{"Afleverdatum: " + order.delivery_date}</h2>
          {!loading && <Table body={order.rows} header={header} />}
        </>
      );
    case "HubOrdersSuppliers":
      return <>{!loading && <Table body={order} header={header} />}</>;
    default:
      return <>{!loading && <Table body={order} header={header} />}</>;
  }
}

function mapStateToProps(state) {
  return {
    currentType: state.general.currentType,
    orderId: state.order.orderId,
    deliveryDate: state.order.deliveryDate,
    hubId: state.order.hubId,
  };
}

export default connect(mapStateToProps, {
  setOrderId,
  setHubId,
  setDeliveryDate,
})(SingleOrder);
