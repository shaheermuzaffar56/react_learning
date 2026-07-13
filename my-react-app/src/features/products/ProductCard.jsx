import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card';
import { categories, getVariantAttributeKeys } from './data';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';


function ProductCard({ product, productVariants, cartItems, onAdd, onIncrement, onDecrement }) {
    const attributeKeys = getVariantAttributeKeys(productVariants);

    const [selectedAttrs, setSelectedAttrs] = useState(() => {
        const first = productVariants[0];
        return Object.fromEntries(attributeKeys.map((k) => [k, first[k]]));
    });

    const selectedVariant = productVariants.find((v) =>
        attributeKeys.every((k) => v[k] === selectedAttrs[k])
    ) || productVariants[0];

    const cartEntry = cartItems.find(
        (item) => item.id === product.id && item.variantId === selectedVariant.id
    );
    const quantity = cartEntry ? cartEntry.quantity : 0;
    const outOfStock = selectedVariant.stock === 0;

    return (
        <div>
            <Link to={`/product/${product.id}`}>
                <Card
                    name={product.name}
                    price={product.price}
                    categoryName={categories.find((c) => c.id === product.categoryId)?.name}
                />
            </Link>

            {attributeKeys.map((key, index) => {
                const validOptions = [...new Set(
                    productVariants
                        .filter((v) => attributeKeys.slice(0, index).every((k) => v[k] === selectedAttrs[k]))
                        .map((v) => v[key])
                )];

                return (
                    <Select
                        key={key}
                        size="small"
                        value={selectedAttrs[key]}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setSelectedAttrs((prev) => {
                          const updated = { ...prev, [key]: newValue };

                          // reset every dropdown after this one if its current value
                          // is no longer valid given the new selection
                          for (let i = index + 1; i < attributeKeys.length; i++) {
                              const laterKey = attributeKeys[i];
                              const validForLater = [...new Set(
                                  productVariants
                                      .filter((v) => attributeKeys.slice(0, i).every((k) => v[k] === updated[k]))
                                      .map((v) => v[laterKey])
                              )];
                                if (!validForLater.includes(updated[laterKey])) {
                                 updated[laterKey] = validForLater[0];
                                }
                            }

                            return updated;
                          });
                        }}
                    >
                        {validOptions.map((val) => (
                            <MenuItem key={val} value={val}>{val}</MenuItem>
                        ))}
                    </Select>
                );
            })}

            <Typography variant="body2">Stock: {selectedVariant.stock}</Typography>

            {quantity === 0 ? (
              <Button
                variant="contained"
                disabled={outOfStock}
                onClick={() => onAdd(product, selectedVariant.id)}
              >
                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => onDecrement(product.id, selectedVariant.id)}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  size="small"
                  disabled={quantity >= selectedVariant.stock}
                  onClick={() => onIncrement(product.id, selectedVariant.id)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
        </div>
    );
}
export default ProductCard;