import { LOAD_PAYMENT_DATES } from 'constants';
import { OrderedMap, Record } from 'immutable';

const paymentDates = [
  { id: '1', link: 'images/card-first.png', date: '2 года', month: '24', cost: '120' },
  { id: '2', link: 'images/card-second.png', date: '1 год', month: '12', cost: '125' },
  { id: '3', link: 'images/card-third.png', date: '6 месяцев', month: '6', cost: '130' }
];

const PaymentDateRecord = Record({
  id: null,
  link: null,
  date: null,
  month: null,
  cost: null
});

const defaultStateRecord = Record({
  entities: new OrderedMap({})
});

const defaultState = new defaultStateRecord();

export default (paymentDatesState = defaultState, action) => {
  const { type } = action;

  switch (type) {
    case LOAD_PAYMENT_DATES:
      return paymentDates.reduce((previousState, item) => {
        return previousState.setIn(['entities', item.id], new PaymentDateRecord(item));
      }, paymentDatesState);
      break;
    default:
      return paymentDatesState;
  }
}
