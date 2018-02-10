import React from 'react';

export default OriginalComponent => class SwitchingSelectComponents extends React.Component {
  state = {
    selectItemId: ''
  };

  render() {
    return (
      <OriginalComponent {...this.props} {...this.state} toggleState = {this.toggleState} />
    );
  }

  toggleState = itemId => event => {
    event.preventDefault();
    this.setState({
      selectItemId: itemId === this.state.selectItemId ? '' : itemId
    });
  }
}
