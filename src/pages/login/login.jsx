import Styles from '../../Styles/form.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../../Validation/FormRegister'
import Password from '../../components/Password/Password'
import Capcha from '../../Components/Capcha/Capcha'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../Contexts/AlertContext';
import { AuthContext } from '../../Contexts/AuthContext';
import { useContext, useEffect } from 'react';

export default function Register() {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(authContext.isLoggedIn){
      navigate('/panel')
    }
  },[])
  return (
    <>
      <Navbar />
      <div className={Styles.box}>
        <Formik
          initialValues={{
            name: '',
            pass: '',
            capcha: false
          }}
          validateOnBlur={false}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            const { name, pass } = values
            console.log(name);
            fetch('http://localhost:3000/login', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                'email': name.replace(' ', '.') + '@gmail.com',
                'password': pass
              })
            })
              .then(res => {
                console.log(res);
                if (!res.ok) {
                  return res.text().then((text) => {
                    throw new Error(text)
                  })
                } else {
                  return res.json()
                }
              })
              .then(data => {
                authContext.login(data.user, data.accessToken)
                alertContext.showAlertToast('ورود با موفقیت انجام شد', true, true)
                navigate('/')
              })
              .catch((text) => {
                console.log(text.message);
                switch (text.message) {
                  case ('"Cannot find user"'): {
                    alertContext.showAlertToast('کاربر یافت نشد', true, false)
                    break
                  }
                  case ('"Incorrect password"'): {
                    alertContext.showAlertToast('گذرواژه اشتباه است', true, false)
                    break
                  }
                  case ('Failed to fetch'): {
                    alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                  }
                }
              })
          }}
        >
          {() => {
            return (
              <Form className={Styles.form}>
                <h2 className={Styles.formTitle}>ورود</h2>
                <div className={Styles.infoBox}>
                  <Field
                    name='name'
                    type={'text'}
                    placeholder={'نام'}
                  />
                  <ErrorMessage name='name' />
                  <div className={Styles.passBox}>
                    <Field
                      name='pass'
                      component={Password}
                    />
                    <ErrorMessage name='pass' />
                  </div>
                  <Field name="capcha" component={Capcha} />
                  <ErrorMessage name='capcha' />
                </div>
                <button type='submit' className={Styles.submitBtn}>ورود</button>
              </Form>
            )
          }}
        </Formik>
        <Link to='/register' className={Styles.link}>ثبت نام</Link>
      </div >
      <Footer />
    </>
  );
}