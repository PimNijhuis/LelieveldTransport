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
        tableHeader = [
          { name: "Klant", dataName: "customer" },
          { name: "Datum", dataName: "delivery_date" },
          { name: "Afhaalpunt", dataName: "pickuppoint" },
          { name: "", dataName: "arrow_button_order" },
        ];
        tableBody = props.hubOrders;

        return <Table header={tableHeader} body={tableBody} />;
      case "HubOrdersSuppliers":
        tableHeader = [
          { name: "Leverancier", dataName: "supplier" },
          { name: "Afhaalpunt", dataName: "pickuppoint" },
          { name: "Datum", dataName: "delivery_date" },
          { name: "#", dataName: "rows"},
          { name: "Bedrag", dataName: "amount" },
          { name: "", dataName: "arrow_button_order" },
        ];
        tableBody = props.hubOrdersSuppliers;
        return <Table header={tableHeader} body={tableBody} />;

      case "Products":
        tableHeader = [
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          { name: "Afhaalpunt", dataName: "pickuppoint" },
          { name: "Eenheid", dataName: "package" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Datum", dataName: "delivery_date" },
          { name: "Bedrag", dataName: "amount" },
        ];
        tableBody = props.hubProducts;
        return <Table header={tableHeader} body={tableBody} />;

      // Van Supplier
      case "HubProducts":
        tableHeader = [
          { name: "Code", dataName: "code" },
          { name: "Naam", dataName: "name" },
          // TODO hier moet eenheid maar zit niet in API
          { name: "Afhaalpunt", dataName: "pickuppoint" },
          { name: "Aantal", dataName: "quantity" },
          { name: "Datum", dataName: "delivery_date" },
        ];
        tableBody = props.suppliersHubProducts;
        return <Table header={tableHeader} body={tableBody} />;

      case "Orders":
        tableHeader = [
          { name: "Order#", dataName: "order_id" },
          { name: "Afleverdatum", dataName: "delivery_date" },
          { name: "Bedrag", dataName: "amount" },
          { name: "", dataName: "arrow_button_order" },
        ];
        tableBody = props.orders;
        return <Table header={tableHeader} body={tableBody} />;

      case "SuppliersOrders":
        tableHeader = [
          { name: "Order#", dataName: "order_number" },
          { name: "Leverancier", dataName: "supplier" },
          { name: "Afhaalpunt", dataName: "pickuppoint" },
          { name: "Datum", dataName: "delivery_date" },
          { name: "Bedrag", dataName: "amount" },
          { name: "", dataName: "arrow_button_order" },
        ];
        tableBody = props.suppliersOrders;
        return <Table header={tableHeader} body={tableBody} />;

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
