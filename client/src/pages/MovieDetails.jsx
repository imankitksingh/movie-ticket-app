import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/TimeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/appContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {

    const { id } = useParams()
    const [show, setShow] = useState(null)
    const navigate = useNavigate()
    const { shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext()
    const getShow = async () => {
        try {
            const { data } = await axios.get(`/api/show/${id}`)
            console.log("Show API data:", data)

            if (data.success) {
                setShow(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleFavorite = async () => {
        try {
            if (!user) return toast.error("Please login to proceed")
            const { data } = await axios.post("/api/user/update-favorite", { movieId: id }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            console.log("Show API dataaaaaaaa:", data)
            if (data.success) {
                await fetchFavoriteMovies()
                toast.success(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getShow()
    }, [id])

    return show ? (
        <div className='px-6 md:px-16 lg:px-20 pt-30 md:pt-50'>
            <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
                <img src={image_base_url + show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object cover' />
                <div className='relative flex flex-col gap-3'>
                    <BlurCircle top="-100px" left='-100px' />
                    <p className='text-primary'>English</p>
                    <h1>{show.movie.title}</h1>
                    <div className='flex items-center gap-2 text-gray-300'>
                        <StarIcon className='w-5 h-5 text-primary fill-primary' />
                        {show.movie.vote_average.toFixed(1)} User Rating
                    </div>
                    <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
                    <p>
                        {timeFormat(show.movie.runtime)} {show.movie.genres.map(genre => genre.name).join(", ")} {show.movie.release_date.split("-")[0]}
                    </p>
                    <div className='flex items flex-wrap gap-4 mt-4'>
                        <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
                            <PlayCircleIcon className='w-5 h-5' />
                            Watch Trailers</button>
                        <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium   cursor-pointer active:scale-95 text-black'>Buy Tickets</a>
                        <button onClick={handleFavorite} className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                            <Heart className={`w-6 h-5 ${favoriteMovies.find(movie => movie._id === id) ? "fill-pink-700 stroke-none" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>
            <p className='text-lg font-medium mt-20'>Your Favorite Casts</p>
            <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
                <div className='flex items-center gap-4 w-max px-4'>
                    {show.movie?.casts?.slice(0, 12).map((cast, idx) => (
                        <div key={idx} className='flex flex-col items-center text-center'>
                            <img src={
                                cast.profile_path
                                    ? image_base_url + cast.profile_path
                                    : "/default-profile.png" // <-- your local fallback image
                            } className='rounded-full h-20 md:h-20 aspect-square object-cover' alt="" />
                            <p className='font-medium text-xs mt-3'>{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <DateSelect dateTime={show.dateTime} id={id} />

            <p className='text-lg font-medium mt-20 mb-8'>You may also Like</p>
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
                {shows.slice(0, 4).map((movie, idx) => (
                    <MovieCard key={idx} movie={movie} />
                ))}
            </div>
            <div className='flex justify-center mt-20'>
                <button onClick={() => { navigate("/movies"); scrollTo(0, 0) }} className='px-10 py-3 text-black text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show More</button>
            </div>

        </div>
    ) : <Loading />
}

export default MovieDetails