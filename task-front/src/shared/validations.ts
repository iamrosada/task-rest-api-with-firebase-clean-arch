// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().required("The title is necessary"),
  description: yup.string().required("The description is necessary"),
});


export const initialValues = {
  tittle: "",
  description: "",
}