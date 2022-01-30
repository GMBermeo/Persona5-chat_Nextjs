import { Box, Button, Text, TextField, Image } from '@skynexui/components';
//import NextNodeServer from 'next/dist/server/next-server';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';


const rotacaoIgual = getRandomArbitrary(-3, 3);
//console.log(rotacaoIgual);

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['500']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  // const username//  = 'GMBermeo';
  const [username, setUsername] = React.useState("gmbermeo")
  const roteamento = useRouter();
  //const avatar = document.getElementById("avatar");


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[600],
          backgroundImage: 'url(https://pro2-bar-s3-cdn-cf.myportfolio.com/f510fd5c-1d77-47f8-8cbd-ef7e6c4d081f/856ea0a3-62bd-4dbd-8241-40bd71571f0f.jpg?h=309061d13dbcff83fd7e6fe72f110a1d)',
          // backgroundImage: 'url(https://i.ytimg.com/vi/ZJM7ui3ax4w/maxresdefault.jpg)',
          // backgroundImage: 'url(https://external-preview.redd.it/e_WvRTzU3h8NRiSkXxtrDzSxL89fFBwXiSA-wTmvSCI.png?auto=webp&s=763b39be53f75339c6e7a95911345175709d2800)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 'solid white 15px',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '0px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[100],
            transform: `rotate(${getRandomArbitrary(-10, 10)}deg)`,
            boxShadow: '5px 10px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log("Alguém submeteu o form")
              // Método tradicional
              // window.location.href = '/chat'
              roteamento.push(`/chat?username=${username}`);

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2"
              styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200], transform: `rotate(${getRandomArbitrary(-3, 3)}deg)` }}>Bem vind[] ao metaverso!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200], transform: `rotate(${getRandomArbitrary(-3, 3)}deg)` }}>
              {appConfig.name}
            </Text>
            {/* <input
              type="text"
              value={username}
              onChange={function (event) {
                console.log("usuário digitou", event.target.value)
                // Onde tá o valor?
                const valor = event.target.value;
                // Trocar o valor da variável
                // Através do React e avise quem precisa
                setUsername(valor);
              }
              }
            /> */}
            <TextField
              fullWidth
              value={username}
              onChange={function (event) {
                console.log("usuário digitou", event.target.value)
                // Onde tá o valor?
                const valor = event.target.value;
                // Trocar o valor da variável
                // Através do React e avise quem precisa
                setUsername(valor);


                // if (username.length < 3) {
                //   avatar.style.visibility = "hidden";
                // } else {
                //   avatar.style.visibility = "visible";
                // }
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[500],
                  mainColor: appConfig.theme.colors.primary[600],
                  mainColorHighlight: appConfig.theme.colors.primary[600],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
              styleSheet={{
                //transform: `rotate(${getRandomArbitrary(-3, 3)}deg)`
                transform: `rotate(${rotacaoIgual}deg)`,
                borderRadius: 0,
                borderWidth: '2px',
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[500],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[300],
                mainColorStrong: appConfig.theme.colors.primary[400],
              }}
              styleSheet={{
                //transform: `rotate(${getRandomArbitrary(-3, 3)}deg)`
                transform: `rotate(${rotacaoIgual}deg)`,
                borderRadius: 0
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[100],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[100],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              id="avatar"
              styleSheet={{
                borderRadius: '0%',
                marginBottom: '16px',
                transform: `rotate(${getRandomArbitrary(-6, 6)}deg)`,
                border: 'solid white 10px'
              }}
              src={`https://github.com/${username}.png`}
              onChange={function (event) {
                // Onde tá o valor?
                const valor = event.target.value;
                // Trocar o valor da variável
                // Através do React e avise quem precisa
                setUsername(valor);
              }}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[500],
                padding: '3px 10px',
                borderRadius: '0',
                transform: `rotate(${getRandomArbitrary(-6, 6)}deg)`
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
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
  "Noto Serif, serif"
]