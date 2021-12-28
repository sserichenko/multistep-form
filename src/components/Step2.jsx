import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import parsePhoneNumber from 'libphonenumber-js'
import MainContainer from './MainContainer';
import Form from './Form';
import { Input } from './Input';
import PrimaryButton from './PrimaryButton';
import * as yup from 'yup';
import { useData } from "../DataContext";

const Step2 = () => {
  const {data, setValues} = useData();
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        'Email should be valid',
      )
      .required('Email is a required field'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber}
  });

  const hasPhone = watch('hasPhone');

  const onSubmit = (data) => {
    setValues(data);
    history.push('/step3');
  };

  const noralizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumber(value)
    if(!phoneNumber) {
        return value
    }
    return (
        phoneNumber.formatInternational()
    )
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🐯 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          id="email"
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={<Checkbox defaultValue={data.hasPhone} defaultChecked={data.hasPhone} name="hasPhone" {...register('hasPhone')} color="primary" />}
          label="Do you have a phone?"
        />

        {hasPhone && (
          <Input
            {...register('phoneNumber')}
            name="phoneNumber"
            id="phoneNumber"
            type="tel"
            label="Phone number"
            onChange={(e) => {
                e.target.value = noralizePhoneNumber(e.target.value)
            }}
          />
        )}

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
