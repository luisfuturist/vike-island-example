export type Visible = { visible: true; load?: false; media?: false };
export type Load = { load?: true; visible?: false; media?: false };
export type Media = { media: string; visible?: false; load?: false };

export type StrategyProps = Visible | Load | Media;

export type ClientVisible = {
  "client:visible": true;
  "client:load"?: false;
  "client:media"?: false;
};
export type ClientLoad = {
  "client:load"?: true;
  "client:visible"?: false;
  "client:media"?: false;
};
export type ClientMedia = {
  "client:media": string;
  "client:visible"?: false;
  "client:load"?: false;
};

export type ClientDirective = ClientVisible | ClientLoad | ClientMedia;

export type StrategyContext<T = any> = { name: string; payload?: T };