import { Dispatch, SetStateAction, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { fetchHomeVideos } from "../store/routes/home/actions";
import { fetchSelectedVideo } from "../store/routes/watch/actions";
import { fetchHistory } from "../store/routes/history/actions";
import { fetchChannelContent } from "../store/routes/channel/actions";
import Home from "./home/home";
import Watch from "./watch/watch";
import History from "./history/history";
import Channel from "./channel/channel";

export interface ComponentConfig {
  component: React.ReactNode;
  path: string;
  priority: "high" | "low";
  ref: string;
  isVisited: boolean;
  type: "dynamic" | "static";
  thunk: (
    targetRoute: string,
    search: string
  ) => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
}

export const useComponentsRegistry = (): [
  ComponentConfig[],
  Dispatch<SetStateAction<ComponentConfig[]>>
] => {
  const [componentsRegistry, setComponentsRegistry] = useState<ComponentConfig[]>([
    {
      component: <Home />,
      isVisited: true,
      path: "/",
      priority: "high",
      ref: "home-browser",
      type: "static",
      thunk: fetchHomeVideos,
    },
    {
      component: <Watch />,
      isVisited: true,
      path: "/watch",
      priority: "high",
      ref: "watch-flexy",
      type: "static",
      thunk: fetchSelectedVideo,
    },
    {
      component: <History />,
      isVisited: false,
      path: "/history",
      priority: "low",
      ref: "history-browser",
      type: "static",
      thunk: fetchHistory,
    },
    {
      component: <Channel />,
      isVisited: false,
      path: "/@channelName",
      priority: "low",
      ref: "channel-browser",
      type: "dynamic",
      thunk: fetchChannelContent,
    },
  ]);

  return [componentsRegistry, setComponentsRegistry];
};
