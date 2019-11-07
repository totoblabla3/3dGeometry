import React from 'react';
import classnames from 'classnames';
import c from './GTetrahedron.module.css'
import a from './GTetrahedronAnimation.module.css'

export const GTetrahedron = ({pageX, pageY, animation}) => {
    return (
      <div
        className={c.GTetrahedron}
        style={{ transform: `rotateX(${pageY}deg) rotateY(${pageX}deg)` }}
      >
        <div className={
          classnames(c.side, c.front, a.animation, animation ? (a.front) : (null))
          }>front</div>
        <div className={
          classnames(c.side, c.right, a.animation, animation ? (a.right) : (null))
          }>right</div>
        <div className={
          classnames(c.side, c.left, a.animation, animation ? (a.left) : (null))
          }>left</div>
        <div className={
          classnames(c.side, c.bottom, a.animation, animation ? (a.bottom) : (null))
          }>bottom</div>
      </div>
    )
}