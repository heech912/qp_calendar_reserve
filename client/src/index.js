import React from "react";
import ReactDOM from "react-dom";
import CalendarHead from "./CalendarHead";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<CalendarHead />, document.getElementById("root"));
registerServiceWorker();
