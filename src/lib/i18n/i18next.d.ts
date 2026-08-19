import type { CARD_NS, CardMessages } from "./card-messages";

/**
 * Teaches i18next's generics about this project's single namespace, so `t()`
 * autocompletes the catalogue and rejects a key that does not exist — the
 * compile-time safety the hand-rolled `translate()` used to provide.
 *
 * `keySeparator: false` must mirror the runtime config in ./card-i18n, or the
 * types would expect nested objects while the runtime does flat lookups.
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof CARD_NS;
    resources: { [K in typeof CARD_NS]: CardMessages };
    keySeparator: false;
    nsSeparator: false;
  }
}
