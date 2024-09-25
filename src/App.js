import React, { Component } from 'react';
import './App.css';
import { GCube, GTetrahedron } from './components/GObjects'
import { UMenu } from './components/uiKit'
import { useSwipeable } from 'react-swipeable';

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
    window.onmousemove = this.moveCube
    window.onmousedown = this.onKeyDown
    window.onmouseup = this.onKeyUp
  }

  onKeyDown = () => {
    if (!this.state.key) this.setState({ key: true })
  }
  onKeyUp = () => {
    if (this.state.key) this.setState({ key: false })
  }

  moveCube = (e) => {
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

  onSwiping(e){
    const { pageX, pageY, lastX, lastY } = this.state

    this.setState({
      pageX: lastX === e.deltaX ?
        (pageX) : (lastX > e.deltaX ?
          (pageX - 2.5) : (pageX + 2.5)),
      pageY: lastY === e.deltaY ?
        (pageY) : (lastY > e.deltaY ?
          (pageY + 2.5) : (pageY - 2.5)),
      lastX: e.deltaX,
      lastY: e.deltaY,
    })
  }

  onModelSelected(id) {
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

  onAnimateButtonPress() {
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
      <SwipeHandlerWrapper onSwiping={(e) => this.onSwiping(e)}>
        <div className="App">
          <UMenu
            onAnimateButtonPress={() => this.onAnimateButtonPress()}
            animation={animation}
            models={this.state.models}
            onSelected={(id) => this.onModelSelected(id)}
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
      </SwipeHandlerWrapper>
    )
  }
}

const SwipeHandlerWrapper = ({ 
  children, 
  onTouchStart = () => null, 
  onTouchEnd = () => null, 
  onSwiping = () => null 
}) => {
  const handlers = useSwipeable({
    onTouchStartOrOnMouseDown: ({ event }) => onTouchStart(event),
    onTouchEndOrOnMouseUp: ({ event }) => onTouchEnd(event),
    onSwiping: (event) => onSwiping(event),
  });

  return <div {...handlers} className="wrapper">{children}</div>
}