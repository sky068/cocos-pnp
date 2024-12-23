import { TPlayableConfig, TPlayableConfigTencent, TWebOrientations } from '@/typings'
import { ADAPTER_FETCH, PLAYABLE_DEFAULT_CONFIG, PLAYABLE_DEFAULT_CONFIG_TENCENT } from "@/constants"
import { getAdapterRCJson, writeToPath } from './file-system';
import { join } from "path";

const getPlayableConfig = (options?: { orientation?: TWebOrientations, languages?: string[] }) => {
  const { orientation, languages } = options || {}

  const OrientationMap: { [key in TWebOrientations]: 0 | 1 | 2 } = {
    auto: 0,
    portrait: 1,
    landscape: 2
  }

  const playableConfig: TPlayableConfig = {
    playable_orientation: orientation ? OrientationMap[orientation] : PLAYABLE_DEFAULT_CONFIG.playable_orientation,
    playable_languages: languages || PLAYABLE_DEFAULT_CONFIG.playable_languages
  }

  return playableConfig
}

/** 腾讯广告配置 */
const getPlayableConfigForTencent = (options?: { orientation?: TWebOrientations}) => {
  const OrientationMap: { [key in TWebOrientations]: 0 | 1 | 2 } = {
    auto: 0,
    portrait: 1,
    landscape: 2
  } 
  const { orientation } = options || {};
  const rcJson = getAdapterRCJson() || {};
  const direction = orientation || rcJson?.orientation || "auto";
  const playableConfig: TPlayableConfigTencent = {
      name: rcJson?.name || PLAYABLE_DEFAULT_CONFIG_TENCENT.name,
      version: rcJson?.version || PLAYABLE_DEFAULT_CONFIG_TENCENT.version,
      config: { play_direction: OrientationMap[direction] }
    }
  return playableConfig;
}

export const isObjectString = (str: string) => {
  try {
    const obj = JSON.parse(str);
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  } catch (e) {
    return false;
  }
}

// Replacing XMLHttpRequest
export const removeXMLHttpRequest = (codeStr: string) => {
  return codeStr.replace(/XMLHttpRequest/g, ADAPTER_FETCH)
}

export const exportConfigJson = async (options: {
  destPath: string
  orientation?: TWebOrientations;
  languages?: string[];
}) => {
  const { destPath, orientation, languages } = options
  const playableConfig = getPlayableConfig({
    orientation,
    languages
  })
  const configJsonPath = join(destPath, '/config.json')
  writeToPath(configJsonPath, JSON.stringify(playableConfig))
}

export const exportConfigJsonForTencent = async (options: {
  destPath: string
  orientation?: TWebOrientations;
  languages?: string[];
}) => {
  const { destPath, orientation } = options
  const playableConfig = getPlayableConfigForTencent({
    orientation
  })
  const configJsonPath = join(destPath, '/config.json')
  writeToPath(configJsonPath, JSON.stringify(playableConfig))
}