import React from 'react';

import './collection-item.styles.scss';
import CustomButtom from '../custom-button/custom-button.component'
import {connect} from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addingItem}) => {
    const { name, price, imageUrl } = item;
    return (
    <div className='collection-item'>
        <div
        className='image'
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButtom onClick={() =>addingItem(item)} inverted>Add to Cart</CustomButtom>
    </div>
    )
};
// here addingItem before:, addIetm onClick and addItem on CollectionItem arguments should have same name
const mapDispatchToProps=(dispatch) =>({
        addingItem: (item) => dispatch(addItem(item)) // hhere addItem before : is the function
});

export default connect(null,mapDispatchToProps) (CollectionItem);