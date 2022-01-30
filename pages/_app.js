function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
          font-weight: 900;
        }
        body {
          font-family: 'Helvetica', 'Open Sans', sans-serif;
          font-weight: 900;
        }

        

      /* App fit Height */
      html, body, #__next {
        min-height: 100vh;
      display: flex;
      flex: 1;
        }
      #__next {
        flex: 1;
        }
        #__next > * {
        flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  //console.log('Roda em todas as paginas');
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>)
}