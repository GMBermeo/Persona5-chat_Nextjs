import { Box, Button, Text, TextField, Image } from "@skynexui/components";
//import NextNodeServer from 'next/dist/server/next-server';
import { useRouter } from "next/router";
import React from "react";
import appConfig from "../config.json";
import { entortar, bordasIrregulares, getRandomArbitrary } from "../src/utils";

const rotacaoIgual = getRandomArbitrary(-5, 5);
const rotacaoBox = getRandomArbitrary(-10, 10);
//console.log(rotacaoIgual);

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["500"]};
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
  const [username, setUsername] = React.useState("gmbermeo");
  const roteamento = useRouter();
  //const avatar = document.getElementById("avatar");

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[600],
          backgroundImage:
            "url(https://github.com/GMBermeo/imersao-react-2022/blob/main/src/backgroundlogin.jpeg?raw=true)",
          // backgroundImage: 'url(https://i.ytimg.com/vi/ZJM7ui3ax4w/maxresdefault.jpg)',
          // backgroundImage: 'url(https://external-preview.redd.it/e_WvRTzU3h8NRiSkXxtrDzSxL89fFBwXiSA-wTmvSCI.png?auto=webp&s=763b39be53f75339c6e7a95911345175709d2800)',
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            //border: 'solid white 10px',
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "0px",
            padding: "32px",
            margin: "16px",
            backgroundColor: appConfig.theme.colors.neutrals[100],
            transform: `rotate(${rotacaoBox}deg)`,
            boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.5)",
            borderTop: bordasIrregulares(10, 15),
            borderRight: bordasIrregulares(10, 20),
            borderBottom: bordasIrregulares(10, 20),
            borderLeft: bordasIrregulares(10, 20),
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              //console.log("Alguém submeteu o form")
              // Método tradicional
              // window.location.href = '/chat'
              roteamento.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo
              tag="h2"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            >
              Bem vind[+]
              <br />
              ao イセカイ!
            </Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[200],
                transform: React.memo(entortar(-1.5, 1.5)),
              }}
            >
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
                //console.log("usuário digitou", event.target.value)
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
                borderWidth: "2px",
              }}
            />
            <Button
              type="submit"
              label="ΞntЯдЯ"
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
                borderRadius: 0,
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[100],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[100],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              id="avatar"
              styleSheet={{
                borderRadius: "0%",
                marginBottom: "16px",
                transform: entortar(-12, 12),
                //border: bordasIrregulares(8, 12),
                borderTop: bordasIrregulares(10, 12),
                borderRight: bordasIrregulares(10, 12),
                borderBottom: bordasIrregulares(10, 12),
                borderLeft: bordasIrregulares(10, 12),
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
                padding: "3px 10px",
                borderRadius: "0",
                transform: entortar(-12, 12),
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
