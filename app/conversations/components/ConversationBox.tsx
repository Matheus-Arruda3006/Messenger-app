'use client';

import {useCallback, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import {format} from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { FullConversationType } from '@/app/types';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data, selected
}) => {

    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversantios/${data.id}`);
    }, [data.id, router]);

    const latestMessage = useMemo(() => {
        const messages = data.message || [];

        return messages[messages.length - 1 ];
    }, [data.message]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!latestMessage){
            return false;
        }

        const seenArray = latestMessage.seen || [];

        if(!userEmail) {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length != 0;
    }, [userEmail, latestMessage]);

    const latestMessageText = useMemo(() => {
        if (latestMessage?.image){
            return 'Sent an image.'
        };

        if(latestMessage?.body){
            return latestMessage.body;
        }

        return 'Started a conversation.';
    }, [latestMessage]);

  return (
    <div onClick={handleClick} className={clsx(`
        w-full,
        relative
        flex 
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
    `,
        selected ? 'bg-neutral-100' : 'bg-white'
    )}>
        <Avatar user={otherUser}/>
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='text-md font-medium text-gray-700'>
                        {data.name || otherUser.name}
                    </p>
                    {latestMessage?.createdAt && (
                        <p className='text-xs text-gray-400 font-light'>
                            {format(new Date(latestMessage.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <p className={clsx(`
                    truncate
                    text-sm

                `,
                     hasSeen ? 'text-gray-500' : 'text-neutral-700 font-medium'   
                )}>
                    {latestMessageText}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ConversationBox;
