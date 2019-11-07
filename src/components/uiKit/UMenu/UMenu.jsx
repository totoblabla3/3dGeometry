import React from 'react';
import classnames from 'classnames';
import c from './UMenu.module.css'

export const UMenu = ({
  models,
  onSelected,
  onAnimateButtonPress,
  animation
}) => {
  const items = models.map((item, i) =>
    <div
      onClick={() => onSelected(i)}
      className={c.item}
    >{item.lable}</div>
  )
  return (
    <div className={c.UMenu_container}>
      <div className={c.UMenu}>{items}</div>
      <div className={c.settings}>
        <div
          onClick={() => onAnimateButtonPress()}
          className={classnames(c.item, animation ? (c.animationTrue) : (null))}
        >Animation</div>
      </div>
    </div>
  )
}