// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { assets, dummyDashboardData, dummyDateTimeData, dummyShowsData } from '../assets/assets';
// import Loading from '../components/Loading';
// import { ArrowRight, ClockIcon } from 'lucide-react';
// import timeFormat from '../lib/timeformat';
// import BlurCircle from '../components/BlurCircle';
// import toast from 'react-hot-toast';
// import { useAppContext } from '../context/Appcontext';

// const SeatLayout = () => {
//   const { axios, getToken, user } = useAppContext();
//   const { id, date } = useParams();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [show, setShow] = useState(null);
//   const [occupiedSeats,setOccupiedSeats] = useState([]);
//   const navigate = useNavigate();
//   const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H', 'I'], ['J', 'K', 'L']];

//   const fetchshow = async () => {
//     try {
//       const { data } = await axios.get(`/api/show/getmovie/${id}`);
//       if (data.success) {
//         setShow(data)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getShow = async () => {
//       const show = dummyShowsData.find((show) => show._id === id);
//       // console.log("This is dummyDateTime: ", dummyDateTimeData)
//       // console.log("This is show: ", show)
//       if(show){
//       setShow({
//         movie: show,
//         dateTime: dummyDateTimeData,
//       })};
//   };

//     useEffect(() => {
//       getShow();
//     }, []);

//   const getoccupiedSeats = async() => {
//     try {
//       const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`);
//       if(data.success) {
//         setOccupiedSeats(data.occupiedSeats)
//     } else {
//       toast.error(data.message);
//     }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // const assetOccupiedSeat = () => {
//   //   const data = dummyDashboardData.activeShows.find(e => e.showDateTime==selectedTime.time)
//   //   console.log("This is occupiedSeats: ",data)
//   //   setOccupiedSeats(data.occupiedSeats);
//   //   console.log("This is data: ", data)
//   // }

//   const createBooking = async() => {
//     try {
//       if(!user) {
//         return toast.error('Please login to proceed');
//       }

//       if(!selectedTime || !selectedSeats.length) {
//         return toast.error('Please select time and seat first');
//       }

//       const {data} = await axios.post(`/api/booking/create`, {showId : selectedTime.showId , selectedSeats}, {
//         headers : {
//                 Authorization : `Bearer ${await getToken()}`
//             }})
//             if(data.success) {
//               window.location.href = data.url;
//             }else {
//               toast.error(data.message);
//             }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // useEffect(() => {
//   //     fetchshow();
//   // }, []);

//   // useEffect(() => {
//   //   if(selectedTime) {
//   //     getoccupiedSeats();
//   //   }
//   // },[selectedTime])

//   useEffect(() => {
//     if(selectedTime) {
//       assetOccupiedSeat();
//     }
//   },[selectedTime])

//   if (!show) {
//     return <Loading />;
//   }

//   const handleSeatClick = (seatId) => {
//     if (!selectedTime) {
//       return toast('Please select time first');
//     }
//     if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
//       return toast('You can only select 5 seats');
//     }
//     if(occupiedSeats.includes(seatId)) {
//         return toast.error('Seat is already booked')
//     }
//     setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
//   }

//   const renderSeats = (row, count = 9) => {
//     return (
//       <div key={row} className='w-full flex justify-center mb-3'>
//         <div className='grid grid-cols-9 gap-1 sm:gap-2 md:gap-3'>
//           {Array.from({ length: count }, (_, i) => {
//             const seatId = `${row}${i + 1}`;
//             const isSelected = selectedSeats.includes(seatId);
//             return (
//               <button
//                 key={seatId}
//                 onClick={() => handleSeatClick(seatId)}
//                 className={`aspect-square rounded border border-primary/60 text-xs md:text-base transition ${selectedSeats.includes(seatId) && 'bg-primary text-white'
//                   } 
//               w-8 md:w-8 lg:w-10 @max-xs:w-6 ${occupiedSeats.includes(seatId) && 'opacity-30'}`}
//                 title={seatId}
//               >
//                 {seatId}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='flex flex-col xl:flex-row px-6 md:px-16 lg:px-24 py-12 mt-30 md:pt-10 max-sm:mt-10'>
//       <div className='relative w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max min-xl:sticky xl:top-30 max-xl:mt-0'>
//         <BlurCircle top='-100px' left='0px' />
//         <p className='text-lg font-semibold px-6'>Available Timings</p>
//         <div className='mt-4 space-y-1'>
//           {show.dateTime[date].map((item) => (
//             <div
//               key={item.showId}
//               onClick={() => {
//                 console.log("This selectedTime: ", item)
//                 setSelectedTime(item)}
//               }
//               className={`flex items-center gap-2 px-10 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.showId === item.showId
//                 ? 'bg-primary text-white'
//                 : 'hover:bg-primary/20'
//                 }`}
//             >
//               <ClockIcon className='w-4 h-4' />
//               <p className='text-sm'>{timeFormat(item.time)}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className='relative flex flex-1 flex-col items-center max-md:mt-15'>
//         <BlurCircle bottom='-40px' right='0' />
//         <h1 className='text-3xl font-semibold mb-7'>Select your seat</h1>
//         <img src={assets.screenImage} alt="Scrren" />
//         <p className='text-sm font-medium'>SCREEN SIDE</p>
//         <div className='flex flex-col items-center mt-10 w-full text-white font-medium text-xs'>
//           <div className='w-full'>{groupRows[0].map((row) => renderSeats(row))}</div>

//           <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 w-full'>
//             {groupRows.slice(1).map((group, index) => (
//               <div key={index} className='flex flex-col items-center w-full'>
//                 {group.map((row) => renderSeats(row))}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className='flex justify-center mt-10 max-md:mt-0'>
//           <button onClick={createBooking} className='flex gap-2 px-8 py-3 text-md bg-primary hover:bg-primary-dull rounded-full transtion font-medium cursor-pointer max-md:px-5 max-md:text-sm my-5 max-md:pb-2'>Proceed to checkout<ArrowRight className='hover:translate-x-1 transition duration-300 max-md:w-5 max-md:pb-1' /></button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatLayout;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon, Group, Rows } from "lucide-react";
import timeFormat from "../lib/timeformat";
import BlurCircle from "../components/BlurCircle";
import toast, { Toaster } from "react-hot-toast";

const SeatLayout = () => {

  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]


  const { id, date } = useParams();
  const [SelectedSeats, setSelectedSeats] = useState([]);
  const [SelectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) =>{
    if(!SelectedTime){
      return toast.error("Please select time first")
    }
    if(!SelectedSeats.includes(seatId) && SelectedSeats.length > 4){
      return toast.error("you can only select 5 seats")
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== 
      seatId
    ):[...prev,seatId])
  }


  const renderSeats = (row,count = 9)=>{
    return(

      <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({length:count},(_,i)=> {
          const seatId =` ${row}${i + 1}`;
          return(
            <button key={seatId} onClick={()=> handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer
              ${SelectedSeats.includes(seatId) && "bg-primary text-white"}`}>
              {seatId}
            </button>
          );
        })}

      </div>

    </div>

    )
  }

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-32 py-10">

    <div className="flex flex-col md:flex-row md:px-16 lg:px-0 py-10 gap-10 w-full ">
      {/* Available timings */}
      <div className="md:w-64 bg-primary-dull/10 rounded-xl p-5 shadow-md self-start">
        <p className="text-lg font-semibold mb-4">Available Timing</p>
        <div className="space-y-2">
          {show.dateTime[date].map((items) => (
            <div
              key={items.time}
              onClick={() => setSelectedTime(items)}
              className={`flex items-center gap-2 px-4 py-2 w-max rounded-md cursor-pointer transition
              ${
                SelectedTime?.time === items.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{timeFormat(items.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-5 flex flex-col items-center">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />
        <h1 className="text-center font-semibold mb-4">Select Your Seat</h1>
        <div className="w-full flex justify-center mx-auto">

        <img src={assets.screenImage} alt="screen" className="w-3/4 max-w-lg block mx-auto object-contain" />
        </div>
        <p className="text-gray-400 text-sm mt-2 text-center">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
              {groupRows[0].map(row=> renderSeats(row))}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 w-full'>
              {groupRows.slice(1).map((Rows, idx)=>(
                <div key={idx}>
                  {Rows.map(row => renderSeats(row))}

                </div>
              ))}

            </div>

        </div>
        <button onClick={()=> navigate('/MyBookings')} className="flex
        items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull 
        transition rounded-full font-medium cursor-pointer active:scale-95">
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
        </button>
      </div>
    </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;