import React, { useState, useEffect, useRef } from 'react';
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

  const isFirstRender = useRef(true);
  const searchResultLength = useRef(0);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = ({ userSearch }) => {
    setPage(1);
    setUserSearch(userSearch);
    setSearchResult([]);
    setShowLoadMore(false);
    searchResultLength.current = 0;
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (userSearch.trim() === '') {
      toast.info('Введите поисковый запрос');
      return;
    }

    setIsLoading(true);

    const fetchedResult = Pixabay.getImages(userSearch, page);

    fetchedResult
      .then(data => {
        if (data.length === 0) {
          setShowLoadMore(false);

          if (searchResultLength.current > 0) {
            toast.info('Картинок больше нет');
            return;
          }
          toast.info(`По вашему запросу ${userSearch} ничего не найдено`);
          return;
        }

        setSearchResult(prevSearch => {
          searchResultLength.current = prevSearch.length + data.length;
          return [...prevSearch, ...data];
        });
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
