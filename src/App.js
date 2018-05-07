import React, { Component } from 'react';
import pushbullet from './utils/pushbullet'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    let commonKeys = []
    if (localStorage.getItem('commonKeys')) {
      commonKeys = JSON.parse(localStorage.getItem('commonKeys'))
    }
    this.state = {
      url: '',
      key: '',
      token: localStorage.getItem('token')||'',
      commonKeys:commonKeys,
    }
  }

  // Handlers:
  onChromePrev() {
    pushbullet.sendText('CHROME_PREV_PAGE').then(console.log).catch(console.error)
  }
  onChromeNext() {
    pushbullet.sendText('CHROME_NEXT_PAGE').then(console.log).catch(console.error)
  }
  onChromeClose() {
    pushbullet.sendText('CHROME_CLOSE_PAGE').then(console.log).catch(console.error)
  }
  onChromeOpenPage = ()=> {
    console.log('open:', this.state.url)
    pushbullet.sendText(`CHROME_OPEN_PAGE ${this.state.url}`).then(console.log).catch(console.error)
  }
  onTapKey = ()=> {
    console.log('tap key:', this.state.key)
    pushbullet.sendText(`TAP_KEY ${this.state.key}`).then(console.log).catch(console.error)
    const newKeys = this.state.commonKeys.includes(this.state.key) ?
      this.state.commonKeys : [this.state.key, ...this.state.commonKeys.slice(0,5)]
    localStorage.setItem('commonKeys', JSON.stringify(newKeys))
    this.setState({
      key: '',
      commonKeys: newKeys,
    })
  }
  onInput = (e)=> {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onSetToken = ()=> {
    pushbullet.setToken(this.state.token)
  }

  render() {
    return (
      <div className="App">
        <div className={'header'}>
          Chrome
        </div>
        <div>
          <button className={'btn btn-primary'} onClick={this.onChromePrev}>Prev</button>
          <button className={'btn btn-primary'} onClick={this.onChromeNext}>Next</button>
          <button className={'btn btn-primary'} onClick={this.onChromeClose}>Close</button>
        </div>
        <div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="URL" value={this.state.url} name={'url'} onChange={this.onInput}/>
              <div className="input-group-append">
                <button type="button" className={'btn btn-primary'} onClick={this.onChromeOpenPage}>Open</button>
              </div>
          </div>
        </div>
        <div className={'header'}>
          Common
        </div>
        <div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Key" value={this.state.key} name={'key'} onChange={this.onInput}/>
            <div className="input-group-append">
              <button className={'btn btn-primary'} onClick={this.onTapKey}>Tap</button>
            </div>
          </div>
        </div>
        <div>
          {
            this.state.commonKeys.map(item=>(
              <button className={'btn btn-secondary'} key={item}>{item}</button>
            ))
          }
        </div>
        <div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Token" value={this.state.token} name={'token'} onChange={this.onInput}/>
            <div className="input-group-append">
              <button className={'btn btn-primary'} onClick={this.onSetToken}>Set</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
