import '../styles/globals.css'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { cloService } from '../services';
// import { Nav, Alert } from '../components';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
