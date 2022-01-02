import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { deepOrange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { formatPrice } from "../utils/priceUtil";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  setOrderId,
  setHubId,
  setDeliveryDate,
  setPickuppoint,
} from "../services/order/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  orange: {
    color: "ffffff",
    // color: theme.palette.getContrastText(Gray[500]),
    backgroundColor: "grey",
  },
}));

function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [redirect, setRedirect] = useState(false);
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

  const whichCard = (rowData) => {
    switch (props.currentType) {
      case "Pickup":
        return (
          <>
            <CardHeader
              avatar={
                <Avatar aria-label="quantity" className={classes.orange}>
                  {rowData.quantity}
                </Avatar>
              }
              action={
                <>
                  <Typography variant="h6">
                    {formatPrice(rowData.salesprice)}
                  </Typography>
                </>
              }
              title={rowData.name}
              subheader={rowData.package}
            />
            <div>
              <Box px={2} pb={1}>
                <Typography variant="caption">
                  {rowData.code} - {rowData.supplier}
                </Typography>{" "}
              </Box>
            </div>
          </>
        );

      case "HubOrders":
        if (window.location.hash === "#/order") {
          return (
            <>
              <CardHeader
                avatar={
                  <Avatar aria-label="quantity" className={classes.orange}>
                    {rowData.quantity}
                  </Avatar>
                }
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.salesprice)}
                    </Typography>
                  </>
                }
                title={rowData.name}
                subheader={rowData.package}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">
                    {rowData.code} - {rowData.supplier}
                  </Typography>{" "}
                </Box>
              </div>
            </>
          );
        } else {
          return (
            <>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="quantity"
                    className={classes.orange}
                  ></Avatar>
                }
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.amount)}
                    </Typography>
                  </>
                }
                title={rowData.customer}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">
                    {rowData.delivery_date} - {rowData.pickuppoint}
                  </Typography>{" "}
                </Box>
              </div>
            </>
          );
        }
      case "Products":
      case "HubProducts":
        return (
          <>
            <CardHeader
              avatar={
                <Avatar aria-label="quantity" className={classes.orange}>
                  {rowData.quantity}
                </Avatar>
              }
              action={
                <>
                  <Typography variant="h6">
                    {formatPrice(rowData.amount)}
                  </Typography>
                </>
              }
              title={rowData.name}
              subheader={rowData.supplier}
            />
            <div>
              <Box px={2} pb={1}>
                <Typography variant="caption">
                  {rowData.code} - {rowData.delivery_date} -{" "}
                  {rowData.pickuppoint}
                </Typography>{" "}
              </Box>
            </div>
          </>
        );
      case "HubOrdersSuppliers": //Te ontvangen
        if (window.location.hash === "#/order") {
          return (
            <>
              <CardHeader
                avatar={
                  <Avatar aria-label="quantity" className={classes.orange}>
                    {rowData.quantity}
                  </Avatar>
                }
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.amount)}
                    </Typography>
                  </>
                }
                title={rowData.name}
                subheader={formatPrice(rowData.salesprice)}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">
                    {rowData.code} - {rowData.supplier}
                  </Typography>{" "}
                </Box>
              </div>
            </>
          );
        } else {
          return (
            <>
              <CardHeader
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.amount)}
                    </Typography>
                  </>
                }
                title={rowData.name}
                subheader={rowData.supplier}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">
                    {rowData.delivery_date} - {rowData.pickuppoint}
                  </Typography>{" "}
                </Box>
              </div>
            </>
          );
        }
      case "Orders": //Leveringen
        if (window.location.hash === "#/order") {
          return (
            <>
              <CardHeader
                avatar={
                  <Avatar aria-label="quantity" className={classes.orange}>
                    {rowData.quantity}
                  </Avatar>
                }
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.amount)}
                    </Typography>
                  </>
                }
                title={rowData.name}
                subheader={rowData.package}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">{rowData.code}</Typography>{" "}
                </Box>
              </div>
            </>
          );
        } else {
          return (
            <>
              <CardHeader
                action={
                  <>
                    <Typography variant="h6">
                      {formatPrice(rowData.amount)}
                    </Typography>
                  </>
                }
                title={rowData.order_id}
                subheader={rowData.customer}
              />
              <div>
                <Box px={2} pb={1}>
                  <Typography variant="caption">
                    {rowData.delivery_date} - {rowData.supplier}
                  </Typography>{" "}
                </Box>
              </div>
            </>
          );
        }

      default:
        break;
    }
  };

  var isOrderScreen = window.location.hash === "#/order";

  if (redirect) {
    return <Redirect to="/order" />;
  } else if (
    //hierop moet je kunnen doorklikken naar /order
    (props.currentType === "HubOrdersSuppliers" || // Te ontvangen -> hier andere styling
      props.currentType === "Orders" ||
      props.currentType === "HubOrders") &&
    !isOrderScreen
  ) {
    return (
      <>
        {data.map((rowData) => (
          <Card
            onClick={() => {
              setData(rowData);
              setRedirect(true);
            }}
            style={{ marginBottom: 4 }}
          >
            {whichCard(rowData)}
          </Card>
        ))}
      </>
    );
  } else {
    return (
      <>
        {data.map((rowData) => (
          <Card style={{ marginBottom: 4 }}>{whichCard(rowData)}</Card>
        ))}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  currentType: state.general.currentType,
  isSingleOrder: state.general.isSingleOrder,
});

export default connect(mapStateToProps, {
  setOrderId,
  setHubId,
  setDeliveryDate,
  setPickuppoint,
})(MediaControlCard);
