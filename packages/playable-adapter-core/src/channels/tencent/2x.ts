import { APPEND_TO_HEAD } from "./inject-vars"
import { exportZipFromPkg, exportSingleFile } from "@/exporter/2x"
import { TChannel, TChannelPkgOptions } from "@/typings"
import { exportConfigJsonForTencent, getChannelRCJson, getChannelRCSdkScript } from "@/utils"

export const export2xTencent = async (options: TChannelPkgOptions) => {
  const { orientation } = options
  const channel: TChannel = 'Tencent'
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
      await exportConfigJsonForTencent({
        destPath,
        orientation
      })
    }
  })
}