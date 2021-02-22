import React from 'react';
import classNames from 'classnames';
import {RiCodeSSlashLine,RiHeart3Fill} from "react-icons/ri";

class Disclaimer extends React.Component {
    render() {
        const Disclaimer = classNames("disclaimer","font-weight-light","align-middle", {"mini": this.props.isMinimized});

        return (
            <div className={Disclaimer} id="Discalimer" color="gray"><RiCodeSSlashLine/> with <RiHeart3Fill color="red"/> by Ghimele</div>
        );
    }
}

  // Exporting the component
export default Disclaimer;