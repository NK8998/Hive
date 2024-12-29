import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { updateInitialFetch } from "./slice";
const video = {
  aspect_ratio: 1.778,
  captions_url: null,
  category: null,
  channel_id: "UCISaSW2bq0PcmxxsejrESu81eUff2",
  comments: 0,
  created_at: "2024-07-18T07:52:50.217376+00:00",
  description_string:
    "Burnout is one of the most common dangers to programmers over their career, and I was no exception. Software development and programming can make it difficult to find a healthy balance between work and life. My burnout was a combination of self-inflicted bad decisions, things done to me, and circumstances in my personal life.\r\n\r\nIn this episode, I share the story of my own burnout and how I lost nearly everything. Through it all, I found what really matters in life - and work became a smaller part of it. \r\n\r\nI hope this episode encourages you to share your own struggles to get help. Maybe some of the things I learned after going through burnout can also encourage you to keep going.\r\n\r\nMy wife Angie's podcast, \"A past, repainted\" is here:\r\nhttps://apastrepainted.com/content/po...\r\n\r\nGet free access to TechRolepedia here:\r\nhttps://jaymeedwards.com/access-techr...\r\n\r\nDownload my free Career Guide here:\r\nhttps://jaymeedwards.com/developer-ca...\r\n\r\nNeed help with your career? Learn about career coaching:\r\nhttps://jaymeedwards.com/services/sof...\r\n\r\nCHAPTER MARKERS\r\n\r\n0:00 Introduction\r\n\r\n0:59 1 SELF-INFLICTED BURNOUT CAUSES\r\n1:05 1.1 People Pleasing\r\n1:41 1.2 Overextending at Work\r\n2:03 1.3 Side Gigs\r\n2:15 1.4 High Expenses\r\n2:51 1.5 Drug Addiction\r\n3:18 1.6 Guilt and Shame\r\n\r\n3:59 2 OTHER-INFLICTED BURNOUT CAUSES\r\n4:16 2.1 Political Lies and Manipulation at Work\r\n5:31 2.2 Recurring Project Firefighting\r\n6:42 2.3 Betrayed by a Coworker\r\n\r\n8:04 3 CIRCUMSTANTIAL BURNOUT CAUSES\r\n8:34 3.1 My Child Struggled With Dangerous Addiction\r\n10:07 3.2 My Father Died At a Young Age\r\n10:45 3.3 9/11 Work Culture Changes\r\n12:04 3.4 My Wife's Abuse\r\n\r\n13:36 4 BURNOUT TRIGGERS\r\n13:42 4.1 Startup Partner Exited\r\n14:27 4.2 Marriage Became Distant\r\n15:13 4.3 Recurring Relapse of My Child\r\n15:54 4.4 Company Bought Out\r\n\r\n17:04 5 MY BURNOUT SYMPTOMS\r\n17:12 5.1 Chronic Insomnia\r\n19:03 5.2 Uncontrollable Anger\r\n19:47 5.3 Forced to Resign\r\n20:25 5.4 Spent Emergency Savings\r\n21:29 5.5 Spent Remaining Cash\r\n21:49 5.6 Sold All My Stocks\r\n22:09 5.7 Fell Behind on Mortgage\r\n\r\n22:54 6 STRUGGLING THROUGH RECOVERY\r\n23:05 6.1 Tried Quitting Development\r\n23:33 6.2 My Wife and I Found God\r\n26:11 6.3 My Addicted Child Moved Out\r\n27:03 6.4 I Started on YouTube\r\n28:32 6.5 I Started Career Coaching\r\n30:43 6.6 My Sleep Improved\r\n\r\n32:01 7 HOW BURNOUT CHANGED ME\r\n32:11 7.1 Recovery is Daily\r\n32:31 7.2 Confronted My Addiction\r\n33:09 7.3 Became Aware of My Limits\r\n34:01 7.4 Embraced My Suffering\r\n34:24 7.5 Motivated By Change\r\n36:50 7.6 I Began Tithing\r\n39:03 7.7 Learning To Live Sober",
  dislikes: 0,
  display_name: "Neil",
  duration: 2428.06,
  duration_timestamp: "40:28",
  extraction_and_palette: {
    extractionRate: 10,
    paletteSize: 4,
  },
  downloadables: null,
  filename: "Kimetsu no Yaiba - Hashira Geiko-hen - 08",
  handle: "@Neil",
  has_subtitles: false,
  id: 119,
  likes: 0,
  mpd_url:
    "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/chunks/output.mpd",
  palette_urls: {
    "palleteUrl-0":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_001_palette.jpeg",
    "palleteUrl-1":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_002_palette.jpeg",
    "palleteUrl-10":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_011_palette.jpeg",
    "palleteUrl-11":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_012_palette.jpeg",
    "palleteUrl-12":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_013_palette.jpeg",
    "palleteUrl-13":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_014_palette.jpeg",
    "palleteUrl-14":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_015_palette.jpeg",
    "palleteUrl-15":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_016_palette.jpeg",
    "palleteUrl-2":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_003_palette.jpeg",
    "palleteUrl-3":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_004_palette.jpeg",
    "palleteUrl-4":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_005_palette.jpeg",
    "palleteUrl-5":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_006_palette.jpeg",
    "palleteUrl-6":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_007_palette.jpeg",
    "palleteUrl-7":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_008_palette.jpeg",
    "palleteUrl-8":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_009_palette.jpeg",
    "palleteUrl-9":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/palletes/batch_010_palette.jpeg",
  },
  pfp_url:
    "https://d12mwy5skngt8m.cloudfront.net/ISaSW2bq0PcmxxsejrESu81eUff2/ISaSW2bq0PcmxxsejrESu81eUff2u.png",
  possible_thumbnail_urls: {
    "thumbnailUrl-0":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/possible_thumbnails/output_0001_preview.jpeg",
    "thumbnailUrl-1":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/possible_thumbnails/output_0122_preview.jpeg",
    "thumbnailUrl-2":
      "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/possible_thumbnails/output_0241_preview.jpeg",
  },
  preferred_thumbnail_url:
    "https://d38x8ofmpjmibw.cloudfront.net/qyCRPfq5dqN/possible_thumbnails/output_0122_preview.jpeg",
  publish_date: null,
  resolutions: [
    {
      bitrate: 3500,
      framerate: 23.98,
      height: 1080,
      supersript: "HD",
      tag: "1080p",
      width: 1920,
    },
    {
      bitrate: 2500,
      framerate: 23.98,
      height: 720,
      supersript: "",
      tag: "720p",
      width: 1280,
    },
    {
      bitrate: 1000,
      framerate: 23.98,
      height: 360,
      supersript: "",
      tag: "360p",
      width: 640,
    },
    {
      bitrate: 250,
      framerate: 23.98,
      height: 144,
      supersript: "",
      tag: "144p",
      width: 256,
    },
  ],
  restrictions: "none",
  schedule: null,
  tags: null,
  title: "Kimetsu no Yaiba - Hashira Geiko-hen - 08",
  type: "video",
  "video-settings": "null",
  video_id: "qyCRPfq5dqN",
  views: 0,
  visibility: "Draft",
};

export const fetchfeaturedContent = () => {
  return async (dispatch: Dispatch, getState: RootState) => {
    await new Promise((resolve) => {
      const { pathname, search } = window.location;
      setTimeout(() => {
        console.log(pathname, search);
        dispatch(updateInitialFetch({ featuredVideo: video }));

        resolve(null);
      }, 700);
    });
  };
};
