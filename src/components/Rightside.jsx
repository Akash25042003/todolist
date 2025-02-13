import React from 'react'

const Rightside = ({deletedtask,adddeleteditems}) => {

  return (
    <div className="w-1/5 bg-gray-300 p-4 fixed right-0 h-full">
      <p className="text-sm font-bold text-indigo-950" onClick={adddeleteditems}>deleted items</p>
      <ul>
              {deletedtask.map((val) => (
                <li key={val.id} className="text-gray-500 p-2 border-b text-[10px] sm:text-xs md:text-sm">
                  {val.text} 
                </li>
              ))}
            </ul>
    </div>
  )
}

export default Rightside