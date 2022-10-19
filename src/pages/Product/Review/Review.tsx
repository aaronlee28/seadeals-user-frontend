import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import toast from 'react-hot-toast';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ReviewConstant from '../../../constants/review';
import './Review.scss';
import useAuth from "../../../hooks/useAuth";


const PRODUCT_URL = 'product';
const REVIEW_URL = 'review';


const Review:FC<any> = ({ title, formType }) => {



    const navigate = useNavigate();
    const {auth} = useAuth()
    const userID = auth.user.user_id
    const axiosPrivate = useAxiosPrivate();

    const [review, setReview] = useState({
        user_id: '',
        product_id: '',
        rating: '',
        description: '',
        image_url: '',
        image_name: '',
    });
    const [imageUpload, setImageUpload] = useState<any>(null)
    const [localImg, setLocalImg] =useState<any>('');
    const [imgURL, setImgURL] =useState<any>();
    const { productID } = useParams();

    const checkExistingReview = async () => {
    try {
        const response = await axiosPrivate.post(`user/existing-review`,
            JSON.stringify({product_id: Number(productID)}),
        );
        const { data } = response.data;
        console.log(data)
        if (data.id !== 0){
            setReview(data);
        }
    } catch (err) {
        toast.error('Failed to fetch review');
    }
};

    useEffect(()=>{
        checkExistingReview();
        console.log(review.image_url)

    },[])
    useEffect(()=>{

        console.log(review.image_url)

    },[review])
    const handleOnChange = (e: any) => {

        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const submitButton = () => {
        const imageURL = imageUpload.name + v4()
        const imgRef = ref(storage, `reviews/${imageURL}`)

        uploadBytes(imgRef, imageUpload).then((snapshot) => {
            alert("image uploaded")
            getDownloadURL(snapshot.ref).then((url) => {
                setImgURL(url)
            });
        });
    }

    const handleSubmit = async () => {

        try {
            const response = await axiosPrivate.post(
                `${PRODUCT_URL}/${REVIEW_URL}`,
                JSON.stringify({
                    ...review,
                    user_id: Number(userID),
                    product_id: Number(productID),
                    rating: Number(review.rating),
                    description:review.description,
                    image_url: String(imgURL),
                    image_name: imageUpload.name,
                }),
            );
            if (response.status === 200) {
                toast.success('review berhasil dibuat');
            }
            // navigate('/seller/voucher/list');
        } catch (err:any) {
            toast.error(err.response?.data?.message);
        }


    };



    const localUpload = (event:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files![0]);
        reader.onload = function () {
            setLocalImg(reader.result);
        };
        setImageUpload(event.target.files![0])

    }

    return (
        <div className="review__container">
        <h3 className="mb-4 mt-2">{title}</h3>
            <div className="voucher__content">
    <form onSubmit={(e) => e.preventDefault()}>
        <div className="row my-3">
            <label className="col-3 text-end align-self-center" htmlFor="name">Rating</label>
            <input
                name="rating"
                className="col-9 border rounded p-2"
                maxLength={100}
                placeholder="Masukkan rating"
                type="text"
                required
                value={review.rating}
                onChange={handleOnChange}
            />
        </div>
        <div className="row my-3">
            <label className="col-3 text-end align-self-center" htmlFor="name">Deskripsi</label>
            <textarea
                name="description"
                className="col-9 border rounded p-2"
                maxLength={100}
                placeholder="Masukkan deskripsi review"
                value={review.description}
                onChange={handleOnChange}
            />
        </div>
        <div className="row my-3 photo_container">
            <label className="col-3 text-end align-self-center" htmlFor="name">Product Photo</label>
            <input
                name="image_url"
                className="col-9 border rounded p-2"
                maxLength={100}
                type="file"
                accept='image/*'
                onChange={(event => localUpload(event))}
            />
            {!review.image_url && !localImg && <img className ="empty_photo" src={''} alt={''}/> }
            {review.image_url && localImg && <img className ="photo_display col-12" src={localImg} alt={''}/>}
            {!review.image_url && localImg && <img className ="photo_display col-12" src={localImg} alt={''}/>}
            {review.image_url && !localImg && <img className ="photo_display col-12" src={review.image_url} alt={''}/>}

            {/*{localImg === '' ? <img className ="empty_photo" src={''} alt={''}/> : <img className ="photo_display col-12" src={localImg} alt={''}/>*/}
            {/*}*/}
        </div>
        <div className="upload_container">
            <Button  buttonType={'primary upload_button col-12'} handleClickedButton={submitButton} text={'Upload Image'}/>
        </div>


        <div className="d-flex flex-row-reverse gap-3">
            <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />
    </div>
    </form>
    </div>
    </div>
);
};
export default Review;
