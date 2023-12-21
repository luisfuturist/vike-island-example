import { factories } from "~/island/core/utils";

export default factories(import.meta.glob("/components/*.island.{tsx,vue}"));
