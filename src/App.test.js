import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import fetchPosts from './ajaxCalls/fetchPosts';
import fetchPages from './ajaxCalls/fetchPages';
import Pages from './components/Pages'
import Home from './components/Home'
import Posts from './components/Posts'

afterEach(cleanup);

// renders
it('renders posts histogram correctly', () => {
  const { asFragment } = render(<Posts />)
  expect(asFragment).toMatchSnapshot();

})

it('renders pages histogram correctly', () => {
  const { asFragment } = render(<Pages />)
  expect(asFragment).toMatchSnapshot();

})

// async
it('fetch posts', async () => {
  const res = await fetchPosts();
  expect(res.data[0].categories).toEqual([10,56,77]);
})

it('fetch pages', async () => {
  const res = await fetchPages();
  expect(res.data[0].categories).toEqual([10,56,77]);
})

// events
it('state changes on click', () => {
  const { getByTestId } = render(<Home />);

  fireEvent.click(getByTestId('clicker'));

  expect(getByTestId('isloaded')).toHaveTextContent('Data Loaded: true');
})


