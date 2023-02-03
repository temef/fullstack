import { useSelector } from 'react-redux';

export const useMessage = () => {
  const message = useSelector((state) => state.notification);
  const { msg, isError } = message;
  return { msg, isError };
};
