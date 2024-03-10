import React, { useEffect, useState } from 'react';
import { Post } from '../interfaces/post';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../interfaces/user';
import { formatDistanceToNow } from 'date-fns';

interface PostComponentProps {
    post: Post;
    onDelete: (id: string) => void;
    user: LoginForm | null;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, onDelete, user }) => {

    const navigate = useNavigate();

    const handleDeleteClick = () => {
        if (post._id !== undefined) {
            onDelete(post._id);
        }
    };

    // // & Check if URL is valid and not empty
    // const isValidImageUrl = (url: string) => {
    //     //#region 
    //     if (!url) return false; // Empty URL is not valid
    //     const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more if needed

    //     // Check if URL starts with http:// or https://
    //     if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    //         return false;
    //     }

    //     // Check if URL ends with a supported image file extension
    //     return supportedExtensions.some(extension => url.toLowerCase().endsWith(extension));
    //     //#endregion
    // };

    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        // Function to update time every minute
        const updateTime = () => {
            const date = post.createdAt ? new Date(post.createdAt) : (post.updatedAt ? new Date(post.updatedAt) : new Date());
            setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
        };

        // Initial update
        updateTime();

        // Interval to update time every minute
        const intervalId = setInterval(updateTime, 60000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, [post.updatedAt, post.createdAt]);


    console.log(post.owner);


    return (
        <>
            {/* <div className="card mx-auto md:max-w-2xl max-w-sm bg-[#2a323c] pb-5 shadow-xl"> */}
            <div className="card mx-auto md:max-w-2xl max-w-sm pb-5 shadow-xl border-2 border-neutral-content">
                <div className="card-body pb-5">
                    <div className="HEADER flex justify-between mb-5">

                        <div className="card-title text-xl flex items-center">
                            <figure className='w-16 h-16 mr-2 overflow-hidden rounded-full'>
                                <img className="object-cover w-full h-full block" src={post.owner.avatar} alt="Owner Avatar" />
                            </figure>
                            <div>
                                <h1 className=''>{post.owner.fullName}</h1>
                                <p className='text-base'>{timeAgo}</p>
                            </div>
                        </div>


                        {/* CONTROLS */}
                        {user?.email === post.owner.email &&
                            <div className="space-x-4">
                                <button
                                    id="edit-button"
                                    onClick={() => { navigate(`edit/${post._id}`) }}

                                    className="p-2">
                                    <svg className="hover:scale-125 transition-all lucide lucide-file-pen-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M8 18h1" /><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" /></svg>
                                </button>
                                <button
                                    id="delete-button"
                                    onClick={handleDeleteClick}
                                >
                                    <svg className="hover:scale-125 transition-all lucide lucide-file-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m14.5 12.5-5 5" /><path d="m9.5 12.5 5 5" /></svg>
                                </button>
                            </div>
                        }
                    </div>

                    <h2 className="card-title text-lg">{post.title}</h2>
                    <p>{post.content}</p>

                </div>
                <figure>
                    {post.image && (
                        <img className='object-cover w-full h-full text-center' src={post.image} alt="IMAGE-NOT-FOUND" />
                    )}
                </figure>
            </div>
        </>
    );
};

export default PostComponent;