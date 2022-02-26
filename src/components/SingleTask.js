import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";

export function SingleTask(props) {
  const rowData = props.rowData;
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    switch (rowData.status) {
      case 1:
        setStatusColor("blue");
        break;
      case 2:
        setStatusColor("green");
        break;
      case 99:
        setStatusColor("red");
        break;
      default:
        setStatusColor("grey");
        break;
    }
  }, [statusColor]);

  return (
    <>
      <Card style={{ marginBottom: 4 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="quantity"
              style={{
                color: "ffffff",
                backgroundColor: `${statusColor}`,
              }}
            >
              {""}
            </Avatar>
          }
          title={rowData.description}
          subheader={rowData.id}
        />
        <div>
          <Box px={2} pb={1}>
            <Typography variant="caption">
              {rowData.warehouse} - {"Stelling: " + rowData.stelling} -{" "}
              {"Rek: " + rowData.rack} - {"Etage: " + rowData.level}{" "}
              {"#" + rowData.number}
              {/* TODO controleer of dit nog werkt */}
            </Typography>{" "}
          </Box>
        </div>
      </Card>
    </>
  );
}
