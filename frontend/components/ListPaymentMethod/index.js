import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import PaymentMethod from 'Components/PaymentMethod';
import { loadPaymentMethods } from 'Redux/ac/paymentMethods';

class ListPaymentMethod extends React.Component {
  static propTypes = {
    paymentMethods: PropTypes.array.isRequired,
    selectPaymentMethodId: PropTypes.string.isRequired,
    toggleStatePaymentMethodId: PropTypes.func.isRequired,
    present: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadPaymentMethods, paymentMethods } = this.props;

    if (!paymentMethods.length) loadPaymentMethods();
  }

  render() {
    const {
      paymentMethods, toggleStatePaymentMethodId: toggleState,
      selectPaymentMethodId, present, reset
    } = this.props;

    return (
      <React.Fragment>
        <Col>Выберите способ оплаты</Col>
        <Row>
          {this.getPaymentMethods(paymentMethods, toggleState, selectPaymentMethodId, present, reset)}
        </Row>
      </React.Fragment>
    );
  }

  getPaymentMethods(paymentMethods, toggleState, selectPaymentMethodId, present, reset) {
    return paymentMethods.map( item => {
      return <PaymentMethod
        key = {item.id}
        paymentMethod = {item}
        toggleState = {toggleState(item.id, reset)}
        isSelected = {item.id === selectPaymentMethodId}
        present = {present}
      />;
    });
  }
}

export default connect(null, { loadPaymentMethods })(ListPaymentMethod);
