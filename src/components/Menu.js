import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { updateCurrentType } from "../services/general/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 0
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
const whichList = (props, classes) => {
  if (props.mainHub) {
    return (
      <List component="nav" aria-label="secondary mailbox folders">
      <h4 className={(classes.text)}>Afhaalpunt</h4>
        <hr />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubOrders")}
        >
          <ListItemText primary="Bestellingen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubOrdersSuppliers")}
        >
          <ListItemText primary="Te ontvangen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("Products")}
        >
          <ListItemText primary="Te ontvangen (Producten)" />
        </ListItemLink>

        <br />
      <h4 className={(classes.text)}>Boer</h4>
        <hr />


        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("SuppliersOrders")}
        >
          <ListItemText primary="Te ontvangen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("Orders")}
        >
          <ListItemText primary="Leveringen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubProducts")}
        >
          <ListItemText primary="Leveringen (Producten)" />
        </ListItemLink>
      </List>
    );
  } else if (props.supplier) {
    return (
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("SuppliersOrders")}
        >
          <ListItemText primary="Te ontvangen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("Orders")}
        >
          <ListItemText primary="Leveringen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubProducts")}
        >
          <ListItemText primary="Leveringen (Producten)" />
        </ListItemLink>
      </List>
    );
  } else if (props.hub) {
    return (
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubOrders")}
        >
          <ListItemText primary="Bestellingen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("HubOrdersSuppliers")}
        >
          <ListItemText primary="Te ontvangen" />
        </ListItemLink>
        <Divider />
        <ListItemLink
          href="#response-list"
          onClick={() => props.updateCurrentType("Products")}
        >
          <ListItemText primary="Te ontvangen (Producten)" />
        </ListItemLink>
      </List>
    );
  }
};
function SimpleList(props) {
  const classes = useStyles();

  return <div className={classes.root}>{whichList(props, classes)}</div>;
}

function mapStateToProps(state) {
  return {
    currentType: state.general.currentType,
    mainHub: state.login.login_data.mainHub,
    hub: state.login.login_data.hub,
    supplier: state.login.login_data.supplier,
  };
}

export default connect(mapStateToProps, {
  updateCurrentType,
})(SimpleList);
