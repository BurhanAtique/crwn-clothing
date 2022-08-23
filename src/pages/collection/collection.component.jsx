import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item';

import { selectCollection } from '../../redux/shop/shop.selector';

import './collection.styles.scss';
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};


// const CollectionPage = ({ collection }) => {
//   const { title, items } = collection;
//   return (
//     <div className='collection-page'>
//       <h2 className='title'>{title}</h2>
//       <div className='items'>
//         {items.map(item => (
//           <CollectionItem key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// here state is the overall state reducer state from the top, 2nd argument which are the props of the
// existing component  

// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });

//this is how to log the values if we want for debugging purppose
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.match.params.collectionId);
    return ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
  })
};


export default connect(mapStateToProps)(CollectionPage);