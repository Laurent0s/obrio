import { FC } from "react";

import classes from "./Loader.module.scss";

export const Loader: FC = () => {
  return <div className={classes["loader"]}>Loading...</div>;
};
