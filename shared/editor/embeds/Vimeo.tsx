import * as React from "react";
import Frame from "../components/Frame";
import { EmbedProps as Props } from ".";

function Vimeo(props: Props) {
  const { matches } = props.attrs;
  const videoId = matches[4];
  const hId = matches[5];

  return (
    <Frame
      {...props}
      src={`https://player.vimeo.com/video/${videoId}?byline=0${
        hId ? `&h=${hId}` : ""
      }`}
      title={`Vimeo Embed (${videoId})`}
      height="412px"
      border={false}
      referrerPolicy="origin"
    />
  );
}

Vimeo.ENABLED = [
  /(http|https)?:\/\/(www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:\/|\?)?([\d\w]+)?/,
];

export default Vimeo;
