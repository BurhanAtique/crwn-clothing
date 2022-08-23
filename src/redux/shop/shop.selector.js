import { createSelector } from 'reselect';


const selectShop = state => state.shop;

export const selectCollections=createSelector([selectShop],shop=>shop.collections);

//MUST READ THIS
// file:///F:/Burhan%20Desktop/[FreeCourseSite.com]%20Udemy%20-%20Complete%20React%20Developer%20in%202022%20(w%20Redux,%20Hooks,%20GraphQL)/11%20Master%20Project_%20Advanced%20Routing/151%20Memoizing%20selectCollection%20and%20collectionUrlParam.html
// export const selectCollection=collectionUrlParam => 
// createSelector([selectCollections],collections=>collections.find(collection=>collection.id===COLLECTION_ID_MAP[collectionUrlParam]))

// export const selectCollection = collectionUrlParam =>
// { console.log(collectionUrlParam)
//     return (createSelector(
//     [selectCollections],
//     collections =>  collections.find(collection => collection.id===COLLECTION_ID_MAP[collectionUrlParam])    
// ))};

// this is data normalization because instead of iterating all the items 
//like above in order to find the correct item we could directlt fetch it from the object list
// the takeaway is whenever you have to store list of elements store it as objects instead of array
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam]:null)
  );
 
  //Object.keys return us all the keys oof the object in array form
  export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map((key) => collections[key]) : []
  );