import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { searchSchema } from '../../shared/validations';

type SearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const formik = useFormik({
    initialValues: {
      search,
    },
    validationSchema: searchSchema,
    onSubmit: (values) => {
      setSearch(values.search);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="search"
        label="Search"
        type="search"
        variant="outlined"
        value={formik.values.search}
        onChange={formik.handleChange}
        error={formik.touched.search && Boolean(formik.errors.search)}
        helperText={formik.touched.search && formik.errors.search}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};

export default Search;


