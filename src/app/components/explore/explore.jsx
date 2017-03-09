import React from 'react';
import { connect } from 'react-redux';

// Components
import ExploreDocuments from './explore_documents.jsx';

// Store properties
import * as allDoc from '../../actions/allDocActions.jsx';
import ProgressBar from '../modals/progressBar.jsx';


export class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentWillMount() {
    this.setState({ready: false});
    this.props.dispatch(allDoc.retrieveAllDocs());
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ready: !nextProps.loading.async});
  }

  render() {
    if(!this.state.ready) {
      return <ProgressBar />
    } else {
      return (
        <div>
          <div className="full-width-container">
            <div className="container pt30 pb30">
              <h1 className="white">Explore</h1>
              <h4 className="white mt5">Twine is a hub where writers can share their work with the world and solicit feedback, while others can fork the story and make their own variation. Explore the many researchers, authors, and professionals using Twine for their work.</h4>
            </div>
          </div>
          <div className="mt30 container explore-documents">
            {this.props.allDoc.allDocuments.map((docs, i) => (
              <ExploreDocuments key={i} docData={docs} />))}
          </div>
        </div>
      )
    }
  }
}

export default connect(state => state)(Explore);

