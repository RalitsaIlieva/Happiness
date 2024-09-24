import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

const Membership = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const onSubmit = (data) => {
    const CreateForm = () => {
      const form = document.createElement('FORM');
      const name = document.createElement('INPUT');
      form.appendChild(name);
      name.setAttribute('name', 'name');
      name.setAttribute('value', data.name);
      const email = document.createElement('INPUT');
      form.appendChild(email);
      email.setAttribute('name', 'email');
      email.setAttribute('value', data.email);
      const question = document.createElement('INPUT');
      form.appendChild(question);
      question.setAttribute('name', 'question');
      question.setAttribute('value', data.question);

      return form;
    };
    CreateForm();
    emailjs.sendForm('service_2t5f4hm', 'template_vh66h7r', CreateForm(), 'SFMaI9etljndrKWD_').then(
      () => {
        alert(t('success'));
        navigate(`/`);
      },
      () => {
        alert(t('fail'));
      },
    );
  };

  return (
    <Box sx={{ marginTop: '35px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} alignContent="center">
            <Box sx={{ marginBottom: '15px', marginTop: '5px', textAlign: 'center' }}>
              {t('translation:becomeMemberText')}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            spacing={2}
            sx={{ [theme.breakpoints.up('md')]: { marginTop: '4px' } }}
          >
            <Grid item>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: t('validations:required'),
                  minLength: {
                    value: 2,
                    message: t('validations:minLength', { number: 2 }),
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    size="normal"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={t('translation:name')}
                    variant="outlined"
                    helperText={errors.name?.message}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                control={control}
                rules={{ required: t('validations:required') }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    type="email"
                    size="normal"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={t('translation:email')}
                    variant="outlined"
                    helperText={errors.email?.message}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="question"
                control={control}
                rules={{
                  required: t('validations:required'),
                  minLength: {
                    value: 10,
                    message: t('validations:minLength', { number: 10 }),
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    className="question"
                    label={t('translation:question')}
                    multiline
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    helperText={errors.question?.message}
                    sx={{ width: '100%' }}
                    inputProps={{
                      style: {
                        height: '10em',
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item alignSelf="center">
              <Button color="primary" type="submit" variant="contained" sx={{ marginTop: '5px' }}>
                {t('translation:submitButton')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Membership;
