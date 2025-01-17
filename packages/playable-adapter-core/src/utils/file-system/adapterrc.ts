import path from "path"
import {
  TAdapterRC,
  TChannel,
  TChannelRC,
} from '@/typings'
import { getGlobalBuildConfig, getGlobalProjectBuildPath, getGlobalProjectName } from "@/global"

export const getAdapterRCJson = (): TAdapterRC | null => {
  return getGlobalBuildConfig()
}

export const getProjectName = (): string => {
  return getGlobalProjectName();
}

export const getOriginPkgPath = () => {
  let configJson: Partial<TAdapterRC> = getAdapterRCJson() || {}
  const buildPlatform = configJson.buildPlatform || 'web-mobile'

  return path.join(getGlobalProjectBuildPath(), buildPlatform!)
}

export const getChannelRCJson = (channel: TChannel): TChannelRC | null => {
  const adapterRCJson = getAdapterRCJson()
  if (!adapterRCJson || !adapterRCJson.injectOptions || !adapterRCJson.injectOptions[channel]) {
    return null
  }

  return adapterRCJson.injectOptions[channel]
}

export const getRCSkipBuild = (): boolean => {
  const adapterRCJson = getAdapterRCJson()
  if (!adapterRCJson) {
    return false
  }

  return adapterRCJson.skipBuild ?? false
}

export const getRCTinify = (): { tinify: boolean, tinifyApiKey: string, } => {
  const adapterRCJson = getAdapterRCJson()
  if (!adapterRCJson) {
    return {
      tinify: false,
      tinifyApiKey: '',
    }
  }

  return {
    tinify: !!adapterRCJson.tinify,
    tinifyApiKey: adapterRCJson.tinifyApiKey || '',
  }
}

export const getChannelRCSdkScript = (channel: TChannel): string => {
  const channelRCJson = getChannelRCJson(channel)
  return (!channelRCJson || !channelRCJson.sdkScript) ? '' : channelRCJson.sdkScript
}


/**
 * 项目_日期_素材名-素材标签_创意人_出品方_渠道_平台
 * @param chanel 
 */
export const getExportName = (chanel: string): string => {
  const rcJson = getAdapterRCJson();
  const version = rcJson?.version || "";
  const name = getProjectName().replace(/\s+/g, "");
  const proj = "TW";
  const t = new Date();
  const timeStr = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
  const author = rcJson?.author || "author";
  const producer = rcJson?.producer || "producer";
  const platform = rcJson?.platform || "ALL";
  const tag = rcJson?.tag || "试玩";
  const channelStr = chanel === "AppLovin" ? "Applovin" : chanel;

  let ret = `${proj}_${timeStr}_${name}-${tag}_${author}_${producer}_${channelStr}_${platform}`;
  return ret;
}