import React from 'react';
//import MQTTConnection from './MQTT/MQTTConnection';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
//const { t, i18n } = useTranslation();
import Services from '../services';

class Main extends React.Component {
    render() {
      return (
           <h1 className="header">{Services.i18n.t('title')}</h1> 
          //<h1 className="header"><Trans i18nKey="title" /></h1> 
      );
    }
  }

  // Exporting the component
export default Main;