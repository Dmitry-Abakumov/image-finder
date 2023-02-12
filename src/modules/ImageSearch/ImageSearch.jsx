import { useState, useEffect, useRef } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'shared/compponenets/Button/Button';

import { searchImages } from 'shared/services/image-search-api';

import 'react-toastify/dist/ReactToastify.css';
import css from './ImageSearch.module.css';

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [pictureRequest, setPictureRequest] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = useRef(null);

  useEffect(() => {
    if (pictureRequest === '') return;

    const fetchImages = async (pictureRequest, page) => {
      try {
        setStatus('pending');
        const data = await searchImages(pictureRequest, page);
        totalPages.current = Math.ceil(data.totalHits / 12);
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      } finally {
        setStatus(`${page !== totalPages.current ? 'resolved' : 'idle'}`);
      }
    };

    fetchImages(pictureRequest, page);
  }, [pictureRequest, page]);

  const getFormState = query => {
    if (pictureRequest === query)
      return toast.warn(
        'You are already looking such a request now. Please, enter another',
        { position: toast.POSITION.TOP_RIGHT }
      );

    if (query.trim() === '')
      return toast.warn('Empty string isn`t valid value', {
        position: toast.POSITION.TOP_RIGHT,
      });

    setPictureRequest(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={getFormState} />

      {images.length > 0 && <ImageGallery images={images} />}

      <div className={css.wrapper}>
        {status === 'resolved' && images.length > 0 && (
          <Button onClick={onLoadMoreBtnClick}>Load more</Button>
        )}

        {status === 'pending' && (
          <RotatingLines strokeColor="#3f51b5" width="50" />
        )}
      </div>

      {status === 'rejected' &&
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        })}
    </div>
  );
};

export default ImageSearch;
