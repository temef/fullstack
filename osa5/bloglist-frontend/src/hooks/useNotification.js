import { useDispatch } from 'react-redux';
import { createNotification, removeNotification } from '../reducers/notificationReducer';

export const useNotification = () => {
  let timer = null;
  const dispatch = useDispatch();
  const show = (msg, isError = false) => {
    console.log(isError);
    if (timer) clearTimeout(timer);
    dispatch(createNotification({ msg, isError }));
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return { show };
};
