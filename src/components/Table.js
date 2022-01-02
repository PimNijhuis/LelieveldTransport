import React from "react";

import { connect } from "react-redux";
import { loginAPI } from "../services/login/actions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import LazyLoad from "react-lazyload";

import { formatPrice } from "../utils/priceUtil";
import {
  setOrderId,
  setHubId,
  setDeliveryDate,
  setPickuppoint,
} from "../services/order/actions";

function TableComponent(props) {
  const [redirect, setRedirect] = React.useState(false);

  var columnsMapping = props.header;
  var data = props.body;

  const setData = (rowData) => {
    switch (props.currentType) {
      case "HubOrders":
        props.setOrderId(rowData.id);
        break;
      case "HubOrdersSuppliers":
        props.setOrderId(rowData.supplier_id);
        props.setHubId(rowData.hub);
        props.setDeliveryDate(rowData.delivery_date);
        props.setPickuppoint(rowData.pickuppoint);
        break;
      case "SuppliersOrders":
        props.setOrderId(rowData.order_number);
        break;
      case "Orders":
        props.setOrderId(rowData.order_id);
        break;
      default:
        break;
    }
  };

  const getColumnComponent = (column, rowData) => {
    switch (column.dataName) {
      case "rows":
      case "quantity":
      case "delivery_date":
      case "package":
      case "order_id":
      case "order_number":
      case "code":
        return <Box textAlign="center">{rowData[column.dataName]}</Box>;
      case "amount":
      case "salesprice":
        return (
          <Box textAlign="center">{formatPrice(rowData[column.dataName])}</Box>
        );
      //return <Box textAlign="center">{rowData[column.dataName]}</Box>;
      case "combi":
        return rowData["name"] + "\n" + rowData["supplier"];
      case "arrow_button_order":
        return (
          <Link to="/order" style={{ textDecoration: "none" }}>
            <ArrowForwardIcon
              color="primary"
              onClick={() => setData(rowData)}
            />
          </Link>
        );
      default:
        return rowData[column.dataName];
    }
  };

  var isOrderScreen = window.location.hash === "#/order";

  if (redirect) {
    return <Redirect to="/order" />;
  } else if (
    (props.currentType === "HubOrders" ||
      props.currentType === "HubOrdersSuppliers" ||
      props.currentType === "Orders" ||
      props.currentType === "SuppliersOrders") &&
    !isOrderScreen
  ) {
    return (
      <TableContainer component={Paper}>
        <Table className="table" aria-label="spanning table">
          <TableHead>
            <TableRow>
              {columnsMapping.map((column) => (
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData) => (
              <TableRow
                style={{ height: 50 }}
                key={data.id}
                onClick={() => {
                  setData(rowData);
                  setRedirect(true);
                }}
              >
                {columnsMapping.map((column) => (
                  <TableCell align="left" padding="none">
                    <LazyLoad placeholder="Loading">
                      {getColumnComponent(column, rowData)}
                    </LazyLoad>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className="table" aria-label="spanning table">
          <TableHead>
            <TableRow style={{ height: 50 }}>
              {columnsMapping.map((column) => (
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData) => (
              <TableRow key={data.id}>
                {columnsMapping.map((column) => (
                  <TableCell align="left" padding="none">
                    <LazyLoad placeholder="Loading">
                      {console.log(rowData)}
                      {getColumnComponent(column, rowData)}
                    </LazyLoad>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentType: state.general.currentType,
  isSingleOrder: state.general.isSingleOrder,
});

export default connect(mapStateToProps, {
  loginAPI,
  setOrderId,
  setHubId,
  setDeliveryDate,
  setPickuppoint,
})(TableComponent);
