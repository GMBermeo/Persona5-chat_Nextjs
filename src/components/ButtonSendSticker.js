import React from "react";
import { Box, Button, Text, Image } from "@skynexui/components";
import appConfig from "../../config.json";
import { entortar, bordasIrregulares, getRandomArbitrary } from "../utils";

const rotacaoIgualBox = getRandomArbitrary(-12, 12);

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState("");

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Button
        styleSheet={{
          borderRadius: "0",
          padding: "0 3px 0 0",
          minWidth: "50px",
          minHeight: "50px",
          fontSize: "20px",
          marginBottom: "8px",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${rotacaoIgualBox}deg)`,
          color: "black",
          fontWeight: "bold",
          borderTop: "solid black 4px",
          borderRight: "solid black 5px",
          borderBottom: "solid black 6px",
          borderLeft: "solid black 4px",
          //borderTop: bordasIrregulares(8, 10),
          //borderRight: bordasIrregulares(3, 5),
          //borderBottom: bordasIrregulares(5, 7),
          //borderLeft: bordasIrregulares(7, 9),
          backgroundColor: appConfig.theme.colors.primary[300],
          //filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            backgroundColor: appConfig.theme.colors.neutrals[500],
          },
        }}
        label="gifs"
        onClick={() => setOpenState(!isOpen)}
      />

      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "0",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[100],
            borderBottom: `solid ${appConfig.theme.colors.primary[300]} 10px`,
            transform: "rotate(-1deg)",
            width: {
              xs: "80vw",
              sm: "290px",
            },
            color: "white",
            height: "700px",
            right: "30px",
            bottom: "30px",
            padding: "16px",
            boxShadow:
              "rgba(4, 4, 10, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: "bold",
            }}
          >
            Stickers e gifs
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "16px",
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log(
                  //   "[DENTRO DO COMPONENTE] Clicou no sticker:",
                  //   sticker
                  // );
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li"
                key={sticker}
                styleSheet={{
                  width: "50%",
                  borderRadius: "0",
                  padding: "10px",
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.primary[300],
                  },
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
