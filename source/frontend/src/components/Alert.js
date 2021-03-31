import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { alertService, AlertType } from '../services/alert.service';
import Services from '../services';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    //const history = useHistory();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = Services.ServiceAlert.AlertService.onAlert(id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        // remove 'keepAfterRouteChange' flag on the rest
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // add alert to array
                    setAlerts(alerts => ([...alerts, alert]));

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        // clear alerts on location change
        // const historyUnlisten = history.listen(() => {
        //     Services.ServiceAlert.AlertService.clear(id);
        // });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            // historyUnlisten();
        };
    }); //, []

    function removeAlert(alert) {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
                
        const alertTypeClass = {
            [Services.ServiceAlert.AlertType.Success]: 'alert alert-success',
            [Services.ServiceAlert.AlertType.Error]: 'alert alert-danger',
            [Services.ServiceAlert.AlertType.Info]: 'alert alert-info',
            [Services.ServiceAlert.AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);
        
        if (alert.fade) {
            classes.push('fade');
        }

        classes.push('alert-fermenta');
        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container">
            {alerts.map((alert, index) =>
                <div key={index} className={cssClasses(alert)}>
                    <a className="close" onClick={() => removeAlert(alert)}>&times;</a>
                    <span dangerouslySetInnerHTML={{__html: alert.message}}></span>
                </div>
            )}
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };