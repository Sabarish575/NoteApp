"use client"

import React, { useRef, useState, useEffect } from 'react'
import NoteCard from './NoteCard';

function NoteApp() {  // Removed updateFunc from props

    const headRef = useRef();
    const paraRef = useRef();
    const [ans, setAns] = useState([]);

    const [editId, setEditId] = useState(null);
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const res = await fetch("http://localhost:5000/VIEW");
                const data = await res.json()
                setAns(data);
            }
            catch (e) {
                console.log("Error", e)
            }
        }

        getData();

    }, [])

    const Editfunc = (id) => {
        setEditId(id);
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
        setEditId(null);
    }

    const handleData = async () => {
        const ans1 = headRef.current.value;
        const ans2 = paraRef.current.value;

        try {
            await fetch("http://localhost:5000/ADD", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ data: { ans1, ans2 } })
            })

            const res = await fetch("http://localhost:5000/VIEW");
            const data = await res.json();
            setAns(data);
        }
        catch (e) {
            console.log("Error", e)
        }

        headRef.current.value = '';
        paraRef.current.value = '';
    }

    const handleDelete = async (id) => {

        try {
            await fetch(`http://localhost:5000/DELETE/${id}`, {
                method: "DELETE",
            })

            const res = await fetch("http://localhost:5000/VIEW");
            const data = await res.json();
            setAns(data);

        } catch (error) {
            console.log("DELETION ERROR", error);
        }

    }

    const handleUpdate=async (id,UpdatedHead,UpdatedPara)=>{
        

        try{
            await fetch(`http://localhost:5000/UPDATE/${id}`,{
                method:"PUT",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({data:{ans1:UpdatedHead,ans2:UpdatedPara}})
            })

            const res = await fetch("http://localhost:5000/VIEW");
            const data = await res.json();
            setAns(data);



        }

        catch(e){
            console.log("Updation error",e);
            
        }

        setEdit(false);
        setEditId(null);
    }


    return (
        <div className='w-full flex flex-col space-y-7 items-center text-color'>
            <h1 className='text-2xl underline underline-offset-1'>Note App</h1>

            {/* user input field */}
            <div className='w-full flex flex-col space-y-4 md:flex-row md:justify-evenly items-center'>
                <div className='flex flex-col space-y-2 md:flex-row items-center md:space-x-3'>
                    <label className='text-lg'>Heading</label>
                    <input
                        className='border border-white rounded-xl px-2 py-1 md:px-4 md:py-2 '
                        type='text'
                        ref={headRef}
                        placeholder='Write your heading'
                    />
                </div>
                <div className='flex flex-col space-y-2 md:flex-row items-center md:space-x-3'>
                    <label className='text-lg'>Your Note</label>
                    <textarea
                        className='border border-white rounded-xl px-2 py-1 md:px-4 md:py-2 '
                        placeholder='Write Something'
                        ref={paraRef}
                    />
                </div>

                <div>
                    <button
                        onClick={handleData}
                        className='border border-gray-400 hover:bg-gray-900 rounded-xl px-2 py-1 cursor-pointer hover:scale-110'>
                        Add Notes
                    </button>
                </div>

            </div>

            {/* Note card */}
            <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4'>

                {ans.map((elements) => (
                    <NoteCard
                        key={elements.id}
                        id={elements.id}
                        head={elements.data?.ans1}
                        para={elements.data?.ans2}
                        dltfunc={handleDelete}
                        editfunc={Editfunc}
                        cancelfunc={handleCancel}
                        updatefunc={handleUpdate}  // Now handleUpdate is passed correctly
                        editId={editId}
                        isEdit={isEdit}
                    />
                ))}

            </div>
        </div>
    )
}

export default NoteApp
