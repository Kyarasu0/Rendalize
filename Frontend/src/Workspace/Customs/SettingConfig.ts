import { ForWhiteSetting } from "../../../public/Data/RenderSettings/ForWhiteSetting";
import { EasterEggHackathon } from "../../../public/Data/RenderSettings/EasterEggHackathon";

export const SettingConfig = {

  ForWhiteSetting: { setting: ForWhiteSetting },
  EasterEggHackathon: { setting: EasterEggHackathon },

} as const;

export type SettingKey = keyof typeof SettingConfig;