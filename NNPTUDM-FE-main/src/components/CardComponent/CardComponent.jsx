import React from "react";
import { StyleNameProduct, WrapperDiscountText, WrapperPriceText, WrapperReviewText, WrapperCardStyle } from "./style";
import { StarFilled } from '@ant-design/icons';

const CardComponent = (props) =>{
  const { countInStock, description, image, name, price, rating, type, discount, selled ,id } = props
    return(
      <WrapperCardStyle
        hoverable
        headStyle={{width: '200px', height: '200px'}}
        style={{ width: 200 }}
        bodyStyle={{padding: '10px'}}
        cover={<img src={image} />}
      >
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReviewText>
          <span style={{marginRight: '6px'}}>
            {rating}<StarFilled style={{fontSize: '12px', color: 'orange', marginLeft: '4px'}} /> 
          </span>
          <span> | {selled}</span>
        </WrapperReviewText>
        <WrapperPriceText>
          <span style={{marginRight: '8px'}}>{price} VNĐ</span>
          <WrapperDiscountText>
            {discount}
          </WrapperDiscountText>
        </WrapperPriceText>
      </WrapperCardStyle>
    )
}

export default CardComponent