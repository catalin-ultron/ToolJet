import React from 'react';

export default function Loader({ color = 'currentColor', width = '16px', position = 'absolute' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width,
        height: width,
        borderRadius: '9999px',
        border: `2px solid ${color}`,
        borderRightColor: 'transparent',
        display: 'inline-block',
        position,
        animation: 'tooljet-ui-spin 0.8s linear infinite',
      }}
    />
  );
}
