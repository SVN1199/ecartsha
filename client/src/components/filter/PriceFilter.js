import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useState, useEffect, useMemo } from 'react';
import { IoMdPricetag } from "react-icons/io";

const PriceFilter = ({ setPrice, productPrice }) => {
  const minimumPrice =  0;
  const maximumPrice = productPrice?.maxPrice || 1000; 

  const [value, setValue] = useState([minimumPrice, maximumPrice]);

  useEffect(() => {
    setValue([minimumPrice, maximumPrice]);
  }, [minimumPrice, maximumPrice]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    setPrice(newValue);
  };

  const sliderValue = useMemo(() => value, [value]);

  return (
    <div style={{ display: 'block' }} className='h-auto w-full'>
      <Typography fontWeight={600} fontSize={12} id="range-slider" gutterBottom className='flex flex-row items-center gap-2'>
        <span><IoMdPricetag /></span>
        <span>PRICE</span>
      </Typography>
      <Slider
        value={sliderValue}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        min={minimumPrice}
        max={maximumPrice}
        sx={{ color: '#064E3B' }}
      />
      <div className='text-xs'>
        Price is between {sliderValue[0]} /- and {sliderValue[1]} /-
      </div>
    </div>
  );
};

export default PriceFilter;