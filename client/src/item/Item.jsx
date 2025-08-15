import DropdownMenu from '../components/dropdown-menu';
import TrackDropdownOptions from '../components/track-dropdown-options';
import ItemInfoContainer from './item-info-container';
import ItemImg from './item-img';
import { useContext, useRef } from 'react';
import contentAdapter from '../../content-adapter';
import { Link } from 'react-router';

export default function Item({ item, context }) {
console.log(item.type)
    return (
        <li className="item">

            {context !== 'albums' &&
                <img src={item.type === 'track' ? item?.album?.images?.[0]?.url : item?.images?.[0]?.url} alt={`${item.name}'s cover`}
                    className={item.type === 'artist' ? 'profile item-img' : 'item-img'} />
            }
            {item.type !== 'track' ? <Link to={`/${item.type}s/${item.id}`}>
                <ItemInfoContainer item={item} context={context} />
            </Link>
                :
                <ItemInfoContainer item={item} context={context} />
            }
            {item.type === 'track' &&

                <DropdownMenu>
                    <TrackDropdownOptions context={context} item={item} />
                </DropdownMenu>
            }
        </li>
    )
}

// criar um componente para o tipo do dado