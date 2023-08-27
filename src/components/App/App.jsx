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

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = ({ userSearch }) => {
    setPage(1);
    setUserSearch(userSearch);
    setSearchResult([]);
    setShowLoadMore(false);
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
      .then(res => {
        if (res.length === 0) {
          setShowLoadMore(false);

          if (searchResult.length > 0) {
            toast.info('Картинок больше нет');
            return;
          }
          toast.info(`По вашему запросу ${userSearch} ничего не найдено`);
          return;
        }

        setSearchResult(prevSearch => [...prevSearch, ...res]);
        setShowLoadMore(true);
      })
      .catch(error => {
        toast.error('Упс, что-то пошло не так, перезагрузите страницу');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// export class App1 extends Component {
//   state = {
//     userSearch: '',
//     searchResult: null,
//     page: 0,
//     showLoadMore: false,
//     isLoading: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     const prevSearch = prevState.userSearch;
//     const nextSearch = this.state.userSearch;

//     if (nextSearch.trim() === '') {
//       toast.info('Введите поисковый запрос');
//       return;
//     }

//     if (prevSearch === nextSearch && prevPage === nextPage) {
//       return;
//     }

//     try {
//       this.setState({ isLoading: true });

//       const searchResult = await Pixabay.getImages(nextSearch, nextPage);

//       if (searchResult.length === 0) {
//         this.setState({ showLoadMore: false });

//         if (this.state.searchResult.length > 0) {
//           toast.info('Картинок больше нет');
//           return;
//         }

//         toast.info(`По вашему запросу ${nextSearch} ничего не найдено`);
//         return;
//       }

//       this.setState(prevState => ({
//         searchResult: [...prevState.searchResult, ...searchResult],
//         showLoadMore: true,
//       }));
//     } catch (error) {
//       toast.error('Упс, что-то пошло не так, перезагрузите страницу');
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   handleSubmit = ({ userSearch }) => {
//     this.setState({
//       userSearch,
//       page: 1,
//       searchResult: [],
//       showLoadMore: false,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   render() {
//     const { searchResult, isLoading, showLoadMore } = this.state;

//     return (
//       <Wrapper>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {searchResult && <ImageGallery items={searchResult} />}
//         {isLoading && <Loader />}
//         {showLoadMore && <Button onClick={this.handleLoadMore} />}
//         <ToastContainer hideProgressBar autoClose={3000} />
//       </Wrapper>
//     );
//   }
// }
