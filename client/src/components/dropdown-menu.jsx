import { DropdownList } from './dropdown-list';
import { useRef } from "react"
import useActivate from "../hooks/useActivate"


export default function DropdownMenu({ children }) {

    const menuRef = useRef(null)

    const [isActive, setIsActive] = useActivate(menuRef)

    return (
        <>
            <button className="menu-btn"><span className="material-symbols-outlined menu-icon" ref={menuRef} onClick={() => {
                setIsActive(prev => !prev)
            }}>
                more_vert
            </span>
            <DropdownList isActive={isActive} >
                {children}
            </DropdownList>
            </button>
        </>
    )
}

// o onclick é responsável por duas coisas:
//  adicionar um event Listener quando o menu abre, que lida com o estado
// ele próprio toggle o estado
// se o mesmo menu é clicado, o próprio onClick do jsx vai fechar ele