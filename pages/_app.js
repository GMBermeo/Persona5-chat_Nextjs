function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Helvetica", "Open Sans", sans-serif;
      }

      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
        overflow: hidden;
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
    </>
  );
}

const fonts = [
  //9 fontes
  "Times New Roman, serif",
  "Cooper Black, serif",
  "ITC Avant Garde Gothic, Helvetica Neue, sans-serif",
  "TeX Gyre Adventor, sans-serif",
  "Clarendon, serif",
  "Futura, sans-serif",
  "Helvetica Now Display, Helvetica, sans-serif",
  "Noto Sans, sans-serif",
  "Noto Serif, serif",
];
