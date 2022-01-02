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

import { formatPrice } from "../utils/priceUtil";
import {
  setOrderId,
  setHubId,
  setDeliveryDate,
} from "../services/order/actions";

function TableComponent(props) {
  // axios.defaults.headers.common["Authorization"] =
  //   "5ff3d38f-fdd1-448a-9370-0112d84c8b00";
  // axios.defaults.headers.common["Token"] =
  //   "4b3b596e-1b5b-4026-9051-eb752f818d98";

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
      case 'quantity':
      case 'delivery_date':
      case 'package':
      case 'order_id':
      case 'order_number':
      case 'code':
        return <Box textAlign="center">{rowData[column.dataName]}</Box>;
      case "amount":
      case "salesprice":
        return <Box textAlign="center">{formatPrice(rowData[column.dataName])}</Box>;
          // return <Box textAlign="center">{rowData[column.dataName]}</Box>;

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

  return (
    <TableContainer component={Paper}>
      <Table className="table" aria-label="spanning table">
        <TableHead>
          <TableRow>
            {columnsMapping.map((column) => (
              <TableCell align="left">{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData) => (
            <TableRow key={data.id}>
              {columnsMapping.map((column) => (
                <TableCell align="left" padding="none">
                  {getColumnComponent(column, rowData)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  currentType: state.general.currentType,
});

export default connect(mapStateToProps, {
  loginAPI,
  setOrderId,
  setHubId,
  setDeliveryDate,
})(TableComponent);
