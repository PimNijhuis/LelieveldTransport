import React from "react";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function TasksList(props) {
  return (
    <div>
      <center>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button>
            <ListItemText primary="Taak 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Taak 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Taak 3" />
          </ListItem>
        </List>
      </center>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    firstName: state.login.login_data.firstName,
    lastName: state.login.login_data.lastName,
    userId: state.login.login_data.user_id,
    logo: state.login.login_data.logo,
    zipcode: state.login.login_data.zipcode,
    city: state.login.login_data.city,
    association: state.login.login_data.association,
    company: state.login.login_data.company,
  };
}

export default connect(mapStateToProps)(TasksList);
