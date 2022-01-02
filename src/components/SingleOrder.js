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
import { Redirect } from "react-router-dom";
import Card from "./Card";

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
          { name: "Naam/Leverancier", dataName: "combi" },
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
          .catch((err) => {});

      case "HubOrdersSuppliers":
        setHeader([
          { name: "Code", dataName: "code" },
          { name: "Naam/Leverancier", dataName: "combi" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Prijs", dataName: "salesprice" },
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
          .catch((err) => {});

      // Supplier
      case "Orders":
      case "SuppliersOrders":
        setHeader([
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          { name: "Verpakking", dataName: "package" },
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
          .catch((err) => {});

      default:
        break;
    }
  };

  if (order) {
    switch (props.currentType) {
      case "Orders": //Leveringen
      case "SuppliersOrders":
        return (
          <>
            <h2 style={{ margin: 0 }}>{order.supplier}</h2>
            <h2 style={{ margin: 0 }}> {order.note}</h2>
            <h2 style={{ margin: 0 }}>
              {"Afleverdatum: " + order.delivery_date}
            </h2>
            <h2 style={{ margin: 0 }}>
              {"Order status: " + order.order_status}
            </h2>
            {!loading && <Card body={order.rows} />}
          </>
        );
      case "Pickup": //TODO: kieken
        return (
          <>
            <h2 style={{ margin: 0 }}>{order.customer}</h2>
            <h2 style={{ margin: 0 }}>
              {" "}
              {"Bedrag: " + formatPrice(order.amount)}
            </h2>
            <h2 style={{ margin: 0 }}>
              {"Afleverdatum: " + order.delivery_date}
            </h2>
            {!loading && <Card body={order.rows} />}
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
      case "HubOrders": //Bestellingen
        return (
          <>
            <div className="HeaderTopTextWrapper">
              <div>
                <h2 style={{ margin: 0 }}>{order.customer}</h2>
                <h3 style={{ margin: 0 }}>
                  {"Bedrag: " + formatPrice(order.amount)}
                </h3>
                <h3 style={{ margin: 0 }}>
                  {"Afleverdatum: " + order.delivery_date}
                </h3>
              </div>

              <img
                style={{ marginLeft: 20 }}
                src={props.logo}
                alt="Logo"
                className="HeaderLogo"
              />
            </div>
            <br />
            {!loading && <Card body={order.rows} />}
          </>
        );
      case "HubOrdersSuppliers": //Te ontvangen
        return (
          <>
            <h3 style={{ margin: 0 }}>{"Afhaalpunt: " + props.pickupPoint}</h3>
            <h3 style={{ margin: 0 }}>
              {"Afleverdatum: " + props.deliveryDate}
            </h3>
            {!loading && <Card body={order} />}
          </>
        );
      default:
        return <>{!loading && <Table body={order} header={header} />}</>;
    }
  } else {
    return <Redirect to="/scanner" />;
  }
}

function mapStateToProps(state) {
  return {
    currentType: state.general.currentType,
    orderId: state.order.orderId,
    deliveryDate: state.order.deliveryDate,
    pickupPoint: state.order.pickuppoint,
    hubId: state.order.hubId,
    logo: state.login.login_data.logo,
  };
}

export default connect(mapStateToProps, {
  setOrderId,
  setHubId,
  setDeliveryDate,
})(SingleOrder);
