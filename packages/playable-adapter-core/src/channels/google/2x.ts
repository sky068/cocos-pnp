import { AD_SDK_SCRIPT, LANDSCAPE_META, PORTRAIT_META } from './inject-vars'
import { exportSingleFile, exportZipFromPkg } from "@/exporter/2x"
import { getChannelRCJson, getChannelRCSdkScript } from '@/utils'
import { TChannel, TChannelPkgOptions } from "@/typings"

export const export2xGoogle = async (options: TChannelPkgOptions) => {
  const { orientation } = options
  const channel: TChannel = 'Google'
  const { isSingle = true} = getChannelRCJson(channel) || {};
  const func = isSingle ? exportSingleFile : exportZipFromPkg;
  await func({
    ...options,
    channel,
    transformHTML: async ($) => {
      // 增加横竖屏meta
      const orientationStr = orientation === 'landscape' ? LANDSCAPE_META : PORTRAIT_META
      $(orientationStr).appendTo('head')

      // 加入广告sdk脚本
      const sdkInjectScript = getChannelRCSdkScript(channel) || AD_SDK_SCRIPT
      $(sdkInjectScript).appendTo('head')
    },
    // transform: async (destPath) => {
    //   await zipToPath(destPath)
    //   unlinkSync(destPath)
    // }
  })
}