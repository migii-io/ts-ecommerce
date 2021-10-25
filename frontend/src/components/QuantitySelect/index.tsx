import React from 'react';

type QuantitySelectProps = {
  qty: number,
  handleOnChange(e: React.ChangeEvent<HTMLSelectElement>): void,
  stockCount: number,
  className?: string
}

function QuantitySelect({
  qty,
  handleOnChange,
  stockCount,
  className
}: QuantitySelectProps) {
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