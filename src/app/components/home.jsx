import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect(e) {
    e.preventDefault();
    browserHistory.push(e.target.name);
  }

  render() {
    return (
      <div className="home-page">
        <div className="fold-one">
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
        <div className="fold-two">
          <div className="container">
            <div className="row">
              <div className="col-sm-9 col-centered text-center pt50 pb50">
                <h1 className="pt20 mb25">A connected space to create together</h1>
                <h4 className="mb40">Twine is a hub where writers can share their work with the world and solicit feedback, while others can fork the story and make their own variation. Explore the many researchers, authors, and professionals using Twine for their work.</h4>
                <a onClick={this.redirect} className="btn-explore btn" name="/explore">Explore Work on Twine</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Home);
