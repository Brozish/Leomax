import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

class Cost extends React.Component {
  static propTypes = {
    selectPaymentDateId: PropTypes.string.isRequired,
    paymentDate: PropTypes.object,
    prolongation: PropTypes.bool.isRequired,
    sale: PropTypes.bool.isRequired
  };

  render() {
    const { paymentDate, selectPaymentDateId, prolongation, sale } = this.props;

    if(!paymentDate) {
      return null;
    }

    return (
      <React.Fragment>
        <Col>Итого к оплате (за {paymentDate.date})</Col>
        {this.getSaleText(paymentDate, sale)}
        {this.getProlongationText(prolongation)}
      </React.Fragment>
    );
  }

  getProlongationText(prolongation) {
    if (!prolongation) return null;

    return <Col className = "text-muted">Далее 120 руб. в месяц</Col>;
  }

  getSaleText(paymentDate, sale) {
    let result = +paymentDate.month * +paymentDate.cost;
    let resultText = result;

    if (sale) {
      result += 150;
      resultText += ' + 150 = ' + result;
    }

    return <Col className = "result-font-size">{resultText} руб.</Col>;
  }
}

export default connect((state, ownProps) => {
  return {
    paymentDate: state.paymentDates.entities.get(ownProps.selectPaymentDateId)
  };
})(Cost);
