import { Button } from "@components/shadcn/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/shadcn/ui/drawer";
import { TSelectedSeasonsQueryMedia } from "@lib/types/seasons.types";

import React from "react";

type TseasonAnimeInfoDrawerProps = {
  children: React.ReactNode;
  media: NonNullable<TSelectedSeasonsQueryMedia>;
};

function SeasonAnimeInfoDrawer({
  children,
  media,
}: TseasonAnimeInfoDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="h-[60vh]">
        <DrawerHeader>
          <DrawerTitle>Work in Progress</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SeasonAnimeInfoDrawer;
