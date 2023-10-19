
/*  Component imported thanks to cjtlewis and Chris chinchilla
    This component can be found at https://github.com/ctjlewis/react-spotify-embed
*/

import { type HTMLAttributes } from "react";

interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any

  link: string
  wide?: boolean
  width?: number | string
  height?: number | string
  frameBorder?: number | string
  allow?: string
}

export const Spotify = ({
  link,
  style = {},
  wide = false,
  width = wide ? "100%" : 300,
  height = wide ? 80 : 500,
  allow = "encrypted-media",
  ...props
}: SpotifyProps) => {
  const url = new URL(link);
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${url.pathname}`}
      width={width}
      height={height}
      allow={allow}
      loading={"lazy"}
      className="bg-background"
      style={{
        borderRadius: 12,
        ...style
      }}
      {...props}
    />
  );
};