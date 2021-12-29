export interface ServerSetting {
  id: string
  hostName?: string
  serverEnabled: boolean
  serverMode?: string
  port?: string
  clientHost?: string
  rootDirectory?: string
  publicDirectory?: string
  nodeModulesDirectory?: string
  localStorageProvider?: string
  performDryRun?: boolean
  storageProvider?: string
  gaTrackingId?: string
  hub: HubInfo
  paginate?: number
  url?: string
  certPath?: string
  keyPath?: string
  local?: boolean
  releaseName?: string
  defaultContentPackURL?: string
}

export interface HubInfo {
  endpoint?: string
}
