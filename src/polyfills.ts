import { Buffer } from 'buffer'

globalThis.Buffer = Buffer
;(window as any).Buffer = Buffer

if (!globalThis.process) {
  globalThis.process = { env: {} } as any
}
