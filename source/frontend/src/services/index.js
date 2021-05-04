import ServiceProgram from './programs.service';
import ServiceAlert from './alert.service';
import i18n from './i18n.service';

const Services = {
    Programs: ServiceProgram,
    ServiceAlert: ServiceAlert,
    i18n: i18n
};


export default Services;