import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import * as Pixabay from 'services/pixabay_api';
import Button from '../Button';
import Loader from '../Loader';
import { Wrapper } from './App.styled';

export const App = () => {
  const [userSearch, setUserSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [page, setPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = ({ userSearch }) => {
    setSearchResult([]);
    setShowLoadMore(false);

    if (userSearch.trim() === '') {
      toast.info('Введите поисковый запрос');
    } else {
      setUserSearch(userSearch.trim());
      setPage(1);
    }
  };

  useEffect(() => {
    if (userSearch === '') {
      return;
    }

    setIsLoading(true);

    Pixabay.getImages(userSearch, page)
      .then(data => {
        if (data.length === 0) {
          setShowLoadMore(false);

          if (page > 1) {
            toast.info('Картинок больше нет');
            return;
          }
          toast.info(`По вашему запросу ${userSearch} ничего не найдено`);
          return;
        }

        setSearchResult(prevSearch => [...prevSearch, ...data]);
        setShowLoadMore(true);
      })
      .catch(error => {
        toast.error('Упс, что-то пошло не так, перезагрузите страницу');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userSearch, page]);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {searchResult && <ImageGallery items={searchResult} />}
      {isLoading && <Loader />}
      {showLoadMore && <Button onClick={handleLoadMore} />}
      <ToastContainer hideProgressBar autoClose={3000} />
    </Wrapper>
  );
};
