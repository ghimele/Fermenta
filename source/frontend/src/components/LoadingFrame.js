import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';

class LoadingFrame extends React.Component {
    
    render() {
        return (
            <Row className="justify-content-md-center loading-frame">
            <Spinner animation="border" role="status" className="mr-2">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <h2>Loading...</h2>
            </Row>             
        );
    }
}


  // Exporting the component
export default LoadingFrame;