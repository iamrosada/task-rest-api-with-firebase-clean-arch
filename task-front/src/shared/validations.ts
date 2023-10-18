// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().required("The title is necessary"),
  description: yup.string().required("The description is necessary"),
});


export const searchSchema = yup.object().shape({
  search: yup.string()
    .min(3, 'Search query must be at least 3 characters long')
    .required('Search query is required'),
});

export const validationRegisterSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const validationLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

export const validationResetSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const initialValues = {
  tittle: "",
  description: "",
}