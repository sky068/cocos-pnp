import { CheerioAPI } from "cheerio"
import { getAdapterRCJson } from "@/utils"
import { TChannel } from "@/typings"

export const injectFromRCJson = async ($: CheerioAPI, channel: TChannel) => {
  const adapterJson = getAdapterRCJson()
  if (!adapterJson || !adapterJson.injectOptions || !adapterJson.injectOptions[channel]) {
    return
  }

  const { head, body } = adapterJson.injectOptions[channel]
  if (head) {
    $(head).appendTo('head')
  }

  if (body) {
    $('body script').first().before(body)
  }

  // 写入打包指定的语言，挂到window上
  const langType = adapterJson.lang_type || 0;
  $(`<script>window.lang_type = ${langType}</script>`).appendTo('head')
}