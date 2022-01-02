import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import ResponseList from "../components/ResponseList";
import { updateCurrentType } from "../services/general/actions";
import { connect } from "react-redux";

function ResponseListView(props) {
  const [headerName, setHeaderName] = useState("")

  useEffect(()=>{
    switch (props.currentType) {
      case 'HubOrders':
        setHeaderName("Bestellingen")
        return
      case 'HubOrdersSuppliers':
        setHeaderName("Te ontvangen")
        break
      case 'Products':
        setHeaderName("Te ontvangen (Producten)")
        break
      case 'HubProducts':
        setHeaderName("Leveringen (Producten)")
        break
      case 'Orders':
        setHeaderName("Leveringen")
        break
      case 'SuppliersOrders':
        setHeaderName("Te ontvangen")
        break
      default:
        break;
    }
  },[props.currentType])
  
  
  return (
    <div className="pageWrapper">
      <Header title={headerName} needsDatePicker={"Yes"} />
      <div className="contentWrapper fadeInDelayed">
        <ResponseList />
      </div>
      <BottomNavBar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentType: state.general.currentType,
  };
}

export default connect(mapStateToProps, {
  updateCurrentType,
})(ResponseListView);
