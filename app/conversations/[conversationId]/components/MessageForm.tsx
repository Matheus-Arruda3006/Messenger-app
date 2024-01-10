'use client';

import useConversation from '@/app/hooks/useConvsersation';
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiArrowRight, HiArrowRightCircle, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';

const MessageForm = () => {

    const {conversationId} = useConversation();
    const {
        register, handleSubmit, setValue, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    };

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
        <HiPhoto size={45} className='text-sky-500 cursor-pointer'/>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
            <MessageInput id='message' register={register} errors={errors} required placeholder='Write a message...'/>
            <button className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition' type='submit'>
                <HiArrowRight size={18} className='text-white'/>
            </button>
        </form>
    </div>
  )
}

export default MessageForm;
