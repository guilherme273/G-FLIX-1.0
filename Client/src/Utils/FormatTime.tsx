import { Views } from "../Modules/Views/ViewsInterface";

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

export const timeWatchting = (views: Views[]) => {
  let seconds = 0;
  views.forEach((view) => {
    seconds += view.seconds_watched;
  });
  return formatTime(seconds);
};
