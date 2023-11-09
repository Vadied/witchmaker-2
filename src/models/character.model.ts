import { TCampaign } from "./campaign.model";
import { TClass } from "./class.model";
import { TUser } from "./user.model";

export type TCharacter = {
  id: string;
  name: string;
  level: number;
  classes: TClass[];
  campaign: TCampaign;
  createdBy: TUser;
  createdAt: string;
};
