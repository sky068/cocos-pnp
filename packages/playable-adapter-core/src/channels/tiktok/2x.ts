import { APPEND_TO_HEAD } from "./inject-vars"
import { exportZipFromPkg, exportSingleFile } from "@/exporter/2x"
import { TChannel, TChannelPkgOptions } from "@/typings"
import { exportConfigJson, getChannelRCJson, getChannelRCSdkScript } from "@/utils"

export const export2xTiktok = async (options: TChannelPkgOptions) => {
  const { orientation } = options
  const channel: TChannel = 'Tiktok'
  const { isSingle = false} = getChannelRCJson(channel) || {};
  const func = isSingle ? exportSingleFile : exportZipFromPkg;

  await func({
    ...options,
    channel,
    transformHTML: async ($) => {
      const sdkInjectScript = getChannelRCSdkScript(channel) || APPEND_TO_HEAD
      $(sdkInjectScript).appendTo('head')
    },
    transform: async (destPath) => {
      await exportConfigJson({
        destPath,
        orientation
      })
    }
  })
}