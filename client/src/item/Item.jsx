import DropdownMenu from '../components/dropdown-menu';
import TrackDropdownOptions from '../components/track-dropdown-options';
import ItemInfoContainer from './item-info-container';
import ItemImg from './item-img';
import { useContext, useRef } from 'react';
import contentAdapter from '../../content-adapter';

export default function Item({ item, context }) {

    return (
        <li className="item">

            {context !== 'albums' &&
                <img src={item.type === 'track' ? item?.album?.images?.[0]?.url : item?.images?.[0]?.url} alt={`${item.name}'s cover`}
                    className={item.type === 'artist' ? 'profile item-img' : 'item-img'} />
            }
            <ItemInfoContainer item={item} context={context} />
            {item.type === 'track' &&

                <DropdownMenu>
                    <TrackDropdownOptions context={context} albumId={item.album?.id} artistId={item.artists?.[0].id} />
                </DropdownMenu>
            }
        </li>
    )
}

// criar um componente para o tipo do dado