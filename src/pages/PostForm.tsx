//#region IMPORTS   
import { useEffect, useState } from 'react';
import { Post } from '../interfaces/post';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import axiosClient from '../_utils/axiosClient';
import { endpointsPosts } from '../_utils/ApiEndpoints';
import { Gender } from '../interfaces/user';
//#endregion

// * REACT COMPONENT
export default function PostForm() {

    // & VARIABLES
    const pathname = useLocation().pathname;
    const postToUpdateID = pathname.split('/')[2];
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Post>({
        title: "",
        content: "",
        image: "",
        owner: {
            fullName: "",
            email: "",
            password: "",
            gender: Gender.Male,
            avatar: "",
        }, // Provide a valid initial value, such as an empty string
    });
    const auth = useAuth();
    const _axiosClient = axiosClient(auth.token);


    // ^ FETCHING POST TO EDIT
    const fetchingData = async () => {
        //#region 
        if (!postToUpdateID) return;
        try {
            const response = await (await _axiosClient.get(endpointsPosts.getOneById + postToUpdateID));
            setFormData(response.data);
            console.log("🚀 ~ fetchingData ~ post:", response.data)
        } catch (error) {
            console.error(`Error fetching post with ID ${postToUpdateID}:`, error);
            throw error;
        }
        //#endregion
    };

    // ^ USER EFFECT
    useEffect(() => { fetchingData() }, [postToUpdateID]);

    // ^ HANDLE SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(auth.token);

        //#region 
        e.preventDefault();
        const letterRegex = /[a-zA-Z]/;
        if (!letterRegex.test(formData.title) || !letterRegex.test(formData.content)) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        try {
            // Update or create post based on the pathname
            const response = await (postToUpdateID ? _axiosClient.put(endpointsPosts.updateOneById + postToUpdateID, formData) : _axiosClient.post(endpointsPosts.create, formData));
            console.log("🚀 ~ handleSubmit ~ formData:", formData)
            console.log("🚀 ~ handleSubmit ~ response:", response)
            navigate('/');
        } catch (error) { console.error('Error creating/updating post:', error); }
        //#endregion
    };

    // & HANDLE CHANGE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //#region 
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        //#endregion
    };

    // & Check if URL is valid and not empty
    const isValidImageUrl = (url: string) => {
        //#region 
        if (!url) return false; // Empty URL is not valid
        const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more if needed

        // Check if URL starts with http:// or https://
        if (!(url.startsWith('http://') || url.startsWith('https://'))) {
            return false;
        }

        // Check if URL ends with a supported image file extension
        return supportedExtensions.some(extension => url.toLowerCase().endsWith(extension));
        //#endregion
    };


    // * REACT JSX
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold sm:text-3xl">
                    {pathname === '/add' ? "Create New Post" : "Update Post"}
                </h1>
                <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <div>
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input
                            value={formData.title}
                            onChange={handleChange}
                            name='title'
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="sr-only">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={handleChange}
                            name='content'
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Content"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="sr-only">Image Url</label>
                        <input
                            value={formData.image}
                            onChange={handleChange}
                            name='image'
                            type="url"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Image Url"
                        />
                        {formData.image && (
                            <figure className='mt-5'>
                                <img className='object-cover rounded-lg text-center' src={formData.image} alt="IMAGE-NOT-FOUND" />
                            </figure>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="btn btn-dark block w-full"
                    >
                        {pathname === '/add' ? "Post" : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
}

