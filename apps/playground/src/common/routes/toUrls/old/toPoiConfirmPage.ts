import { BizLineEnum } from "@/common/constants"
import { ToPageHandler } from "../../interface";
import { openInUocEntry } from "@/common/libs";
import { appendParamsToUrl } from "../../utils";
import { UrlEnum } from "../../urls";

export type ToPoiConfirmPageParams = {
  bizLine: BizLineEnum;
  activityId: number;
}

export const toPoiConfirmPage: ToPageHandler<ToPoiConfirmPageParams> = (params, target) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.OldPoiConfirmPage, params), target)
}
