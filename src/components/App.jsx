import Api from './Apiserver/Api';
import css from './Appcss.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  return (
    <div className={css.App}>
      <Api />
      <ToastContainer position="top-right" />
    </div>
  );
};
