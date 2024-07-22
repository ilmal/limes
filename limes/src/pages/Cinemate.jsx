import {useState} from "react"

const CineMate = ()=>{
    const [hasSelectedList, setHasSelectedList] = useState(false);
    const [showWatchedMovies, setShowWatchedMovies] = useState(false);

    const tempList = [
        {
            "id": "nms",
            "name": "Nils måste se",
            "description": "Filmer som nils måste se om inte han vill bli kallad för en uncultured swine.",
            "list": [
                {
                    "name": "My neighbor Totoro",
                    "prio": 5,
                    "genre": "Mysig",
                    "length": "1h 26m",
                    "watched": false,
                    "imdb": "https://m.imdb.com/title/tt0096283/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_my%2520neighbor"
                },
                {
                    "name": "Spider-man",
                    "prio": 3,
                    "genre": "Nostalgia",
                    "length": "1h 45m",
                    "watched": false,
                    "imdb": "https://m.imdb.com/title/tt0096283/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_my%2520neighbor"
                },
                {
                    "name": "Iron-man",
                    "prio": 2,
                    "genre": "Nostalgia",
                    "length": "1h 51m",
                    "watched": false,
                    "imdb": "https://m.imdb.com/title/tt0096283/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_my%2520neighbor"
                }
            ],
            "color": "white"
        },
        {
            "id": "ems",
            "name": "Emilie måste se",
            "description": "Filmer som Emilie måste se om inte hon vill bli kallad för en uncultured swine.",
            "list": [
                {
                    "name": "The Phantom Menace",
                    "image": "",
                    "prio": 2,
                    "watched": false
                }
            ],
            "color": "white"
        },
    ]

    const displayLists = ()=> {
        const returnList = []
        tempList.forEach((list) => {
            console.log(list)
            returnList.push ((
                <div key={list.name} className="lists" style={{
                    backgroundColor: list.color
                }} onClick={()=> {setHasSelectedList(list.id)}}>
                    <div className="image">

                    </div>
                    <div className="title">
                        <h1>{list.name}</h1>
                    </div>
                    <div className="line"/>
                    <div className="content">
                        <span>{list.description}</span>
                    </div>
                </div>
            ))
        });
        return returnList
    }

    const displayWonkyList = ()=> {
        //                 <p onClick={()=> {setHasSelectedList(false)}}>Back</p>


        return (
            <div className="movielist">
                <div className="menu">
                    <button onClick={()=> {setHasSelectedList(false)}}>Back</button>
                    <button onClick={()=> {setShowWatchedMovies(!showWatchedMovies)}}>
                        {
                            showWatchedMovies?
                                <span>Hide watched</span>
                            :
                                <span>Show watched</span>
                        }
                    </button>
                </div>

                <div className="movies">
                    {
                        tempList.map(list=>{
                            if (list.id === hasSelectedList) {
                                return list.list.map(movie=> {
                                    return (
                                        <div className="movie" key={movie.name}>
                                            <span> {movie.name} </span>
                                            <span> {movie.length} </span>
                                            <span> {movie.genre} </span>
                                        </div>
                                    )
                                })
                            }
                        })
                    }
                </div>

            </div>
        )
    }   

    return(
            <div className="cineMate">
                {
                    hasSelectedList?
                        displayWonkyList() 
                    :
                        displayLists()
                }
            </div>
    )
}

export default CineMate;