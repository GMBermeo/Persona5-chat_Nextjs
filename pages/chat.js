import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import {
  entortar,
  bordasIrregulares,
  getRandomArbitrary,
  setBordas,
} from "../src/utils";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5NDk1MiwiZXhwIjoxOTU4ODcwOTUyfQ.R8xVTBpSSeWA4bZMhEO8Y0Mh6mNHxvr7IQJgFknrgZY";
const SUPABASE_URL = "https://yxbjwwtdehrtaludhubj.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const rotacaoIgualAvatar = getRandomArbitrary(-12, 12);
const rotacaoIgualMensagem = getRandomArbitrary(-8, 8);
const rotacaoIgualRemetente = getRandomArbitrary(-4, 4);
const rotacaoIgualBox = getRandomArbitrary(-4, 4);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        //console.log('Dados da consulta:', data);
        // console.log('Dados da consulta:', data);
        setListaDeMensagens(data);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log("Nova mensagem:", novaMensagem);
      console.log("listaDeMensagens:", listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log("valorAtualDaLista:", valorAtualDaLista);
        return [novaMensagem, ...valorAtualDaLista];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem,
      ])
      .then(({ data }) => {
        // //console.log('Criando mensagem: ', oQueTaVindoComoResposta);
      });

    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://external-preview.redd.it/e_WvRTzU3h8NRiSkXxtrDzSxL89fFBwXiSA-wTmvSCI.png?auto=webp&s=763b39be53f75339c6e7a95911345175709d2800)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "0",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: {
            lg: "70vw",
            md: "80vw",
            sm: "90vw",
            xs: "100vw",
          },
          maxHeight: "100vh",
          padding: "32px",
        }}
      >
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            marginTop: "-20px",
            height: "100%",
            backgroundColor: appConfig.theme.colors.primary[600],
            transform: `rotate(${rotacaoIgualBox}deg)`,
            borderTop: "solid black 12px",
            borderRight: "solid black 8px",
            borderBottom: "solid black 9px",
            borderLeft: "solid black 11px",
            // borderTop: setBordas(8, 4, 5, 7),
            borderColor: "black",
            outline: "solid 25px white",
            boxShadow: "25px 10px 50px 10px rgba(0, 0, 0, 1)",
            flexDirection: "column",
            borderRadius: "0",
            padding: "16px",
            //backgroundColor: "yellow",
            // backgroundImage:
            //   "url(https://pro2-bar-s3-cdn-cf.myportfolio.com/f510fd5c-1d77-47f8-8cbd-ef7e6c4d081f/856ea0a3-62bd-4dbd-8241-40bd71571f0f.jpg?h=309061d13dbcff83fd7e6fe72f110a1d)",
            backgroundImage:
              "url(https://github.com/GMBermeo/imersao-react-2022/blob/main/src/background.jpeg?raw=true)",
            // backgroundImage: 'url(https://external-preview.redd.it/e_WvRTzU3h8NRiSkXxtrDzSxL89fFBwXiSA-wTmvSCI.png?auto=webp&s=763b39be53f75339c6e7a95911345175709d2800)',
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "0",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[500],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[100],
                fontWeight: "bold",
                borderTop: "solid black 7px",
                borderRight: "solid black 5px",
                borderBottom: "solid black 7px",
                borderLeft: "solid black 9px",
                focus: {
                  backgroundColor: appConfig.theme.colors.primary[300],
                },
                hover: {
                  backgroundColor: appConfig.theme.colors.primary[300],
                },
              }}
            />
            {/* CallBack */}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                // console.log("[USANDO O COMPONENTE] Salva esse sticker no banco");
                handleNovaMensagem(":sticker:" + sticker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function MessageList(props) {
  //console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["500"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "0",
              transform: entortar(-2, 2),
              borderTop: bordasIrregulares(6, 9),
              borderRight: bordasIrregulares(8, 12),
              borderBottom: bordasIrregulares(6, 12),
              borderLeft: bordasIrregulares(7, 9),
              backgroundColor: "black",
              margin: {
                sm: "15px 10px 0 40px",
                xs: "15px 10px 0 30px",
              },
              paddingBottom: "25px",
              alignSelf: "flex-start",
              paddingRight: "50px",
              paddingLeft: "50px",
              boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.2)",
              //boxShadow: "25px 25px 50px rgba(0, 0, 0, 1)",
              // hover: {
              //  backgroundColor: appConfig.theme.colors.neutrals[500],
              //},
            }}
          >
            <Box
              styleSheet={{
                display: "block",
                margin: "auto",
                alignSelf: "flex-start",
                backgroundColor: "white",
                color: "black",
                transform: entortar(-6, 6),
                borderTop: bordasIrregulares(5, 7),
                borderRight: bordasIrregulares(5, 7),
                borderBottom: bordasIrregulares(5, 7),
                borderLeft: bordasIrregulares(5, 7),
                borderColor: "black",
                margin: "0 30px -40px -20px",
                borderRadius: "0",
                maxWidth: "300px",
              }}
            >
              <Text
                tag="strong"
                styleSheet={{
                  fontWeight: "bold",
                  margin: "4px 6px 4px 6px",
                }}
              >
                {mensagem.de}
              </Text>
            </Box>
            <Image
              //Avatar do perfil
              styleSheet={{
                width: "60px",
                height: "60px",
                borderRadius: "0",
                display: "inline-block",
                //paddingRight: "8px",
                backgroundColor: appConfig.theme.colors.neutrals[500],
                transform: entortar(-15, 15),
                borderTop: bordasIrregulares(3, 5),
                borderRight: bordasIrregulares(3, 5),
                borderBottom: bordasIrregulares(3, 5),
                borderLeft: bordasIrregulares(3, 5),
                borderColor: "white",
                boxShadow: "-2px 2px 0 8px rgba(0, 0, 0, 1)",
                marginBottom: "30px",
                marginLeft: "-80px",
              }}
              src={`https://github.com/${mensagem.de}.png`}
            />
            {/* Declarativo */}
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                src={mensagem.texto.replace(":sticker:", "")}
                styleSheet={{
                  // height: "200px",
                  margin: "auto",
                  marginTop: "-30px",
                  objectFit: "contain",
                  maxHeight: "200px",
                  transform: entortar(-2, 2),
                }}
              />
            ) : (
              <Text
                styleSheet={{
                  fontWeight: "bold",
                  marginTop: "-20px",
                  marginLeft: "20px",
                  paddingBottom: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                }}
              >
                {mensagem.texto}
              </Text>
            )}
            {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
            {/* {mensagem.texto} */}{" "}
          </Text>
        );
      })}
    </Box>
  );
}
