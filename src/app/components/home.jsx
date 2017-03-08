import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="fold_one">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h1 className="pt20 mb25">Collaboratively publish papers online</h1>
                <h4 className="mb40">Document creation that lets you manage versions contributors easily</h4>
                <img src="/assets/img/doc_preview.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Home);
