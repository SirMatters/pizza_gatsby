import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(+value));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h2>
      {type.title} {value && `- ${formatMoney(value / 100)}`}
    </h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(e) => onChange(createPatchFrom(e.target.value))}
      ref={inputComponent}
    />
  </div>
);

export default PriceInput;
