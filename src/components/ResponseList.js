import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Table from "./Table";
import {
  fetchHubOrders,
  fetchHubOrdersSuppliers,
  fetchProducts,
} from "../services/hub/actions";
import {
  fetchHubProducts,
  fetchOrders,
  fetchSuppliersOrders,
} from "../services/supplier/actions.js";
import {
  updateCurrentType,
  updateDateRange,
} from "../services/general/actions";
import Card from "../components/Card";

function ResponseList(props) {
  const usePropChangeEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
  };

  usePropChangeEffect(() => {
    if (props.hub) {
      if (props.currentType === "HubOrders") {
        props.fetchHubOrders(
          props.chosenDateRange[0],
          props.chosenDateRange[1]
        );
      } else if (props.currentType === "HubOrdersSuppliers") {
        props.fetchHubOrdersSuppliers(
          props.chosenDateRange[0],
          props.chosenDateRange[1]
        );
      } else if (props.currentType === "Products") {
        props.fetchProducts(props.chosenDateRange[0], props.chosenDateRange[1]);
      }
    }
    if (props.supplier) {
      if (props.currentType === "HubProducts") {
        props.fetchHubProducts(
          props.chosenDateRange[0],
          props.chosenDateRange[1]
        );
      } else if (props.currentType === "Orders") {
        props.fetchOrders(props.chosenDateRange[0], props.chosenDateRange[1]);
      } else if (props.currentType === "SuppliersOrders") {
        props.fetchSuppliersOrders(
          props.chosenDateRange[0],
          props.chosenDateRange[1]
        );
      }
    }
  }, [props.chosenDateRange]);

  const whichTable = () => {
    var tableHeader, tableBody;
    switch (props.currentType) {
      // Van Hub:
      case "HubOrders":
        tableBody = props.hubOrders;

        return <Card body={tableBody} />;
      case "HubOrdersSuppliers":
        tableBody = props.hubOrdersSuppliers;

        return <Card body={tableBody} />;

      case "Products":
        tableBody = props.hubProducts;
        return <Card body={tableBody} />;

      // Van Supplier
      case "HubProducts":
        tableBody = props.suppliersHubProducts;
        return <Card body={tableBody} />;

      case "Orders":
        tableBody = props.orders;
        return <Card body={tableBody} />;
      default:
        break;
    }
  };

  return <>{whichTable()}</>;
}

function mapStateToProps(state) {
  return {
    chosenDateRange: state.general.currentDateRange,
    currentType: state.general.currentType,
    hub: state.login.login_data.hub,
    supplier: state.login.login_data.supplier,
    hubOrders: state.hub.hubOrders,
    hubOrdersSuppliers: state.hub.hubOrdersSuppliers,
    hubProducts: state.hub.hubProducts, //Hoort bij HUB
    suppliersOrders: state.suppliers.suppliersOrders,
    orders: state.suppliers.orders,
    suppliersHubProducts: state.suppliers.suppliersHubProducts, //Hoort bij Suppliers
  };
}

export default connect(mapStateToProps, {
  updateCurrentType,
  updateDateRange,
  fetchHubOrders,
  fetchHubOrdersSuppliers,
  fetchProducts,
  fetchHubProducts,
  fetchOrders,
  fetchSuppliersOrders,
})(ResponseList);
