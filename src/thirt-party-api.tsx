 import {useEffect, useState} from "react"
 import axios from 'axios'
 import Movie from "./components/Movie"
 import Youtube from 'react-youtube'
import "./movies.css"
import SearchIcon from '@mui/icons-material/Search';
interface movie{  
    title:string;
    overview:string;
}
function ThirdPartyapi() {
    const MOVIE_API =process.env.MOVIE_API || "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = process.env.API_KEY || "61ad623c54b97d276881947a1c34f404"
    const BACKDROP_PATH =process.env.BACKDROP_PATH|| "https://image.tmdb.org/t/p/w1280"
    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState<any>(null)
    const [movies, setMovies] = useState<any>([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState<any>({title: "Loading Movies"})

    useEffect(() => {
          fetchMovies()
    }, [])

    const fetchMovies = async () => {
       
        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }
    const handleSearch=(e:any)=>{
         e.preventDefault();
         fetchMovies();
    }

    const fetchMovie = async (id:any) => {
        console.log(id);
        
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })
        console.log(data);
        
        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(function (vid:any) {
                    return vid.name === "Official Trailer"
                })
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie:any) => {
        console.log(movie);
        
        fetchMovie(movie.id)
        setPlaying(false)
        // setMovie(movie)
        console.log(movie);
        
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map((mov:any)=> (
            <Movie
                selectMovie={selectMovie}
                key={mov.id}
                movie={mov}
            />
        ))
    )

    return (
        <div className="App" style={{backgroundColor:'black'}}>
            <header className="center-max-size header">
                <span className={"brand"}>Movie Trailer App</span>
                <form className="form" style={{backgroundColor:'whitesmoke'}} onSubmit={fetchMovies}>
                    <input style={{color:"blue"}} className="search" type="text" id="search"
                           onChange={(event:any) => setSearchKey(event.target.value)} />
                    <button className="submit-search" onClick={handleSearch} type="submit"><SearchIcon color="primary"/></button>
                </form>
            </header>
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer?.key}
                                        className={"youtube amru"}
                                        iframeClassName={'youtube-container amru'}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className={"button close-video"}>Close
                                    </button>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                        {trailer ?
                                            <button className={"button play-video"} onClick={() => setPlaying(true)}
                                                    type="button">Play
                                                Trailer</button>
                                            : 'Sorry, no trailer available'}
                                        <h1>{movie.title}</h1>
                                        <p>{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
                : ''}
        </div>
    );
}

export default ThirdPartyapi
