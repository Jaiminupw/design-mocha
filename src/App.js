import React, { PureComponent } from 'react'
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './component/HomePage';
class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="App wrapper">
        <Header active="home"/>
        <HomePage />
        <Footer />
      </div>
    )
  }
}

export default App

