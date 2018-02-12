import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardFooter, CardBody, Row, Form, FormGroup, Label,
  Input, Button, Col
} from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import ListPaymentMethod from 'Components/ListPaymentMethod';
import ListPaymentDate from 'Components/ListPaymentDate';
import Cost from 'Components/Cost';
import FooterInfo from 'Components/FooterInfo';
import {
  FOOTER_COMMISSION, FOOTER_COMMISSION_IMG,
  FOOTER_PAYMENTS, FOOTER_PAYMENTS_IMG,
  PRESENT_ID, QIWI_ID, WEB_MONEY_ID,
  CHECKBOX_PRESENT, CHECKBOX_PROLONGATION, CHECKBOX_SALE,
  SUB_CHECKBOX_PROLONGATION, SUB_CHECKBOX_SALE, PROLONGATION_INFO
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
      toggleStatePaymentMethodId, toggleStatePaymentDateId,
      handleSubmit, reset, present, prolongation, sale
    } = this.props;

    return (
      <React.Fragment>
        <h1 className = "text-center">Оформление подписки</h1>
        <p className = "text-center text-muted">Спасибо, что решили стать участником клуба</p>
        <Card>
          <CardHeader className = "text-center">
            Клуб выгодных покупок
          </CardHeader>
          <Form onSubmit = {handleSubmit(this.handleSubmit(selectPaymentMethodId, selectPaymentDateId))}>
            <CardBody>
              <ListPaymentMethod
                paymentMethods = {paymentMethods}
                selectPaymentMethodId = {selectPaymentMethodId}
                toggleStatePaymentMethodId = {toggleStatePaymentMethodId}
                present = {present}
                reset = {reset}
              />
              {this.getPresent(selectPaymentMethodId)}
              <hr />
              {this.getPaymentDates(paymentDates, selectPaymentDateId, toggleStatePaymentDateId)}
              <div className = "text-muted">{PROLONGATION_INFO}</div>
              {this.getProlongation(selectPaymentMethodId, present)}
              <hr />
              {this.getCost(selectPaymentDateId, prolongation, sale)}
              {this.getSale()}
            </CardBody>
            <CardFooter>
              <Button
                color = "warning"
                type = "submit"
                size = "lg"
                className = "margin-button-submit"
                disabled = {!this.state.loadCost}
              >
                Оплатить
              </Button>
              <Row>
                <FooterInfo src = {FOOTER_COMMISSION_IMG} text = {FOOTER_COMMISSION} />
                <FooterInfo src = {FOOTER_PAYMENTS_IMG} text = {FOOTER_PAYMENTS} />
              </Row>
            </CardFooter>
          </Form>
        </Card>
      </React.Fragment>
    );
  }

  handleSubmit = (selectPaymentMethodId, selectPaymentDateId) => values => {
    // add your logic for submit
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

  getCost(selectPaymentDateId, prolongation, sale) {
    if (!this.state.loadCost) {
      return null;
    }

    return <Cost
        selectPaymentDateId = {selectPaymentDateId}
        prolongation = {prolongation}
        sale = {sale}
      />;
  }

  getPresent(selectPaymentMethodId) {
    if (+selectPaymentMethodId === PRESENT_ID) {
      return null;
    }

    return this.getField('present', templateCheckbox, CHECKBOX_PRESENT);
  }

  getProlongation(selectPaymentMethodId, present) {
    if (!this.state.loadPaymentDates ||
      +selectPaymentMethodId === QIWI_ID ||
      +selectPaymentMethodId === WEB_MONEY_ID ||
      present)
    {
      return null;
    }

    return this.getField('prolongation', templateCheckbox, CHECKBOX_PROLONGATION, SUB_CHECKBOX_PROLONGATION);
  }

  getSale() {
    if (!this.state.loadCost) {
      return null;
    }

    return this.getField('sale', templateCheckbox, CHECKBOX_SALE, SUB_CHECKBOX_SALE);
  }

  getField(name, component, messageCheckbox, subMessageCheckbox) {
    return <Field
        name = {name}
        component = {component}
        type = "checkbox"
        messageCheckbox = {messageCheckbox}
        subMessageCheckbox = {subMessageCheckbox}
      />;
  }
}

const templateCheckbox = ({input, messageCheckbox, subMessageCheckbox}) => (
  <FormGroup check>
    <Label check>
      <Input type = "checkbox" {...input} />
      {messageCheckbox}
    </Label>
    <Col className = "text-muted">{subMessageCheckbox}</Col>
  </FormGroup>
);

export default reduxForm({
  form: 'subscription-form',
  initialValues: {
    present: false,
    prolongation: false,
    sale: false
  }
})(connect(state => {
  const form = state.form['subscription-form'];

  return {
    paymentMethods: state.paymentMethods.entities.toArray(),
    paymentDates: state.paymentDates.entities.toArray(),
    present: form && form.values && form.values.present,
    prolongation: form && form.values && form.values.prolongation,
    sale: form && form.values && form.values.sale
  };
})(switchingSelect(Subcription)));
