"use client"
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../../service/store';


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <Provider store = {store}>
          <body className='px-3'>{children}</body>
        </Provider>
      </html>
    );
  }