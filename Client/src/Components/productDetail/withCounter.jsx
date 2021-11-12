import React from 'react';

const withCounter = (WrappedComponent) => {
  class WithCounter extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        clickLog: []
      }
      this.incrementCount = this.incrementCount.bind(this);
    }

    incrementCount (e) {
      if(e.target.nodeName === 'SELECT') {
        return
      }
      var newClick = {
        element: e.target,
        time: new Date(),
        module: 'no idea!'
      }
      this.setState({
        clickLog: [...this.state.clickLog, newClick]
      })
    }

    render () {
      return (
        <WrappedComponent
          incrementCount={this.incrementCount}
          clickLog={this.state.clickLog}
          {...this.props} />
      )
    }
  }
  return WithCounter
}

export default withCounter;