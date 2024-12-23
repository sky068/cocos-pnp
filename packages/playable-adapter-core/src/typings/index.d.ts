import type { Cheerio, CheerioAPI, Element } from "cheerio"

export type TWebOrientations = 'portrait' | 'landscape' | 'auto'

export type TPlatform =
  | 'web-desktop'
  | 'web-mobile'
  | 'wechatgame'
  | 'oppo-mini-game'
  | 'vivo-mini-game'
  | 'huawei-quick-game'
  | 'alipay-mini-game'
  | 'mac'
  | 'ios'
  | 'linux'
  // | 'ios-app-clip'
  | 'android'
  | 'ohos'
  | 'open-harmonyos'
  | 'windows'
  | 'xiaomi-quick-game'
  | 'baidu-mini-game'
  | 'bytedance-mini-game'
  | 'cocos-play'
  | 'huawei-agc'
  | 'link-sure'
  | 'qtt'
  | 'cocos-runtime'
  | 'xr-meta'
  | 'xr-huaweivr'
  | 'xr-pico'
  | 'xr-rokid'
  | 'xr-monado'
  | 'ar-android'
  | 'ar-ios';

export type TPlayableConfig = {
  /** 0 -> 横竖 1 -> 竖屏 2 -> 横屏 */
  playable_orientation: 0 | 1 | 2,
  playable_languages: string[],
}

export type TPlayableConfigTencent = {
  name: string,
  version: string, 
  config: {
    /** 0 -> 横竖 1 -> 竖屏 2 -> 横屏 */
    play_direction: 0 | 1 | 2
  }
}

export type TResourceData = { [key: string]: string }

export type TChannelPkgOptions = {
  orientation: TWebOrientations
  resMapper?: TResourceData
  compDiff?: number
}

export type TBuilderOptions = {
  channel: TChannel
  transformHTML?: ($: CheerioAPI) => Promise<void>
  transform?: (destPath: string) => Promise<void>
} & Pick<TChannelPkgOptions, 'resMapper' | 'compDiff'>

export type TZipFromSingleFileOptions = TBuilderOptions & {
  transformScript?: (scriptNode: Cheerio<Element>) => Promise<void>
}

export type TChannel =
  | 'AppLovin'
  | 'Facebook'
  | 'Google'
  | 'IronSource'
  | 'Liftoff'
  | 'Mintegral'
  | 'Moloco'
  | 'Pangle'
  | 'Rubeex'
  | 'Tiktok'
  | 'Unity'
  | 'Tencent'

export type TChannelRC = {
  head: string
  body: string
  sdkScript: string
}

export type TAdapterRC = {
  buildPlatform?: TPlatform
  orientation?: TWebOrientations
  skipBuild?: boolean
  exportChannels?: TChannel[]
  enableSplash?: boolean
  injectOptions?: {
    [key in TChannel]: TChannelRC
  }
  tinify?: boolean
  tinifyApiKey?: string
  isZip?: boolean,
  name?: string,
  version?: string,
}