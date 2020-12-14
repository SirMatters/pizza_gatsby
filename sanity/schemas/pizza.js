import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'Price',
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: add a custom validation rule
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
      // TODO: create custom multiselect
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, tp, ...toppings }) => ({
      title,
      media,
      subtitle: Object.values(toppings).reduce((a, b) => {
        if (b) {
          a += `, ${b}`;
        }
        return a;
      }),
    }),
  },
};
