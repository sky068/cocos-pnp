import { APPEND_TO_HEAD } from "./inject-vars"
import { exportZipFromPkg } from "@/exporter/2x"
import { TChannel, TChannelPkgOptions } from "@/typings"
import { exportConfigJson, exportConfigJsonForTencent, getChannelRCSdkScript } from "@/utils"

export const export2xTencent = async (options: TChannelPkgOptions) => {
  const { orientation } = options
  const channel: TChannel = 'Tencent'

  await exportZipFromPkg({
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