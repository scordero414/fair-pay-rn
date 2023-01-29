interface IProductImage {
  [x: string]: any;
}

export const productImages: IProductImage = {
  Burger: require('./burger.jpg'),
  'Coca Cola': require('./coca-cola.jpg'),
};
