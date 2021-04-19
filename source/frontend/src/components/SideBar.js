import React from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Icons from './utilities/utils.icons';
import classNames from 'classnames';
import Disclaimer from './Disclaimer';
import UtilsDom from './utilities/utils.dom';

class SideBar extends React.Component {
    state = { isMinimized: localStorage.getItem("isMinimized"), isSelected: localStorage.getItem("isSelected") };
    ref= React.createRef();

    toggleSidebar =(e)=>{
        e.preventDefault();
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
        var items = this.ref.current.querySelectorAll('.selected');
        
        UtilsDom.UnselectItems(items);
        
        e.currentTarget.classList.add("selected");
    };

    componentDidMount(){
        var isminimized=this.state.isMinimized;

        if(!isminimized)
        {
            localStorage.removeItem("isMinimized");
        }
        else
        {
            localStorage.setItem("isMinimized",true);
        }
    }

    render() {
        const isMinimized = this.state.isMinimized;
        const isSelected = this.state.isSelected;
        const SidebarClass = classNames( "d-sm-block", "bg-light", "sidebar","collapse", {"mini": isMinimized} );
        const SidebarFooter = classNames("sidebarfooter", "fixed-bottom", "d-md-block", "bg-light", "collapse",{"mini": isMinimized});
        const SidebarTitle = classNames("SideBarTitle", {"mini": isMinimized});
        const ListItem = classNames("list-group-item-sidebar","list-group-item-action","light", "text-left", {"list-selected": isSelected});
        let SidebarButton;
        

        if(isMinimized){
            SidebarButton=<Icons.ArrowRightSLine fontSize="2em"/>;
        }
        else {
            SidebarButton=<Icons.ArrowLeftSLine fontSize="2em"/>;
        }

        return (
            <Navbar.Collapse className={SidebarClass} id="Sidebar" >
                <div className="sidebar-sticky pt-3">
                    <Accordion ref={this.ref}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className="card-header-sidebar" style={{cursor: 'pointer'}}>
                                <div className="text-left"><Icons.MiniProgramLine fontSize="2em"/><span className={SidebarTitle}>Programs</span></div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div className="list-group card-body-sidebar">
                                <Link className={ListItem} to="/RunningProgram" onClick={this.toggleSelected}><Icons.RunLine fontSize="1.5em"/><span className={SidebarTitle}>Active</span></Link>
                                <Link className={ListItem} to="/JobPrograms" onClick={this.toggleSelected}><Icons.FileHistoryLine fontSize="1.5em"/><span className={SidebarTitle}>History</span></Link>
                                <Link className={ListItem} to="/ProgramConfig" onClick={this.toggleSelected}><Icons.StackLine fontSize="1.5em"/><span className={SidebarTitle}>Configure</span></Link>
                                </div>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header}  eventKey="1" className="card-header-sidebar" style={{cursor: 'pointer'}}>
                                <div className="text-left"><Icons.ComputerLine fontSize="2em"/><span className={SidebarTitle}>System</span></div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <div className="list-group card-body-sidebar">
                                <Link className={ListItem} to="/Monitor" onClick={this.toggleSelected}><Icons.DashboardLine fontSize="1.5em"/><span className={SidebarTitle}>Monitor</span></Link>
                                <Link className={ListItem} to="/Sensors" onClick={this.toggleSelected}><Icons.SensorLine fontSize="1.5em"/><span className={SidebarTitle}>Sensors</span></Link>
                                <Link className={ListItem} to="/Info" onClick={this.toggleSelected}><Icons.InformationLine fontSize="1.5em"/><span className={SidebarTitle}>Info</span></Link>
                                </div>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <footer className={SidebarFooter} id="SidebarFooter">
                        <div className="dropdown-divider"/>
                        <div className="d-flex">
                            <Disclaimer isMinimized={this.state.isMinimized}/>
                            <div className="btn-sidebar text-right d-block mr-2 ml-auto align-middle" id="sidebarCollapse" onClick={this.toggleSidebar}>
                                {SidebarButton}
                            </div>
                        </div>
                    </footer>
                </div>
            </Navbar.Collapse>                               
        );
    }
}


  // Exporting the component
export default SideBar;