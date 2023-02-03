import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

test('renders title and author only', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testauthor',
    url: 'www.url.fi',
    likes: 100,
  };

  const { container } = render(<Blog blog={blog} />);
  // screen.debug()

  const div = container.querySelector('.blog');

  expect(div).toBeVisible;
  expect(container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(container.url).toBeNull;
  expect(container.likes).toBeNull;
});

// describe('<Togglable />', () => {
//     let container
//     beforeEach(()=> {
//         container = render(
//             <Togglable buttonLabel=
//         )
//     })
// })

test('Clicking show will render url and likes too (and user)', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testauthor',
    url: 'www.url.fi',
    likes: 100,
  };

  const account = {
    username: 'username',
    name: 'jesus',
    password: 'nasaret',
  };

  const { container } = render(<Blog blog={blog} user={account} />);

  const user = userEvent.setup();
  const showButton = screen.getByText('Show');
  await user.click(showButton);

  const showed = container.querySelector('.showed');

  expect(showed).toHaveTextContent(blog.url);
  expect(showed).toHaveTextContent(100);
  expect(showed).toHaveTextContent(account.username);
});

test('Clicking the "Like"-button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testauthor',
    url: 'www.url.fi',
    likes: 100,
  };

  const account = {
    username: 'username',
    name: 'jesus',
    password: 'nasaret',
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} user={account} addLike={mockHandler} />
  );

  const user = userEvent.setup();
  const showButton = screen.getByText('Show');
  await user.click(showButton);

  expect(container).toHaveTextContent(100);

  const likeButton = screen.getByText('Like');
  await user.dblClick(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(
    <Togglable buttonLabel="New blog">
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const newBlogButton = screen.getByText('New blog');
  await user.click(newBlogButton);

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');

  const sendButton = screen.getByText('Create');

  await user.type(inputTitle, 'testing a form...');
  await user.type(inputAuthor, 'testMan');
  await user.type(inputUrl, 'www.urli.com');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...');
  expect(createBlog.mock.calls[0][0].author).toBe('testMan');
  expect(createBlog.mock.calls[0][0].url).toBe('www.urli.com');
});
