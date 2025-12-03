import { Buffer } from 'buffer'

;(window as any).Buffer = Buffer
;(globalThis as any).Buffer = Buffer
;(window as any).global = window
;(globalThis as any).global = globalThis

if (!(globalThis as any).process) {
  ;(globalThis as any).process = { env: {} }
}
