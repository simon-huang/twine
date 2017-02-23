import React from 'react';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="split-master">
          <div className="split-title mb10">Master document</div>
          <div className="split-document split-document-L">
            <h3>Abstract</h3>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id augue justo. Duis mollis convallis nibh, vitae porta odio placerat quis. Phasellus ornare leo id elit accumsan condimentum. Suspendisse fringilla metus vitae metus consequat, a euismod erat aliquam. Pellentesque sit amet placerat dui, non eleifend dui.</p>
            <br/>
            <p>Curabitur euismod felis eget bibendum iaculis. Proin cursus rutrum arcu at tincidunt. Fusce aliquet tempor purus et ultricies. Donec a metus quis nisl facilisis porta quis vehicula arcu. Ut et nulla ac purus tincidunt mattis eu ut elit. Aliquam non aliquet lorem.</p>
          </div>
        </div><div className="split-changes">
          <div className="split-title mb10">franklinjjeng’s changes</div>
          <div className="split-document">
            <h3>Abstract</h3>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id augue justo. Duis mollis convallis nibh, vitae porta odio placerat quis. Phasellus ornare leo id elit accumsan condimentum. Suspendisse fringilla metus vitae metus consequat, a euismod erat aliquam. Pellentesque sit amet placerat dui, non eleifend dui.<span className="text-addition"> Sed id suscipit urna. Morbi rhoncus est est, id efficitur odio vulputate ut. Ut ullamcorper turpis eget eros aliquet, quis efficitur nisi aliquet. Vivamus quis rhoncus erat. Suspendisse finibus arcu et magna sodales ultricies.</span></p>
            <br/>
            <p>Curabitur euismod felis eget bibendum iaculis. Proin cursus rutrum arcu at tincidunt. Fusce aliquet tempor purus et ultricies. Donec a metus quis nisl facilisis porta quis vehicula arcu. Ut et nulla ac purus tincidunt mattis eu ut elit. Aliquam non aliquet lorem.<span className="strikethrough"><span className="text-deletion"> Aliquam porttitor velit a est tincidunt dictum. Integer gravida libero nec laoreet fringilla.</span></span></p>
          </div>
        </div>
      </div>
    );
  }
}