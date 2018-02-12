import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

export default class PaymentDate extends React.Component {
  static propTypes = {
    paymentDate: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      link: PropTypes.string.isRequired,
      date: PropTypes.string,
      month: PropTypes.string,
      cost: PropTypes.string
    }),
    toggleState: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    const { paymentDate, toggleState, isSelected } = this.props;

    if (!paymentDate) {
      return null;
    }

    return (
      <Col lg = {3} md = {3} sm = {6} xs = {12}>
        <Row className = {this.getClassName(isSelected)} onClick = {toggleState}>
          {this.getElem(isSelected, paymentDate)}
        </Row>
      </Col>
    );
  }

  getClassName(isSelected) {
    let className = 'payment-container text-left';

    return isSelected ? className + ' back-payment-style' : className;
  }

  getElem(isSelected, paymentDate) {
    return (
      <React.Fragment>
        <Col xs = {12}>{paymentDate.date}</Col>
        <Col className = "color-payment-date-rezult" xs = {12}>{+paymentDate.month * +paymentDate.cost}</Col>
        <Col className = "payment-date-font-size" xs = {12}>{paymentDate.cost} руб./мес.</Col>
        <img className = "card-style" src = {paymentDate.link} />
      </React.Fragment>
    );
  }
}
