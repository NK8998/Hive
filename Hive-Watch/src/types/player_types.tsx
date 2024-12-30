interface VideoPalette {
  [key: string]: string; // e.g., palleteUrl-0, palleteUrl-1, etc.
}

interface VideoResolution {
  bitrate: number;
  framerate: number;
  height: number;
  supersript: string;
  tag: string;
  width: number;
}

interface VideoThumbnailUrls {
  [key: string]: string; // e.g., thumbnailUrl-0, thumbnailUrl-1, etc.
}

export interface VideoDetails {
  aspect_ratio: number;
  captions_url: string | null;
  category: string | null;
  channel_id: string;
  comments: number;
  created_at: string;
  description_string: string;
  dislikes: number;
  display_name: string;
  downloadables: string | null;
  duration: number;
  duration_timestamp: string;
  extraction_and_palette: {
    extractionRate: number;
    paletteSize: number;
  };
  filename: string;
  handle: string;
  has_subtitles: boolean;
  id: number;
  likes: number;
  mpd_url: string;
  palette_urls: VideoPalette;
  pfp_url: string;
  possible_thumbnail_urls: VideoThumbnailUrls;
  preferred_thumbnail_url: string;
  publish_date: string | null;
  resolutions: VideoResolution[];
  restrictions: string;
  schedule: string | null;
  tags: string | null;
  title: string;
  type: string;
  "video-settings": string | null;
  video_id: string;
  views: number;
  visibility: string;
}

export interface VideoDetailsProps {
  videoDetails: VideoDetails | null;
}

export interface PlayerElements {
  playerContainer?: HTMLDivElement;
  captionsContainer?: HTMLDivElement;
  videoElement?: HTMLVideoElement;
}

export interface PlayerBounds {
  maxHeight: number;
  maxWidth: number;
  availableSpace: number;
}

export interface PlayerContextProps {
  player: shaka.Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<shaka.Player | null>>;
  _videoDetails: VideoDetails | null;
  setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetails | null>>;
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
  playerScope: string;
  setPlayerScope: React.Dispatch<React.SetStateAction<string>>;
  playerBounds: PlayerBounds | null;
  setPlayerBounds: React.Dispatch<React.SetStateAction<PlayerBounds | null>>;
  playerDimensions: DOMRect | null;
  setPlayerDimensions: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  loadManifest: (...args: any) => void;
  unloadManifest: (...args: any[]) => void;
  getPlayerElements: () => PlayerElements;
}

export interface Chapter {
  start: number;
  title: string;
  end?: number; // Optional because 'end' is added later
}
