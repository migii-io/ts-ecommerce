import React from 'react';

function QuantitySelect({ qty, handleOnChange, stockCount, className }) {
  return (
    <select
      className={className}
      value={qty}
      onChange={handleOnChange}
    >
      {Array.from(Array(stockCount).keys()).map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </select>
  );
}

export default QuantitySelect;