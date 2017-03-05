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
    console.log('this.state.ready', this.state.ready);
    if(!this.state.ready) {
      return <ProgressBar />
    } else {
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
}

export default connect(state => state)(Explore);

