import { Workoutline } from "@prisma/client";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import _ from "lodash";
import moment from "moment";
import { historyType, MenuType, RecType } from "./../types";
export const changeNavigationCurrent = (
  href: string,
  menu: MenuType[],
  setMenu: Function
) => {

  const navigation = menu.map((item) =>
    item.href.split('/')[1]===href.split('/')[1]
      ? { ...item, current: true }
      : { ...item, current: false }
  );
  setMenu(navigation);
};
export const getIdFromPath = (path: string): number => {
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  return parseInt(id);
};
export const getCategoryIdFromPath = (path: string): number => {
  const parts = path.split("/");
  const id = parts[parts.length - 2];
  return parseInt(id);
};

export const handleClick = (name: string) => {
  if (name === "Sign out") {
    supabaseClient.auth.signOut();
  }
};

export const getArrayOfSet = (workoutline: Workoutline, setRecs: Function) => {
  const arr: RecType[] = [];
  for (let i = 0; i < workoutline?.recSets!; i++) {
    arr.push({
      recSet: i + 1,
      recReps: workoutline.recReps,
      recWeights: workoutline.recWeights,
    });
  }
  setRecs(arr);
};

export const filterAllhistoryByDay = (
  logs: historyType[],
  day: Date,
  setLogs: Function
) => {
  const filterLogs = logs.filter(
    (log) => moment(log.createdAt).format("L") === moment(day).format("L")
  );
  const result = _(filterLogs)
  .groupBy("workoutline.workout.name")
  .map((v,email) => ({
    name:email,
    logs: _.map(v),
  }))
  .value();
  setLogs(result);
};
