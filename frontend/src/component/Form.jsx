import React, { useState } from 'react'
import '../component/form.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Form = ({ getFeedbackData, setGetFeedbackData }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [scalling, setScalling] = useState(0)
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [error, setError] = useState(null)

    const onSubmit = async (data, e) => {
        e.preventDefault()
        try {
            const existingNumber = getFeedbackData.find(feedbackNumber => feedbackNumber.contact_no.toLowerCase() === data.contact_no.toLowerCase())

            if (existingNumber) {
                setError("Contact number is already exist")
                return
            }

            const existingEmail = getFeedbackData.find(feedbackEmail => feedbackEmail.email.toLowerCase() === data.email.toLowerCase())

            if (existingEmail) {
                setError("Email is already exist")
                return
            }

            if (data.contact_no.length !== 10) {
                setError("Contact number should be 10 digit")
                return
            }

            if (data.email.length === 0 || !/\S+@\S+\.\S+/.test(data.email)) {
                setError("Invalid email address")
                return
            }


            const response = await axios.post("http://localhost:8000/api/feedback", data)
            alert("Data successfully submited")
            console.log("Data added successfull", response)
            reset()
            setSelectedEmoji("")
            setScalling(0);
            setError("")

            setGetFeedbackData(prevData => [...prevData, response.data])
            
        } catch (error) {
            console.log("Please check the error", error.response.data.message)

        }

    }

    const handleScaling = (e) => {
        const value = parseInt(e.target.value)
        setScalling(value)

        if (value >= 10 && value < 30) setSelectedEmoji('😠 : Worst');
        else if (value >= 30 && value < 50) setSelectedEmoji('😞 : Not Good');
        else if (value >= 50 && value < 70) setSelectedEmoji('😐 : Fine');
        else if (value >= 70 && value < 90) setSelectedEmoji('😊 : Look Good');
        else if (value >= 90) setSelectedEmoji('😍 : Very Good')
        else setSelectedEmoji('');
    }
    return (
        <div className='min-h-full flex items-center justify-center '>
            <div className='bg-white flex justify-center items-center my-10 rounded-2xl w-8/12 py-8 px-4 bg-gradient-to-r from-cyan-200 to-slate-100' style={{ maxWidth: '800px' }}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=' w-10/12 shadow-lg bg-white rounded-md px-6 py-10' style={{ maxWidth: '600px', height: 'fit-content' }}

                >
                    <div className='flex items-center justify-between'>
                        <div className='flex-col flex'>
                            <label className=' text-xl font-bold text-blue-500 ' htmlFor="name">Name</label>
                            <input
                                className='mt-3 py-3 px-5 border-2 rounded-lg shadow-lg border-slate-900'
                                type="text"
                                name='name'
                                placeholder='Enter your name'
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className='text-red-400'>This field is required</span>}

                        </div>
                        <div className='flex flex-col'>
                            <label className=' text-xl font-bold text-blue-500 ' htmlFor="number">Contact Number</label>
                            <input
                                className='mt-3 py-3 px-8 border-2 rounded-lg shadow-lg border-slate-900'
                                type="text"
                                name='contact_no'
                                placeholder='+91 00000 00000'
                                {...register('contact_no', { required: true })}
                            />

                            {errors.contact_no && <span className='text-red-400'>This field is required</span>}
                        </div>

                    </div>
                    <div className='mt-10 flex flex-col'>
                        <label className=' text-xl font-bold text-blue-500 ' htmlFor="email">Email Address</label>
                        <input
                            className='mt-3 w-60 py-3 px-2 border-2 rounded-lg shadow-lg border-slate-900'
                            type="email"
                            name='email'
                            placeholder='xyz@gmail.com'
                            {...register('email', { required: true })} />

                        {errors.email && <span className='text-red-400'>This field is required</span>}
                    </div>
                    <div className=' mt-10 '>
                        <h2 className=' text-xl font-bold text-blue-500'>Share your experience in scalling</h2>
                        <div className=' gap-10 my-7 '>
                            <div className='flex items-center justify-center gap-10' >
                                <div className={`flex flex-col items-center ${scalling >= 10 && scalling < 30 ? 'opacity-100' : 'opacity-50'}`}>
                                    <p className='text-3xl'>😠</p>
                                    <p className='text-xl'>Worst</p>
                                </div>
                                <div className={`flex flex-col items-center ${scalling >= 30 && scalling < 50 ? 'opacity-100' : 'opacity-50'}`}>
                                    <p className='text-3xl'>😞</p>
                                    <p className='text-xl'>Not Good</p>
                                </div>
                                <div className={`flex flex-col items-center ${scalling >= 50 && scalling < 70 ? 'opacity-100' : 'opacity-50'}`}>
                                    <p className='text-3xl'>😐</p>
                                    <p className='text-xl'>Fine</p>
                                </div>
                                <div className={`flex flex-col items-center ${scalling >= 70 && scalling < 90 ? 'opacity-100' : 'opacity-50'}`}>
                                    <p className='text-3xl'>😊</p>
                                    <p className='text-xl'>Look Good</p>
                                </div>
                                <div className={`flex flex-col items-center ${scalling >= 90 ? 'opacity-100' : 'opacity-50'}`}>
                                    <p className='text-3xl'>😍</p>
                                    <p className='text-xl'>Very Good</p>
                                </div>

                            </div>
                        </div>
                        <input
                            type="range"
                            className=' w-full appearance-none h-2 rounded-lg bg-green-800 to-blue-200'
                            value={scalling}
                            onChange={handleScaling}
                            min={0}
                            max={100}
                            step={1} />
                    </div>

                    <div className=' my-3 flex items-center'>
                        <label className='text-2xl font-bold text-blue-500 mr-10'>Your Experience</label>
                        <input
                            className='mt-3 w-48 py-3  text-2xl text-center rounded-lg border-2 shadow-lg border-slate-900'
                            type="text"
                            name='emoji'
                            value={selectedEmoji}
                            readOnly
                            {...register('emoji', { required: true })}
                        />
                    </div>

                    <div className='mt-10'>
                        <textarea
                            className='w-full border-2 text-xl border-slate-500 shadow-lg py-3 px-2 rounded-lg'
                            name="description"
                            placeholder='Add your comments....'
                            rows={3}
                            {...register('description', { required: true })}
                        />

                        {errors.description && <span className='text-red-400'>This field is required</span>}
                    </div>

                    {error && <div className='text-red-400'>{error}</div>}
                    <div className='mt-5'>
                        <button className='m-auto block font-semibold text-2xl bg-green-500 py-3 rounded-xl text-white w-full'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
