/**
 * Declare all injectable types/values here.
 *
 * This enum determines the keys that can be used within `@inject` tags. The mapping of these tags to default concrete types is defined in
 * `Injector.ts`. These mappings can be programmatically overridden by calling the methods of the {@link Injector} util.
 */
enum Injectable {
    ACTION_MAP,
    API_HANDLER,
    NOTIFICATION_CENTER,
    TOAST_MANAGER,
    STORE
}

type InjectableMap = {
    [K in keyof typeof Injectable]: K extends string ? K : never;
}

/**
 * Create exported symbol map.
 *
 * These are used as the keys that control what will get injected into class members.
 */
export const Inject: InjectableMap = Object.keys(Injectable).filter(k => typeof k === 'string').reduce<InjectableMap>((map, item) => {
    (map as any)[item] = item;
    return map;
}, {} as InjectableMap);