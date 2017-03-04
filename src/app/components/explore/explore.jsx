import React from 'react';
import { connect } from 'react-redux';

// Components
import ExploreDocuments from './explore_documents.jsx';

// Store properties
import * as allDoc from '../../actions/allDocActions.jsx';


export class Explore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(allDoc.retrieveAllDocs());
  }

  render() {
    return (
      <div className="mt20 container explore-documents">
        <h1>Explore</h1>
        <hr/>
        {this.props.allDoc.allDocuments.map((docs, i) => (
          <ExploreDocuments key={i} docData={docs} />))}
      </div>
    )
  }
}

export default connect(state => state)(Explore);

