import React from 'react'
import { FaSort } from 'react-icons/fa'

const sortList = [
    { id : 1, name : 'Relevance'},
    { id : 2, name : 'Popularity'},
    { id : 3, name : 'Price Descending'},
    { id : 4, name : 'Price Ascending'},
    { id : 5, name : 'Newest'},
]

const SortFilter = () => {

  return (
    <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-2 font-semibold text-xs '>
            <span><FaSort /></span>
            <span>SORT</span>
          </div>
          <div>

        <ul className='ml-5 text-xs mt-2 flex flex-col gap-1'>
        {
            sortList.map(sort => (
              <li className='cursor-pointer mt-1 flex flex-row items-center gap-2' key={sort.id}>
                <input type="checkbox" />
                <div>{sort.name}</div>
              </li>
    ))
}
            </ul>
          </div>
        </div>
  )
}

export default SortFilter