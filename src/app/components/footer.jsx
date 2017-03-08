import React from 'react';
import { connect } from 'react-redux';

export class Footer extends React.Component {
  
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="footer-text">
                <span className="white">Built with &#10084; in San Francisco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Footer);

