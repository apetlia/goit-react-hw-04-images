import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as Pixabay from 'services/pixabay_api';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    userSearch: '',
    searchResult: null,
    page: 1,
    showLoadMore: false,
    isLoading: false,
  };

  handleSubmit = async ({ userSearch }) => {
    try {
      if (userSearch.trim() === '') {
        toast.info('Введите поисковый запрос');
        return;
      }

      this.setState({
        isLoading: true,
        searchResult: null,
        showLoadMore: false,
      });

      const searchResult = await Pixabay.getImages({
        search: userSearch,
        page: 1,
      });

      if (searchResult.length === 0) {
        toast.info('По вашему запросу ничего не найдено');
        return;
      }

      this.setState({
        userSearch,
        searchResult,
        page: 1,
        showLoadMore: true,
      });
    } catch (error) {
      toast.error('Упс, что-то пошло не так, перезагрузите страницу');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    try {
      this.setState({ isLoading: true, showLoadMore: false });

      const nextResult = await Pixabay.getImages({
        search: this.state.userSearch,
        page: this.state.page + 1,
      });

      if (nextResult.length === 0) {
        toast.info('Больше картинок нет');
        return;
      }

      this.setState(prevState => ({
        page: prevState.page + 1,
        searchResult: [...prevState.searchResult, ...nextResult],
        showLoadMore: true,
      }));
    } catch (error) {
      toast.error('Упс, что-то пошло не так, перезагрузите страницу');
    } finally {
      this.setState({ isLoading: false });
    }
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
