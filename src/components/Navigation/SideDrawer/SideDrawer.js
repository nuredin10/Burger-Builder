import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxx/Auxx";

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer','Close'];
    if(props.open){
        attachedClasses = ['SideDrawer','Open']
    }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo height="10%" />
        <nav className="Logo">
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
