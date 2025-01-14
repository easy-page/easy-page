import { attachPropertiesToComponent } from "@/common/libs";
import { RejectDialog } from "./dialog";
import { show } from "./show";

export default attachPropertiesToComponent(RejectDialog, {
  show,
});
