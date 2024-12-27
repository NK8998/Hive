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
  videoDetails: VideoDetails;
}

export interface PlayerContextProps {
  player: shaka.Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<shaka.Player | null>>;
  _videoDetails: VideoDetails | null;
  setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetails | null>>;
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
  attatchPlayer: (...args: any) => void;
  detachPlayer: (...args: any[]) => void;
}

export interface Chapter {
  start: number;
  title: string;
  end?: number; // Optional because 'end' is added later
}
