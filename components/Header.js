import Image from 'next/image'
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function Header({ placeholder }) {

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const router = useRouter();


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setStartDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput('');
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests,
            }
        });
    }

    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 
            bg-white shadow-md py-5 px-5 md:px-10'>
            <div className='relative flex items-center h-10 cursor-pointer my-auto'
                onClick={() => router.push('/')}
            >
                <Image
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'

                />
            </div>
            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input
                    className='pl-5 bg-transparent flex-grow outline-none'
                    type="text"
                    placeholder={placeholder || 'Start your search'}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon
                    className='hidden md:inline-flex h-8 
                    bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2'
                />
            </div>
            <div className='flex items-center space-x-4 justify-end text-gray-500'>
                <div className='hidden md:inline-flex space-x-4'>
                    <p className=''>Become a host</p>
                    <GlobeAltIcon className='h-6' />
                </div>
                <div className='flex items-center space-x-2 p-2 rounded-full border-2 '>
                    <MenuIcon className='h-6' />
                    <UserCircleIcon className='h-6' />
                </div>
            </div>
            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto mt-10'>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center mb-4 border-b'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UsersIcon className='h-5' />
                        <input
                            type="number"
                            className='w-12 pl-2 text-lg outline-none text-red-400'
                            value={numberOfGuests}
                            onChange={(e) => { setNumberOfGuests(e.target.value) }}
                            min={1}
                        />
                    </div>
                    <div className='flex'>
                        <button onClick={resetInput} className='flex-grow text-gray-500'>
                            Cancel
                        </button>
                        <button className='flex-grow text-red-400'
                            onClick={search}>
                            Search
                        </button>
                    </div>
                </div>

            )}
        </header>
    )
}

export default Header
