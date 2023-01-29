import { HStack, Image, Input, Text } from 'native-base';
import React, { useState } from 'react';
import { productImages } from '../../../assets/imgs/products/product-images';
import { IProductItem } from '../../../types/order';

interface IProductItemProps {
  productItem: IProductItem;
  onChangeSubtotal: (orderItem: IProductItem) => void;
  readonly?: boolean;
}

export const ProductItem = ({
  productItem: productItemFromProps,
  onChangeSubtotal,
  readonly = false,
}: IProductItemProps) => {
  const [productItem, setProductItem] =
    useState<IProductItem>(productItemFromProps);

  const handleChangeQuantity = (quantity: number) => {
    setProductItem(prev => {
      const newProductItem = {
        ...prev,
        quantity,
        subtotal: prev.product.price * quantity,
      };
      onChangeSubtotal(newProductItem);
      return newProductItem;
    });
  };

  return (
    <HStack justifyContent="space-between" pt={4}>
      <HStack>
        <Text fontSize="md" pt={2} color="primary.900">
          {productItem.product.name}
        </Text>
        <Image
          source={productImages[productItem.product.name as string]}
          width={30}
          height={10}
          resizeMode="contain"
          alt="product"
        />
      </HStack>
      <Text fontSize="md" pt={2} color="primary.900">
        ${productItem.subtotal}
      </Text>
      <Input
        isReadOnly={readonly}
        value={`${productItem.quantity}`}
        keyboardType="numeric"
        size="xs"
        w="30%"
        placeholder="Quantity"
        onChangeText={text => handleChangeQuantity(+text)}
      />
    </HStack>
  );
};
