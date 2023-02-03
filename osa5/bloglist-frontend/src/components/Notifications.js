import { useMessage } from '../hooks/useMessage';

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div className="message">{message}</div>;
};

const Error = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div id="error" className="error">
      {error}
    </div>
  );
};

export const Notifications = () => {
  const { msg, isError } = useMessage();
  if (isError) return <Error error={msg} />;

  return (
    <>
      <Notification message={msg} />
    </>
  );
};
