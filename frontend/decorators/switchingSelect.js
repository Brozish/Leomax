import React from 'react';

export default OriginalComponent => class SwitchingSelectComponents extends React.Component {
  state = {
    selectPaymentMethodId: '',
    selectPaymentDateId: ''
  };

  render() {
    return (
      <OriginalComponent
        {...this.props}
        {...this.state}
        toggleStatePaymentMethodId = {this.toggleStatePaymentMethodId}
        toggleStatePaymentDateId = {this.toggleStatePaymentDateId}
      />
    );
  }

  toggleStatePaymentMethodId = (paymentMethodId, reset) => event => {
    event.preventDefault();
    reset();
    this.setState({
      selectPaymentMethodId: paymentMethodId === this.state.selectPaymentMethodId ?
        '' : paymentMethodId
    });
  }

  toggleStatePaymentDateId = paymentDateId => event => {
    event.preventDefault();
    this.setState({
      selectPaymentDateId: paymentDateId === this.state.selectPaymentDateId ?
        '' : paymentDateId
    });
  }
}
