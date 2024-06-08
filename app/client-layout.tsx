"use client";

import type { FC, PropsWithChildren } from "react";
import { MotionConfig } from "framer-motion";

export const ClientRootLayout: FC<PropsWithChildren> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
