import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardFooter, CardBody, Row, Col } from 'reactstrap';

import PaymentMethod from 'Components/PaymentMethod';
import FooterInfo from 'Components/FooterInfo';
import { loadPaymentMethods } from 'Redux/ac/paymentMethods';
import { FOOTER_COMMISSION, FOOTER_COMMISSION_IMG, FOOTER_PAYMENTS, FOOTER_PAYMENTS_IMG } from 'constants';
import switchingSelect from 'Decorators/switchingSelect';

class ListPaymentMethod extends React.Component {
  static propTypes = {
    paymentMethods: PropTypes.array.isRequired,
    toggleState: PropTypes.func.isRequired,
    selectItemId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { loadPaymentMethods, paymentMethods } = this.props;

    if (!paymentMethods.length) loadPaymentMethods();
  }

  render() {
    const { paymentMethods, toggleState, selectItemId: selectPaymentMethodId } = this.props;

    return (
      <React.Fragment>
        <h1 className="text-center">Оформление подписки</h1>
        <p className="text-center text-muted">Спасибо, что решили стать участником клуба</p>
        <Card>
          <CardHeader className="text-center">
            Клуб выгодных покупок
          </CardHeader>
          <CardBody>
          <Col><b>Выберите способ оплаты</b></Col>
            <Row>
              {this.getElems(paymentMethods, toggleState, selectPaymentMethodId)}
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <FooterInfo src={FOOTER_COMMISSION_IMG} text={FOOTER_COMMISSION} />
              <FooterInfo src={FOOTER_PAYMENTS_IMG} text={FOOTER_PAYMENTS} />
            </Row>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }

  getElems(paymentMethods, toggleState, selectPaymentMethodId) {
    return paymentMethods.map( item => {
      return <PaymentMethod
        key = {item.id}
        paymentMethod = {item}
        toggleState = {toggleState(item.id)}
        isSelected = {item.id === selectPaymentMethodId}
      />;
    });
  }
}

export default connect(state => {
  return {
    paymentMethods: state.paymentMethods.entities.toArray()
  };
}, { loadPaymentMethods })(switchingSelect(ListPaymentMethod));
