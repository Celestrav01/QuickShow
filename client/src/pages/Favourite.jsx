// import BlurCircle from '../components/BlurCircle'
// import Loading from '../components/Loading';
// import MovieCard from '../components/MovieCard'
// import { useAppContext } from '../context/Appcontext'

// const Favorite = () => {
//   const { favorites } = useAppContext();
//   return (favorites || []).length > 0 ? (
//     <div className=' relative px-6 md:px-8 lg:px-16 xl:px-20 overflow-hidden py-10 max-md:py-0'>
//       <div className="relative flex items-center justify-between pt-20 pb-5 pl-10 text-lg max-md:pl-0">
//         <BlurCircle top='80px' right='-40px' />
//         <p className='text-gray-300 font-medium max-md:text-md text-lg'>Your Favourite Movies</p>
//         <BlurCircle top='500px' left='0px' />
//       </div>
//       <div className='flex flex-wrap justify-center gap-8 mt-8'>
//         {favorites.map((movie) => (
//           <MovieCard key={movie._id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   ) : <Loading/>
// }

// export default Favorite

import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/Moviecard";
import BlurCircle from "../components/BlurCircle";


const Favourite = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]">

        <BlurCircle top="150px" left="0px"/>
        <BlurCircle bottom="50px" right="50px"/>

        <h1 className="text-lg font-medium my-4">Your Favorite Movies</h1>
        <div className="flex flex-wrap max-sm:justify-center gap-8">

        {dummyShowsData.map((movie) => (
          
          <MovieCard movie={movie} key={movie._id}/>
          
        ) ) }
        </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center">No Movies available</h1>
    </div>
  )
} 

export default Favourite