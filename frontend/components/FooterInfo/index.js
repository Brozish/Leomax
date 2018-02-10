import React from 'react';
import PropTypes from 'prop-types';
import { Col, Media } from 'reactstrap';

export default class FooterInfo extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    const { src, text } = this.props;

    return (
      <Col>
        <Media>
          <Media left className="align-self-center mr-3">
            <Media object src={src} />
          </Media>
          <Media body>
            {text}
          </Media>
        </Media>
      </Col>
    );
  }
}
