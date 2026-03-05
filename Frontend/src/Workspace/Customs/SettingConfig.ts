// ============================================
//              SettingConfig
// ============================================
// Settingファイルの案内役
// Markdownのmetaで指定されたsetting名から
// 実際のSettingファイルを取得するためのConfig
// ============================================


// ============================================
// Settingファイルをimport
// ============================================

import { ForWhiteSetting } from "../../../public/Data/RenderSettings/ForWhiteSetting";
// 今後Settingを追加した場合ここに追加する
// import { DarkSlide } from "../../../public/Data/RenderSettings/DarkSlide";


// ============================================
// SettingConfig
// ============================================
// Setting名 → Settingファイル
// ============================================

export const SettingConfig = {

  ForWhiteSetting: {
    setting: ForWhiteSetting,
    label: "Normal"
  },

} as const;

// ============================================
// Settingのキー型
// ============================================
// "SettingFile1" | "DarkSlide" みたいな型になる
// ============================================

export type SettingKey = keyof typeof SettingConfig;