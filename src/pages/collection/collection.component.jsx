import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from "../../redux/shop/shop.selector";

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map(item => (
                <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

const CollectionPageContainer = ({ selectCollection }) => {
    const { collectionId } = useParams();

    const collection = selectCollection(collectionId);

return <CollectionPage collection={collection} />;
};

const mapStateToProps = (state) => ({
    selectCollection: (collectionId) => selectCollection(collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPageContainer);
