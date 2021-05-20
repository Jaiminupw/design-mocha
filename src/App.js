import React, { PureComponent } from 'react'
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './component/HomePage';
class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      scrollCLass: "feed"
    }
  }
  pageScroll = () => {
    this.setState({ scrollClass: 'Feed scrolling' })
    setTimeout(() => { this.setState({ scrollCLass: 'Feed' }) }, 100)
  }
  render() {
    return (
      <div className="App wrapper" onScroll={this.pageScroll}>
        <Header scroll={this.state.scrollCLass}/>
        <HomePage />
        <Footer />
      </div>
    )
  }
}

export default App

