import { SaveActRes } from "@/common/apis";

export type ConfirmRiskOptions = {
  saveActRes: SaveActRes;
  onConfirm: () => void;
  onCancel: () => void;
};

export type RiskHanderType = (options: ConfirmRiskOptions) => void