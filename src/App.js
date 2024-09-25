import React, { Component } from 'react';
import './App.css';
import { GCube, GTetrahedron } from './components/GObjects'
import { UMenu } from './components/uiKit'
export default class App extends Component {
  state = {
    key: false,
    animation: false,
    pageX: 0,
    pageY: 0,
    lastX: 0,
    lastY: 0,
    models: [
      {
        lable: "Cube",
        display: true
      },
      {
        lable: "Tetrahedron",
        display: false
      }
    ]
  }

  componentDidMount() {
    window.onmousemove = this._mouveCube
    window.onmousedown = this._onKeyDown
    window.onmouseup = this._onKeyUp
  }

  _onKeyDown = () => {
    if (!this.state.key) this.setState({ key: true })
  }
  _onKeyUp = () => {
    if (this.state.key) this.setState({ key: false })
  }

  _mouveCube = (e) => {
    const { key, pageX, pageY, lastX, lastY } = this.state
    if (key) {
      this.setState({
        pageX: lastX === e.pageX ?
          (pageX) : (lastX > e.pageX ?
            (pageX - 2.5) : (pageX + 2.5)),
        pageY: lastY === e.pageY ?
          (pageY) : (lastY > e.pageY ?
            (pageY + 2.5) : (pageY - 2.5)),
        lastX: e.pageX,
        lastY: e.pageY,
      })
    }
  }

  _onModelSelected(id) {
    this.setState({
      models: this.state.models.map((item, i) => {
        return {
          lable: item.lable,
          display: i === id ? (true) : (false)
        }
      }
      )
    })
  }

  _onAnimateButtonPress() {
    this.setState({ animation: !this.state.animation })
  }

  render() {
    const {
      pageX,
      pageY,
      models,
      animation
    } = this.state
    return (
      <div className="App">
        <UMenu
          onAnimateButtonPress={() => this._onAnimateButtonPress()}
          animation={animation}
          models={this.state.models}
          onSelected={(id) => this._onModelSelected(id)}
        />
        <div className="container">
          {models[0].display &&
            <GCube
              pageX={pageX}
              pageY={pageY}
              animation={animation}
            />
          }
          {models[1].display &&
            <GTetrahedron
              pageX={pageX}
              pageY={pageY}
              animation={animation}
            />
          }
        </div>
      </div>
    )
  }
}
