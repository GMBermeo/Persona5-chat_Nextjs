import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import { entortar, bordasIrregulares, getRandomArbitrary } from "../src/utils";

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
            lg: "60%",
            md: "70%",
            sm: "80%",
            xs: "100%",
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
            borderTop: bordasIrregulares(8, 10),
            borderRight: bordasIrregulares(3, 5),
            borderBottom: bordasIrregulares(5, 7),
            borderLeft: bordasIrregulares(7, 9),
            borderColor: "black",
            outline: "solid 15px white",
            boxShadow: "25px 25px 50px rgba(0, 0, 0, 1)",
            flexDirection: "column",
            borderRadius: "0",
            padding: "16px",
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
                backgroundColor: appConfig.theme.colors.neutrals[100],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[500],
                borderTop: bordasIrregulares(8, 10),
                borderRight: bordasIrregulares(3, 5),
                borderBottom: bordasIrregulares(5, 7),
                borderLeft: bordasIrregulares(7, 9),
                border: "solid black 15px",
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
              borderRight: bordasIrregulares(8, 10),
              borderBottom: bordasIrregulares(6, 9),
              borderLeft: bordasIrregulares(7, 9),
              backgroundColor: "black",
              margin: "15px 60px 0 10px",
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
                backgroundColor: "white",
                color: "black",
                transform: entortar(-8, 8),
                borderTop: bordasIrregulares(6, 9),
                borderRight: bordasIrregulares(6, 9),
                borderBottom: bordasIrregulares(6, 9),
                borderLeft: bordasIrregulares(6, 9),
                border: "solid black",
                margin: "0 150px -40px 60px",
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
                backgroundColor: appConfig.theme.colors.primary[600],
                transform: entortar(-15, 15),
                borderTop: bordasIrregulares(5, 7),
                borderRight: bordasIrregulares(5, 7),
                borderBottom: bordasIrregulares(5, 7),
                borderLeft: bordasIrregulares(5, 7),
                borderColor: "black",
                marginBottom: "30px",
              }}
              src={`https://github.com/${mensagem.de}.png`}
            />
            {/* Declarativo */}
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                src={mensagem.texto.replace(":sticker:", "")}
                styleSheet={{
                  height: "200px",
                  margin: "auto",
                  marginBottom: "20px",
                }}
              />
            ) : (
              <Text
                styleSheet={{
                  fontWeight: "bold",
                  marginTop: "-20px",
                  marginBottom: "20px",
                  marginLeft: "20px",
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
