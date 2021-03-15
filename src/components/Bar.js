import React from 'react';
import './Bar.css';

const Bar = ({ length, colorKey }) => {
  const COLOR_SET = ['#9CA3AF', '#A7F3D0', '#10B981', '#064E3B'];

  let color = COLOR_SET[colorKey];
  let width = 10;
  let style = {
    height: length * 4,
    backgroundColor: color,
    width,
  };
  return <div className='bar' style={style}></div>;
};

export default Bar;
