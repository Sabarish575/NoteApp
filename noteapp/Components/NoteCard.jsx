import React, {useState } from 'react'

function NoteCard({id,head,para,dltfunc,editfunc,cancelfunc,updatefunc,editId,isEdit}) {


  const[newhead,setHead]=useState(head);
  const[newpara,setPara]=useState(para);


  const handleUpdate=(id)=>{
    updatefunc(id,newhead,newpara);
  }

  return (
    <>

    <div className='max-w-md lg:max-w-lg flex flex-col  space-y-2 border border-gray-400 p-4 rounded-xl'>

      {isEdit && editId==id?
        ( 

          // if condition
          <>
            <h1 className='text-xl text-center text-white underline underline-offset-1'>Edit Mode</h1>

            <input 
              value={newhead}
              type='text' 
              placeholder='enter your heading'
              onChange={(e)=>setHead(e.target.value)}
            />

            <textarea 
              value={newpara}
              type="text" 
              placeholder='write something'
              onChange={(e)=>setPara(e.target.value)}
            />

            <button 
              onClick={()=>handleUpdate(id)}
              className='bg-green-600 text-white hover:bg-green-800 
              rounded-2xl mt-1 py-2 cursor-pointer'>Update</button>
            
            <button 
              className='bg-red-600 text-white hover:bg-red-800 
              rounded-2xl mt-1 py-2 cursor-pointer'
              onClick={cancelfunc}
            >Cancel</button>
          </>

        ) : 
        (

          // else condition
          <>
            <h1 className='text-xl text-center text-white 
            underline underline-offset-1'>{head}</h1>

            <p className='text-base text-gray-300 break-words'>{para}</p>

            <button 
              onClick={() => dltfunc(id)}
              className='bg-red-600 text-white hover:bg-red-800 
              rounded-2xl mt-1 py-2 cursor-pointer'>Delete</button>

            <button 
              onClick={() => editfunc(id)}
              className='bg-green-600 text-white hover:bg-green-800 
              rounded-2xl mt-1 py-2 cursor-pointer'>Update</button>
      </>
        )}

    </div>
    
    </>
  )
}

export default NoteCard