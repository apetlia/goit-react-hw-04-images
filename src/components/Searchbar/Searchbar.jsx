import PropTypes from 'prop-types';

import { Button, FormStyled, Header, Input } from './Searchbar.styled';
import { Formik } from 'formik';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{ userSearch: '' }}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        <FormStyled>
          <Button type="submit">
            <span>Search</span>
          </Button>

          <Input
            name="userSearch"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormStyled>
      </Formik>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
