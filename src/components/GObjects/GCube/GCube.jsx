import React from 'react';
import classnames from 'classnames';
import c from './GCube.module.css'
import a from './GCubeAnimation.module.css'

export const GCube = ({ pageX, pageY, animation }) => {
  return (
    <div
      className={c.GCube}
      style={{ transform: `rotateX(${pageY}deg) rotateY(${pageX}deg)` }}
    >
      <div className={
        classnames(c.side, c.front, a.animation, animation ? (a.front) : (null))
      }>front</div>
      <div className={
        classnames(c.side, c.back, a.animation,animation ? (a.back) : (null))
      }>back</div>
      <div className={
        classnames(c.side, c.right, a.animation, animation ? (a.right) : (null))
      }>right</div>
      <div className={
        classnames(c.side, c.left, a.animation, animation ? (a.left) : (null))
      }>left</div>
      <div className={
        classnames(c.side, c.top, a.animation, animation ? (a.top) : (null))
      }>top</div>
      <div className={
        classnames(c.side, c.bottom, a.animation, animation ? (a.bottom) : (null))
      }>bottom</div>
    </div>
  )
}