import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

class Cost extends React.Component {
  static propTypes = {
    selectPaymentDateId: PropTypes.string.isRequired,
    paymentDate: PropTypes.object
  };

  render() {
    const { paymentDate, selectPaymentDateId } = this.props;

    if(!paymentDate) {
      return null;
    }

    return (
      <React.Fragment>
        <Col>Итого к оплате (за {paymentDate.date})</Col>
        <Col>{+paymentDate.month * +paymentDate.cost} руб.</Col>
      </React.Fragment>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    paymentDate: state.paymentDates.entities.get(ownProps.selectPaymentDateId)
  };
})(Cost);
