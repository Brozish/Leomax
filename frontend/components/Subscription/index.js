import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardFooter, CardBody, Row } from 'reactstrap';

import ListPaymentMethod from 'Components/ListPaymentMethod';
import ListPaymentDate from 'Components/ListPaymentDate';
import Cost from 'Components/Cost';
import FooterInfo from 'Components/FooterInfo';
import {
  FOOTER_COMMISSION, FOOTER_COMMISSION_IMG,
  FOOTER_PAYMENTS, FOOTER_PAYMENTS_IMG
} from 'constants';
import switchingSelect from 'Decorators/switchingSelect';

class Subcription extends React.Component {
  static propTypes = {
    paymentMethods: PropTypes.array.isRequired,
    paymentDates: PropTypes.array.isRequired,
    selectPaymentMethodId: PropTypes.string.isRequired,
    selectPaymentDateId: PropTypes.string.isRequired,
    toggleStatePaymentMethodId: PropTypes.func.isRequired,
    toggleStatePaymentDateId: PropTypes.func.isRequired
  };

  state = {
    loadPaymentDates: false,
    loadCost: false
  };

  componentWillReceiveProps(nextProps) {
    const { selectPaymentMethodId, selectPaymentDateId } = nextProps;
    
    if (selectPaymentMethodId) {
      this.setState({
        loadPaymentDates: true
      });
    } else {
      return this.setState({
        loadPaymentDates: false,
        loadCost: false
      });
    }

    if (selectPaymentDateId) {
      return this.setState({
        loadCost: true
      });
    }

    this.setState({
      loadCost: false
    });
  }

  render() {
    const {
      paymentMethods, paymentDates,
      selectPaymentMethodId, selectPaymentDateId,
      toggleStatePaymentMethodId, toggleStatePaymentDateId
    } = this.props;

    return (
      <React.Fragment>
        <h1 className = "text-center">Оформление подписки</h1>
        <p className = "text-center text-muted">Спасибо, что решили стать участником клуба</p>
        <Card>
          <CardHeader className = "text-center">
            Клуб выгодных покупок
          </CardHeader>
          <CardBody>
            <ListPaymentMethod
              paymentMethods = {paymentMethods}
              selectPaymentMethodId = {selectPaymentMethodId}
              toggleStatePaymentMethodId = {toggleStatePaymentMethodId}
            />
            <hr />
            {this.getPaymentDates(paymentDates, selectPaymentDateId, toggleStatePaymentDateId)}
            <hr />
            {this.getCost(selectPaymentDateId)}
          </CardBody>
          <CardFooter>
            <Row>
              <FooterInfo src = {FOOTER_COMMISSION_IMG} text = {FOOTER_COMMISSION} />
              <FooterInfo src = {FOOTER_PAYMENTS_IMG} text = {FOOTER_PAYMENTS} />
            </Row>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }

  getPaymentDates(paymentDates, selectPaymentDateId, toggleStatePaymentDateId) {
    if (!this.state.loadPaymentDates) {
      return null;
    }

    return <ListPaymentDate
        paymentDates = {paymentDates}
        selectPaymentDateId = {selectPaymentDateId}
        toggleStatePaymentDateId = {toggleStatePaymentDateId}
      />;
  }

  getCost(selectPaymentDateId) {
    if (!this.state.loadCost) {
      return null;
    }

    return <Cost
        selectPaymentDateId = {selectPaymentDateId}
      />;
  }
}

export default connect(state => {
  return {
    paymentMethods: state.paymentMethods.entities.toArray(),
    paymentDates: state.paymentDates.entities.toArray()
  };
})(switchingSelect(Subcription));
