declare module 'sourcebuster' {
  interface SourcebusterData {
    typ?: string
    src?: string
    mdm?: string
    cmp?: string
    cnt?: string
    trm?: string
  }

  interface SourcebusterAddData {
    fd?: string
    ep?: string
    rf?: string
  }

  interface SourcebusterSession {
    pgs?: string
    cpg?: string
  }

  interface SourcebusterUserData {
    vst?: string
    uag?: string
  }

  interface SourcebusterGetData {
    current?: SourcebusterData
    current_add?: SourcebusterAddData
    first?: SourcebusterData
    first_add?: SourcebusterAddData
    session?: SourcebusterSession
    udata?: SourcebusterUserData
  }

  interface SourcebusterReferral {
    host: string
    medium: string
    display: string
  }

  interface SourcebusterInitOptions {
    domain?: string
    lifetime?: number
    session_length?: number
    referrals?: SourcebusterReferral[]
    timezone_offset?: string
    callback?: () => void
  }

  const sbjs: {
    init: (options?: SourcebusterInitOptions) => void
    get: SourcebusterGetData
  }

  export default sbjs
}
