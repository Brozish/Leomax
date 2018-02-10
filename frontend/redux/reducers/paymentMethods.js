import { LOAD_PAYMENT_METHODS } from 'constants';
import { OrderedMap, Record } from 'immutable';

const paymentMethods = [
  { id: '1', link: 'images/payment-cards.png', unlink: 'images/payment-cards-not.png', text: '' },
  { id: '2', link: 'images/payment-yandexmoney.png', unlink: 'images/payment-yandexmoney-not.png', text: '' },
  { id: '3', link: 'images/payment-paypal.png', unlink: 'images/payment-paypal-not.png', text: '' },
  { id: '4', link: 'images/payment-webmoney.png', unlink: 'images/payment-webmoney-not.png', text: '' },
  { id: '5', link: '', unlink: '', text: 'SMS', subText: 'Только для России' },
  { id: '6', link: 'images/payment-qiwi.png', unlink: 'images/payment-qiwi-not.png', text: '' },
  { id: '7', link: '', unlink: '', text: 'Подарочный код', subText: '' }
];

const PaymentMethodRecord = Record({
  id: null,
  link: null,
  unlink: null,
  text: null,
  subText: null
});

const defaultStateRecord = Record({
  entities: new OrderedMap({})
});

const defaultState = new defaultStateRecord();

export default (paymentMethodsState = defaultState, action) => {
  const { type } = action;

  switch (type) {
    case LOAD_PAYMENT_METHODS:
      return paymentMethods.reduce((previousState, item) => {
        return previousState.setIn(['entities', item.id], new PaymentMethodRecord(item));
      }, paymentMethodsState);
      break;
    default:
      return paymentMethodsState;
  }
}
