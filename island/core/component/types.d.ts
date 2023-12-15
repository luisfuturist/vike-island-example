import type { VueComponent } from "vue";
import type { ComponentProps, FC } from "react";

export type Framework<T> = T extends { setup: any }
  ? "vue"
  : T extends FC
  ? "react"
  : never;

export type AnyComponent<T> = FC<T> | VueComponent | any;
export type AnyProps<
  T extends AnyComponent<P>,
  P extends Props
> = Framework<T> extends "react" ? ComponentProps<T> : Record<string, unknown>;
