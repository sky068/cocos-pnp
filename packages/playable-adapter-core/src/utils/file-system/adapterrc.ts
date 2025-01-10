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

export const getFileNameSuffix = ():string => {
  const rcJson = getAdapterRCJson();
  const version = rcJson?.version || "";
  const name = getProjectName().replace(/\s+/g, "");
  const t = new Date();
  const time = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}-${t.getHours()}-${t.getMinutes()}`
  let suffix = "";
  if (name) {
    suffix += name;
    suffix += "_";
  }
  if (version) {
    suffix += version;
    suffix += "_";
  }
  suffix += time;
  return suffix;
}