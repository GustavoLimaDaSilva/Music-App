
export function DropdownList({ isActive, children }) {
    return <ul className={isActive ? "visible dropdown-menu" : "hidden dropdown-menu"}>
        {children}
    </ul>;
}
