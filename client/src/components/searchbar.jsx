import { useNavigate, useLocation } from "react-router"
import { useEffect, useRef } from "react"
import debounce from 'lodash.debounce'

export default function searchBar({ userInput, setUserInput }) {

    const navigate = useNavigate()
    const searchBarRef = useRef(null)

    useEffect(() => {

        if (searchBarRef.current && userInput === '') searchBarRef.current.value = ''

    }, [userInput])

    return (
        <div className="searchbar-container">
            <input type='text' className="searchbar" ref={searchBarRef} onChange={e => {

                const input = e.target.value

                if (input.length === 1) {

                    navigate('Home/search')
                }


                debounce(() => {

                    setUserInput(input)
                }, 400)()
            }} />
        </div>
    )
}

// componente superior
// fica a imagem
//  o nome
//  o tipo (album, artista verificado)
//  para o artista, os ouvintes mensais
//  para o album, o nome do artista, a data de lançamento, o número de músicas e a duração total


// componente médio
// botão de play
// botão de adicionar à biblioteca
// um menu dropdown no componente do álbum
// pro artista, botão de seguir
// (a pensar) no menu do artista, opção de denunciar e de compartilhar link

// componente que demonstra as músicas
// no artista, as mais populares
// no álbum, as músicas do álbum