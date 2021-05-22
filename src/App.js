import React, { PureComponent } from 'react'
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './component/HomePage';
class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      scroll: false
    }
  }
  pageScroll = () => {
    this.setState({scroll: true})
  }
  render() {
    return (
      <div className="App wrapper" onScroll={this.pageScroll}>
        <Header scroll={this.state.scroll}/>
        <HomePage />
        <Footer />
      </div>
    )
  }
}

export default App

