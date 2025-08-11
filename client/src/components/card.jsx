import { Link } from "react-router"


export default function Card({ id, type, children }) {

    return (
        <article className="card">
<Link to={type === 'playlist' ? `${id}` : `${type}/${id}`} >        
            {children}
</Link>
        </article>
    )
}

// async function goToCategory(url) {
    
//     const accessToken = localStorage.getItem('access_token')

    
//     const res = await fetch(url, {
//         headers: {
//             Authorization: 'Bearer ' + accessToken
//         }
//     })
    
//     const value = await res.json()
    
//     console.log(value)
// }