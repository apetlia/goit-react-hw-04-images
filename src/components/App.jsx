import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as Pixabay from 'services/pixabay_api';
import Button from './Button';

export class App extends Component {
  state = {
    userSearch: '',
    searchResult: null,
    page: 0,
    showLoadMore: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    const prevSearch = prevState.userSearch;
    const nextSearch = this.state.userSearch;

    if (nextSearch.trim() === '') {
      toast.info('Введите поисковый запрос');
      return;
    }

    if (prevSearch === nextSearch && prevPage === nextPage) {
      return;
    }

    try {
      this.setState({ isLoading: true });

      const searchResult = await Pixabay.getImages(nextSearch, nextPage);

      if (searchResult.length === 0) {
        this.setState({ showLoadMore: false });

        if (this.state.searchResult.length > 0) {
          toast.info('Картинок больше нет');
          return;
        }

        toast.info(`По вашему запросу ${nextSearch} ничего не найдено`);
        return;
      }

      this.setState(prevState => ({
        searchResult: [...prevState.searchResult, ...searchResult],
        showLoadMore: true,
      }));
    } catch (error) {
      toast.error('Упс, что-то пошло не так, перезагрузите страницу');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = ({ userSearch }) => {
    this.setState({
      userSearch,
      page: 1,
      searchResult: [],
      showLoadMore: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { searchResult } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        {searchResult && <ImageGallery items={searchResult} />}
        {this.state.isLoading && (
          <ThreeDots
            color="#3f51b5"
            wrapperStyle={{ justifyContent: 'center' }}
          />
        )}
        {this.state.showLoadMore && <Button onClick={this.handleLoadMore} />}
        <ToastContainer hideProgressBar autoClose={3000} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
