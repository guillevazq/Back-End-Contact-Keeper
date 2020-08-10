// Importing React and useContext
import React, {useContext} from 'react';

// Importing the Context
import AlertContext from "../../Context/Alert/AlertContext";

const Alerts = () => {

  // Initialize Context
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
      <div className={`alert alert-${alert.type}`} key={alert.id}>
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    ))
  )
}

export default Alerts;