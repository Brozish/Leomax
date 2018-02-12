import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

export default class PaymentMethod extends React.Component {
  static propTypes = {
    paymentMethod: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      link: PropTypes.string.isRequired,
      unlink: PropTypes.string,
      text: PropTypes.string,
      subText: PropTypes.string
    }),
    toggleState: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    const { paymentMethod, toggleState, isSelected } = this.props;

    if (!paymentMethod) {
      return null;
    }

    return (
      <Col lg = {3} md = {3} sm = {6} xs = {12}>
        <div className = {this.getClassName(isSelected)} onClick = {toggleState}>
          {this.getElem(isSelected, paymentMethod)}
        </div>
      </Col>
    );
  }

  getClassName(isSelected) {
    let className = 'payment-container';

    return isSelected ? className + ' back-payment-style' : className;
  }

  getElem(isSelected, paymentMethod) {
    return paymentMethod.link ?
      <img src = {isSelected ? paymentMethod.link : paymentMethod.unlink } /> :
      <div className = "text-center">
        {paymentMethod.text}
        <div className = "text-muted">{paymentMethod.subText}</div>
      </div>;
  }
}
