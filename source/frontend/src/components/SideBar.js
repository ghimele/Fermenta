import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import useAccordionToggle from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { RiComputerLine, RiArrowLeftSLine,RiArrowRightSLine, RiDashboardLine,RiSensorLine,RiInformationLine,RiMiniProgramLine,RiRunLine,RiStackLine} from "react-icons/ri";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import classNames from 'classnames';
import Tooltip from 'react-bootstrap/Tooltip';
import Disclaimer from './Disclaimer';

class SideBar extends React.Component {
    state = { isMinimized: localStorage.getItem("isMinimized"), isSelected: localStorage.getItem("isSelected") };

    toggleSidebar = () => {
        var isminimized=this.state.isMinimized;
        isminimized=!isminimized;
        this.setState({ isMinimized: isminimized });
        this.props.isMinimized(isminimized);
        if(!isminimized)
        {
            localStorage.removeItem("isMinimized");
        }
        else
        {
            localStorage.setItem("isMinimized",true);
        }
    };

    toggleSelected = (e) => {
        e.currentTarget.classList.add("list-selected");
        // var isselected=this.state.isSelected;
        // isselected=!isselected;
        // this.setState({ isSelected: isselected});
        // localStorage.setItem("isSelected",isselected);
    };

    toggleAccordion = (e) => {
        // const decoratedOnClick = useAccordionToggle(eventKey, () =>
        //     console.log("toggle clicked")
        // );
        
    };

    render() {
        const isMinimized = this.state.isMinimized;
        const isSelected = this.state.isSelected;
        const SidebarClass = classNames( "d-md-block", "bg-light", "sidebar", "collapse",{"mini": isMinimized} );
        const SidebarFooter = classNames("sidebarfooter", "fixed-bottom", "d-md-block", "bg-light collapse",{"mini": isMinimized});
        const SidebarTitle = classNames("SideBarTitle", {"mini": isMinimized});
        const ListItem = classNames("list-group-item-sidebar","list-group-item-action","light", "text-left", {"list-selected": isSelected});
        let SidebarButton;
        

        if(isMinimized){
            SidebarButton=<RiArrowRightSLine fontSize="2em"/>;
        }
        else {
            SidebarButton=<RiArrowLeftSLine fontSize="2em"/>;
        }

        return (
            <Nav className={SidebarClass} id="Sidebar">
                <div className="sidebar-sticky pt-3">
                    <Accordion>
                    <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={this.toggleAccordion} className="card-header-sidebar" style={{cursor: 'pointer'}}>
                                <div className="text-left"><RiMiniProgramLine fontSize="2em"/><span className={SidebarTitle}>Programs</span></div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div className="list-group card-body-sidebar">
                                <a className={ListItem} href="/"><RiRunLine fontSize="1.5em"/><span className={SidebarTitle}>Active</span></a>
                                <a className={ListItem} href="/"><RiStackLine fontSize="1.5em"/><span className={SidebarTitle}>Configure</span></a>
                                </div>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header}  eventKey="1" onSelect={this.toggleAccordion} className="card-header-sidebar" style={{cursor: 'pointer'}}>
                                <div className="text-left"><RiComputerLine fontSize="2em"/><span className={SidebarTitle}>System</span></div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <div className="list-group card-body-sidebar">
                                <a className={ListItem} href="/Monitor" onClick={this.toggleSelected}><RiDashboardLine fontSize="1.5em"/><span className={SidebarTitle}>Monitor</span></a>
                                <a className={ListItem} href="/"><RiSensorLine fontSize="1.5em"/><span className={SidebarTitle}>Sensors</span></a>
                                <a className={ListItem} href="/"><RiInformationLine fontSize="1.5em"/><span className={SidebarTitle}>Info</span></a>
                                </div>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <footer className={SidebarFooter} id="SidebarFooter">
                        <div className="dropdown-divider"/>
                        <div className="d-flex">
                            <Disclaimer isMinimized={this.state.isMinimized}/>
                            <a className="btn-sidebar text-right d-block mr-2 ml-auto align-middle" id="sidebarCollapse" onClick={this.toggleSidebar}>
                                {SidebarButton}
                            </a>
                        </div>
                    </footer>
                </div>
            </Nav>                               
        );
    }
}


  // Exporting the component
export default SideBar;