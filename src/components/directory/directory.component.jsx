import React, { useState } from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';

const Directory = () => {
    const [sections] = useState([
        {
            title: 'hats',
            imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
            id: '2',
            linkUrl: 'hats'
        },
        {
            title: 'jackets',
            imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            id: '3',
            linkUrl: ''
        },
        {
            title: 'shoes',
            imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            id: '1',
            linkUrl: ''
        },
        {
            title: 'womens',
            imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
            size: 'large',
            id: '4',
            linkUrl: ''
        },
        {
            title: 'mens',
            imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
            size: 'large',
            id: '5',
            linkUrl: ''
        }
    ]);

    return (
        <div className="directory-menu">
            {sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem key={id} {...otherSectionProps} />
            ))}
        </div>
    );
};

export default Directory;
