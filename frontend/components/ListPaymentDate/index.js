import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import PaymentDate from 'Components/PaymentDate';
import { loadPaymentDates } from 'Redux/ac/paymentDates';

class ListPaymentDate extends React.Component {
  static propTypes = {
    paymentDates: PropTypes.array.isRequired,
    selectPaymentDateId: PropTypes.string.isRequired,
    toggleStatePaymentDateId: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadPaymentDates, paymentDates } = this.props;

    if (!paymentDates.length) loadPaymentDates();
  }

  render() {
    const { paymentDates, toggleStatePaymentDateId: toggleState, selectPaymentDateId } = this.props;

    return (
      <React.Fragment>
        <Col>Выберите способ оплаты</Col>
        <Row>
          {this.getPaymentMethods(paymentDates, toggleState, selectPaymentDateId)}
        </Row>
      </React.Fragment>
    );
  }

  getPaymentMethods(paymentDates, toggleState, selectPaymentDateId) {
    return paymentDates.map( item => {
      return <PaymentDate
        key = {item.id}
        paymentDate = {item}
        toggleState = {toggleState(item.id)}
        isSelected = {item.id === selectPaymentDateId}
      />;
    });
  }
}

export default connect(null, { loadPaymentDates })(ListPaymentDate);
